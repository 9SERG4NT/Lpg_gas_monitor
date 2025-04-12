#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <MQTT.h>
#include <Wire.h>
#include <Adafruit_BMP085.h>
#include <ArduinoJson.h>

// WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";      // Replace with your WiFi SSID
const char* password = "YOUR_WIFI_PASSWORD";  // Replace with your WiFi password

// MQTT Broker settings
const char* mqtt_server = "c36bcc6f436e46b681c6c8f0a48d424f.s1.eu.hivemq.cloud";
const int mqtt_port = 8884;
const char* mqtt_username = "SERG4NT";
const char* mqtt_password = "HiveMQ@123";

// MQTT Topic (consolidated)
const char* sensorDataTopic = "proteus_sensor_data";

// Pin definitions
const int MQ5_PIN = A0;  // MQ-5 sensor connected to A0

// Global objects
WiFiClientSecure net;
MQTTClient client;
Adafruit_BMP085 bmp;

// Variables
unsigned long lastMsg = 0;
const int publishInterval = 5000;  // Publish data every 5 seconds

// Root CA certificate for HiveMQ Cloud
const char* root_ca = \
"-----BEGIN CERTIFICATE-----\n" \
"MIIDSjCCAjKgAwIBAgIQRK+wgNajJ7qJMDmGLvhAazANBgkqhkiG9w0BAQUFADA/\n" \
"MSQwIgYDVQQKExtEaWdpdGFsIFNpZ25hdHVyZSBUcnVzdCBDby4xFzAVBgNVBAMT\n" \
"DkRTVCBSb290IENBIFgzMB4XDTAwMDkzMDIxMTIxOVoXDTIxMDkzMDE0MDExNVow\n" \
"PzEkMCIGA1UEChMbRGlnaXRhbCBTaWduYXR1cmUgVHJ1c3QgQ28uMRcwFQYDVQQD\n" \
"Ew5EU1QgUm9vdCBDQSBYMzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB\n" \
"AN+v6ZdQCINXtMxiZfaQguzH0yxrMMpb7NnDfcdAwRgUi+DoM3ZJKuM/IUmTrE4O\n" \
"rz5Iy2Xu/NMhD2XSKtkyj4zl93ewEnu1lcCJo6m67XMuegwGMoOifooUMM0RoOEq\n" \
"OLl5CjH9UL2AZd+3UWODyOKIYepLYYHsUmu5ouJLGiifSKOeDNoJjj4XLh7dIN9b\n" \
"xiqKqy69cK3FCxolkHRyxXtqqzTWMIn/5WgTe1QLyNau7Fqckh49ZLOMxt+/yUFw\n" \
"7BZy1SbsOFU5Q9D8/RhcQPGX69Wam40dutolucbY38EVAJqr2m7xPi71XAicPNaD\n" \
"aeQQmxkqtilX4+U9m5/wAl0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNV\n" \
"HQ8BAf8EBAMCAQYwHQYDVR0OBBYEFMSnsaR7LHH62+FLkHX/xBVghYkQMA0GCSqG\n" \
"SIb3DQEBBQUAA4IBAQCjGiybFwBcqR7uKGY3Or+Dxz9LwwmglSBd49lZRNI+DT69\n" \
"ikugdB/OEIKcdBodfpga3csTS7MgROSR6cz8faXbauX+5v3gTt23ADq1cEmv8uXr\n" \
"AvHRAosZy5Q6XkjEGB5YGV8eAlrwDPGxrancWYaLbumR9YbK+rlmM6pZW87ipxZz\n" \
"R8srzJmwN0jP41ZL9c8PDHIyh8bwRLtTcm1D9SZImlJnt1ir/md2cXjbDaJWFBM5\n" \
"JDGFoqgCWjBH4d1QB7wCCZAA62RjYJsWvIjJEubSfZGL+T0yjWW06XyxV3bqxbYo\n" \
"Ob8VZRzI9neWagqNdwvYkQsEjgfbKbYK7p2CNTUQ\n" \
"-----END CERTIFICATE-----\n";

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void messageReceived(String &topic, String &payload) {
  Serial.println("Incoming: " + topic + " - " + payload);
}

void connectToMQTT() {
  Serial.print("Connecting to MQTT broker...");
  
  while (!client.connect("ESP32Client", mqtt_username, mqtt_password)) {
    Serial.print(".");
    delay(1000);
  }
  
  Serial.println("Connected to MQTT broker!");
  client.publish("sensors/status", "ESP32 connected");
}

void setup() {
  Serial.begin(115200);
  
  // Initialize BMP180 sensor
  if (!bmp.begin()) {
    Serial.println("Could not find a valid BMP085/BMP180 sensor, check wiring!");
    while (1) {}
  }
  
  // Setup WiFi
  setup_wifi();
  
  // Set CA certificate for secure connection
  net.setCACert(root_ca);
  
  // Setup MQTT client
  client.begin(mqtt_server, mqtt_port, net);
  client.onMessage(messageReceived);
  
  // Connect to MQTT broker
  connectToMQTT();
}

void loop() {
  client.loop();

  if (!client.connected()) {
    connectToMQTT();
  }

  unsigned long now = millis();
  if (now - lastMsg > publishInterval) {
    lastMsg = now;
    
    // Read BMP180 sensor data
    float temperature = bmp.readTemperature();
    float pressure = bmp.readPressure() / 100.0F; // Convert Pa to hPa
    float altitude = bmp.readAltitude();
    
    // Read MQ-5 gas sensor data
    int gasValue = analogRead(MQ5_PIN);
    
    // Print values to serial monitor
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println(" °C");
    
    Serial.print("Pressure: ");
    Serial.print(pressure);
    Serial.println(" hPa");
    
    Serial.print("Altitude: ");
    Serial.print(altitude);
    Serial.println(" meters");
    
    Serial.print("Gas value: ");
    Serial.println(gasValue);
    
    // Create JSON document
    StaticJsonDocument<200> doc;
    doc["temperature"] = temperature;
    doc["pressure"] = pressure;
    doc["altitude"] = altitude;
    doc["gas"] = gasValue;
    
    // Serialize JSON to string
    String payload;
    serializeJson(doc, payload);
    
    // Publish consolidated data to MQTT
    client.publish(sensorDataTopic, payload);
    
    Serial.println("Data published to MQTT");
    Serial.println(payload);
  }
}