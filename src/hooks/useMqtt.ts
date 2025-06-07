import { useEffect, useRef, useState } from 'react';
import mqtt from 'mqtt';
import { MQTT_CONFIG } from '@/config/mqtt';

type MqttStatus = 'connecting' | 'connected' | 'error' | 'disconnected';

interface FingerprintImage {
    id: string;
    image: string;
}

export const useMqtt = () => {
    const clientRef = useRef<mqtt.MqttClient | null>(null);
    const [status, setStatus] = useState<MqttStatus>('disconnected');
    const [lastMessage, setLastMessage] = useState<string>('');
    const [fingerprintImage, setFingerprintImage] = useState<FingerprintImage | null>(null);

    useEffect(() => {
        const connectMqtt = () => {
            try {
                const client = mqtt.connect(MQTT_CONFIG.MQTT_URL, {
                    username: MQTT_CONFIG.ADAFRUIT_USERNAME,
                    password: MQTT_CONFIG.ADAFRUIT_KEY,
                    clientId: `web_${Math.random().toString(16).slice(3)}`
                });

                clientRef.current = client;

                client.on('connect', () => {
                    console.log('✅ Conectado a MQTT');
                    setStatus('connected');
                    // Suscribirse a los feeds
                    client.subscribe(MQTT_CONFIG.FEEDS.FINGERPRINT, (err) => {
                        if (err) {
                            console.error('Error al suscribirse a fingerprint:', err);
                            setStatus('error');
                        }
                    });
                    client.subscribe(MQTT_CONFIG.FEEDS.IMAGES, (err) => {
                        if (err) {
                            console.error('Error al suscribirse a images:', err);
                            setStatus('error');
                        }
                    });
                });

                client.on('message', (topic, message) => {
                    const messageStr = message.toString();
                    console.log(`Mensaje recibido en ${topic}:`, messageStr);

                    if (topic === MQTT_CONFIG.FEEDS.IMAGES) {
                        try {
                            const imageData = JSON.parse(messageStr) as FingerprintImage;
                            setFingerprintImage(imageData);
                        } catch (error) {
                            console.error('Error al parsear la imagen:', error);
                        }
                    } else {
                        setLastMessage(messageStr);
                    }
                });

                client.on('error', (err) => {
                    console.error('❌ Error de conexión:', err);
                    setStatus('error');
                });

                client.on('close', () => {
                    console.log('Conexión cerrada');
                    setStatus('disconnected');
                });

                return () => {
                    client.end();
                };
            } catch (error) {
                console.error('Error al conectar:', error);
                setStatus('error');
            }
        };

        connectMqtt();
    }, []);

    const sendCommand = (command: 'enroll' | 'scan') => {
        if (clientRef.current?.connected) {
            clientRef.current.publish(MQTT_CONFIG.FEEDS.COMMANDS, command);
            return true;
        }
        return false;
    };

    return {
        status,
        lastMessage,
        sendCommand,
        isConnected: status === 'connected',
        fingerprintImage
    };
}; 