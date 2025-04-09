import { useEffect, useState } from "react";
import client from "./MQTTClient";

const TOPIC: string = "proteus_sensor_data";

const MQTTListener = () => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(()=>{
        client.on('connect', ()=>{
            console.log("Listener: Connected to MQTT Broker");

            client.subscribe(TOPIC, (err)=>{
                if(err){
                    console.error("Listener: Subscription error", err);
                } else{
                    console.log("Listener: Subscribed to topic", TOPIC);
                }
            });
        });

        client.on('message',(topic, message)=>{
            const msg= message.toString();
            console.log("Listener: Received message", msg);
            setMessages(prevMessages => [msg, ...prevMessages]);
        });

        client.on('error',(err)=>{
            console.error("Listener: Connection error", err);
        });

        return ()=> {
            if(client.connected){
                client.end();
            }
        }
    }, []);

    return (
        <div>
            <h2>MQTT Listener</h2>
            <ul>
                {messages.map((msg, idx) => (
                <li key={idx}>{msg}</li>
                ))}
            </ul>
        </div>
    )
}

export default MQTTListener;