# 🔥 Smart LPG Cylinder Monitoring System

An IoT project using **ESP32**, **MQ5**, and **BMP180** to turn traditional LPG cylinders into smart, connected devices. Sensor data is published over **MQTT** to a **React + Vite** dashboard for real-time monitoring and automation.

---

## 📌 Overview

This project helps monitor LPG gas usage and detect leaks by combining multiple sensors with an ESP32 microcontroller. Data is sent via MQTT to a web dashboard for real-time insights. It focuses on safety, efficiency, and automation by tracking gas levels, temperature, and leak status.

---

## 🧠 Features

- 📡 **ESP32 + MQTT** communication
- 📦 All data sent to a **single topic**: `protues_sensor_data`
- ⛽ **Gas level monitoring** using BMP180 (pressure-based)
- 🌡️ **Temperature readings** from BMP180
- 🚨 **Leakage detection** using MQ5
- 🖥️ **React + Vite Web Dashboard** for live updates
- 🔁 **Automatic refill booking** when gas level drops below 10%
- 💰 **Prepaid wallet** for booking payments

> 🔔 *Buzzer alert system will be added in future updates.*

---

## 🧰 Hardware Used

| Component      | Description                        |
|----------------|------------------------------------|
| ESP32          | WiFi-enabled microcontroller       |
| MQ5            | Gas leakage sensor                 |
| BMP180         | Pressure & temperature sensor      |
| MQTT Broker    | For real-time data transmission    |

---

## 🌐 Data Flow

1. Sensors collect pressure, temperature, and gas leak data.
2. ESP32 packages the readings into a JSON object.
3. JSON is published to **MQTT topic**: `protues_sensor_data`
4. Web app subscribes to this topic and parses incoming data.
5. Dashboard updates in real time and triggers auto-booking if needed.

### 📦 Example MQTT Payload
```json
{
  "pressure": 1020.55,
  "temperature": 28.3,
  "gasLeak": false,
  "cylinderLevel": 18.5
}
