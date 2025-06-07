export const MQTT_CONFIG = {
    ADAFRUIT_USERNAME: import.meta.env.VITE_ADAFRUIT_USERNAME || '',
    ADAFRUIT_KEY: import.meta.env.VITE_ADAFRUIT_KEY || '',
    FEEDS: {
        COMMANDS: `${import.meta.env.VITE_ADAFRUIT_USERNAME}/feeds/commands`,
        FINGERPRINT: `${import.meta.env.VITE_ADAFRUIT_USERNAME}/feeds/fingerprint`,
        IMAGES: `${import.meta.env.VITE_ADAFRUIT_USERNAME}/feeds/images`
    },
    MQTT_URL: 'wss://io.adafruit.com'
} as const; 