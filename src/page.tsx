import React, { useEffect, useState, useRef } from 'react'
import mqtt from 'mqtt'

const brokerUrl = 'wss://test.mosquitto.org:8081'
const topic = 'react/mqtt/test'

const MqttTest: React.FC = () => {
  const clientRef = useRef<mqtt.MqttClient | null>(null)
  const [messageToSend, setMessageToSend] = useState('')
  const [receivedMessages, setReceivedMessages] = useState<string[]>([])
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting')

  useEffect(() => {
    try {
      const client = mqtt.connect(brokerUrl)
      clientRef.current = client

      client.on('connect', () => {
        console.log('✅ Conectado a MQTT')
        setConnectionStatus('connected')
        client.subscribe(topic, (err) => {
          if (err) {
            console.error('Error al suscribirse:', err)
            setConnectionStatus('error')
          } else {
            console.log(`📡 Suscrito al topic "${topic}"`)
          }
        })
      })

      client.on('message', (topic, message) => {
        setReceivedMessages((prev) => [...prev, `(${topic}): ${message.toString()}`])
      })

      client.on('error', (err) => {
        console.error('❌ Error de conexión:', err)
        setConnectionStatus('error')
      })

      return () => {
        client.end()
      }
    } catch (error) {
      console.error('Error al conectar:', error)
      setConnectionStatus('error')
    }
  }, [])

  const handlePublish = () => {
    if (clientRef.current?.connected && messageToSend.trim()) {
      clientRef.current.publish(topic, messageToSend)
      setMessageToSend('')
    }
  }

  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>🔧 Prueba de conexión MQTT</h1>
      
      <div style={{ 
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: connectionStatus === 'connected' ? '#e6ffe6' : 
                        connectionStatus === 'error' ? '#ffe6e6' : '#fff3e6',
        borderRadius: '4px',
        border: `1px solid ${
          connectionStatus === 'connected' ? '#00cc00' : 
          connectionStatus === 'error' ? '#cc0000' : '#ff9900'
        }`
      }}>
        Estado: {
          connectionStatus === 'connected' ? '✅ Conectado' :
          connectionStatus === 'error' ? '❌ Error de conexión' :
          '🔄 Conectando...'
        }
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          placeholder="Escribe un mensaje"
          style={{ 
            padding: '10px',
            width: '70%',
            borderRadius: '4px',
            border: '1px solid #ddd',
            marginRight: '10px'
          }}
        />
        <button
          onClick={handlePublish}
          disabled={connectionStatus !== 'connected'}
          style={{
            padding: '10px 20px',
            backgroundColor: connectionStatus === 'connected' ? '#007bff' : '#cccccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: connectionStatus === 'connected' ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => {
            if (connectionStatus === 'connected') {
              e.currentTarget.style.backgroundColor = '#0056b3'
            }
          }}
          onMouseOut={(e) => {
            if (connectionStatus === 'connected') {
              e.currentTarget.style.backgroundColor = '#007bff'
            }
          }}
        >
          Enviar
        </button>
      </div>

      <div>
        <h2 style={{ marginBottom: '10px', color: '#444' }}>📥 Mensajes recibidos:</h2>
        <ul style={{ 
          listStyle: 'none',
          padding: '10px',
          maxHeight: '300px',
          overflowY: 'auto',
          border: '1px solid #eee',
          borderRadius: '4px'
        }}>
          {receivedMessages.map((msg, index) => (
            <li key={index} style={{ 
              padding: '8px',
              borderBottom: index < receivedMessages.length - 1 ? '1px solid #eee' : 'none',
              color: '#666'
            }}>
              {msg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MqttTest
