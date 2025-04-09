import { connect } from 'http2';
import mqtt, {MqttClient} from 'mqtt';

const options = {
    clean: true,
    connectTimeout: 4000,
    clientId: 'react_mqtt_' + Math.random().toString(16).slice(2, 8),
    username: 'SERG4NT',
    password: 'HiveMQ@123',
};

const BROKER_URL = 'wss://c36bcc6f436e46b681c6c8f0a48d424f.s1.eu.hivemq.cloud:8884/mqtt';
const client: MqttClient = mqtt.connect(BROKER_URL, options);
export default client;