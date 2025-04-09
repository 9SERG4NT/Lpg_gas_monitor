
# IoT Sensor Data Web App via MQTT

## 📦 Project Overview

This project is a real-time IoT web application that receives sensor data from an IoT device using the MQTT protocol. The device collects environmental data and sends it to a public MQTT broker (HiveMQ), which then transfers the data to this React-based web application for live visualization.

MQTT (Message Queuing Telemetry Transport) is a lightweight messaging protocol ideal for IoT communication. HiveMQ is used as the broker in this setup to facilitate the connection between the device and the web app.

---

## 🚀 How to Run Locally

Follow these instructions and you'll be able to run the project smoothly:

### 1. Clone the Repository


git clone <your_repo>


### 2. Navigate into the Project Folder


cd <your_project_name>


### 3. Install Dependencies


npm install


### 4. Set Up Your MQTT Broker (HiveMQ)

- Create a free account on [HiveMQ Cloud](https://www.hivemq.com/mqtt-cloud-broker/)
- Set up a new cluster
- Note down your **Broker URL**, **Username**, and **Password**
- Open the file:


/src/components/MQTTClient.tsx


- Replace:
  - `BROKER_URL` with your cluster's URL
  - `username` and `password` with your HiveMQ credentials

### 5. Set the MQTT Topic (Optional)

By default, the topic used in:


/src/hooks/useBluetoothData.tsx


is:

proteus_sensor_data


If you're using a different topic, update it accordingly.

### 6. Start the Development Server


npm run dev


The application will start on `http://localhost:5173` (or another port assigned by Vite).

---

## 💡 Sending a Sample Message

To test your setup:
- Use the HiveMQ Web Client or your IoT device to send a test message.
- Make sure you're publishing to the topic used in the application.
- Once a message is sent, it should appear in your web app dashboard.

---

## 🛠 Technologies Used

This project is built with:

- ⚡ **Vite** – Fast development server and bundler
- 🟦 **TypeScript** – Superset of JavaScript for type safety
- ⚛️ **React** – Modern front-end library
- 🧩 **shadcn/ui** – Accessible, headless UI components
- 🎨 **Tailwind CSS** – Utility-first CSS framework for fast styling

---

## 📬 Contact / Contribute

If you’d like to contribute:
- Fork the repository
- Make your changes
- Submit a pull request

Feel free to open issues for any bugs or suggestions!

---
