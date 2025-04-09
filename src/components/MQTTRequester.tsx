import { useEffect, useState, useRef } from "react";
import mqtt from 'mqtt';
import { connect } from "http2";

const MQTTRequester = () => {
    const [message, setMessage]=useState("");
    const [status, setStatus]=useState("");
    const clientRef=useRef<mqtt.MqttClient | null>(null);

    useEffect(()=>{
        const options = {
            clean: true,
            connectTimeout: 4000,
            clientId: 'react_pub_' + Math.random().toString(16).slice(2, 8),
            username: 'SERG4NT',
            password: 'HiveMQ@123',
            
        };

        const BROKER_URL = 'wss:c36bcc6f436e46b681c6c8f0a48d424f.s1.eu.hivemq.cloud:8883';
        const client = mqtt.connect(BROKER_URL, options);

        client.on
    })
}