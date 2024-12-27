// StreamingCanvas.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Types definitions
interface Metrics {
  ping: number[];
  jitter: number[];
  latency: number[];
  fps: number[];
}

interface ChartDataPoint {
  name: number;
  ping: number;
  jitter: number;
  latency: number;
  fps: number;
}

interface MetricCardProps {
  label: string;
  value: string | number;
}

// Styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    
  },
  card: {
    backgroundColor: '#023045',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '20px'
  },
  header: {
    textAlign: 'center' as const,
    margin: '0 0 10px 0',
    color: '#2196F3'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '5px'
  },
  button: {
    padding: '5px 5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s'
  },
  startButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  stopButton: {
    backgroundColor: '#f44336',
    color: 'white',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed'
  },
  canvas: {
    width: '50%',
    maxWidth: '640px',
    height: 'auto',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '5px',
    display: 'block',
    margin: '0 auto'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '10px'
  },
  metricCard: {
    backgroundColor: '#023045',
    padding: '15px',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    textAlign: 'center' as const
  },
  metricLabel: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '5px'
  },
  metricValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2196F3'
  },
  chartContainer: {
    backgroundColor: '#023045',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  status: {
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px',
    textAlign: 'center' as const
  },
  successStatus: {
    backgroundColor: '#023045',
    color: '#2e7d32'
  },
  errorStatus: {
    backgroundColor: '#ffebee',
    color: '#c62828'
  }
};

// MetricCard Component
const MetricCard: React.FC<MetricCardProps> = ({ label, value }) => (
  <div style={styles.metricCard}>
    <div style={styles.metricLabel}>{label}</div>
    <div style={styles.metricValue}>{value}</div>
  </div>
);

// Main Component
const ESP32CamStream: React.FC = () => {
  // State
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [status, setStatus] = useState<{message: string; type: 'error' | 'success' | 'info'}>({
    message: '',
    type: 'info'
  });
  const [metrics, setMetrics] = useState<Metrics>({
    ping: [],
    jitter: [],
    latency: [],
    fps: []
  });
  const [frameCount, setFrameCount] = useState<number>(0);
  const [connectionInfo, setConnectionInfo] = useState<string>('En attente de connexion...');

  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const lastFrameTimeRef = useRef<number>(Date.now());
  const lastFrameReceivedRef = useRef<number>(Date.now());

  // Utility functions
  const average = (arr: number[]): number => 
    arr.length ? Math.round(arr.reduce((a, b) => a + b) / arr.length) : 0;

  const updateMetrics = (frameTimestamp: number) => {
    const now = Date.now();
    
    setMetrics(prevMetrics => {
      // Calcul du ping
      const newPing = [...prevMetrics.ping, now - frameTimestamp].slice(-30);
      
      // Calcul de la gigue
      const newJitter = prevMetrics.ping.length > 0 
        ? [...prevMetrics.jitter, Math.abs(newPing[newPing.length - 1] - prevMetrics.ping[prevMetrics.ping.length - 1])].slice(-30)
        : prevMetrics.jitter;
      
      // Calcul de la latence
      const newLatency = [...prevMetrics.latency, now - lastFrameReceivedRef.current].slice(-30);
      
      // Calcul du FPS
      const newFps = [...prevMetrics.fps, 1000 / (now - lastFrameTimeRef.current)].slice(-30);

      lastFrameTimeRef.current = now;
      lastFrameReceivedRef.current = now;
      
      return {
        ping: newPing,
        jitter: newJitter,
        latency: newLatency,
        fps: newFps
      };
    });

    setFrameCount(prev => prev + 1);
  };

  const connectWebSocket = () => {
    wsRef.current = new WebSocket('wss://ikrame-s-websocket-server.glitch.me');

    wsRef.current.onopen = () => {
      setStatus({ message: 'Connecté au serveur', type: 'success' });
      wsRef.current?.send(JSON.stringify({ type: 'register-web' }));
    };

    wsRef.current.onclose = () => {
      setStatus({ message: 'Déconnecté du serveur', type: 'error' });
      setIsStreaming(false);
    };

    wsRef.current.onerror = () => {
      setStatus({ message: 'Erreur de connexion', type: 'error' });
    };

    wsRef.current.onmessage = async (event) => {
      if (event.data instanceof Blob) {
        const imageUrl = URL.createObjectURL(event.data);
        const img = new Image();
        
        img.onload = () => {
          const ctx = canvasRef.current?.getContext('2d');
          if (ctx && canvasRef.current) {
            ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
            URL.revokeObjectURL(imageUrl);
            updateMetrics(Date.now());
          }
        };
        
        img.src = imageUrl;
        return;
      }

      try {
        const message = JSON.parse(event.data);
        
        switch (message.type) {
          case 'status':
            setStatus({ message: message.message, type: 'success' });
            break;
          case 'error':
            setStatus({ message: message.message, type: 'error' });
            break;
          case 'metrics':
            if (message.data) {
              updateMetrics(message.data.timestamp);
            }
            break;
        }
      } catch (error) {
        console.error('Erreur parsing message:', error);
      }
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        if (isStreaming) {
          wsRef.current.send(JSON.stringify({ type: 'stop-stream' }));
        }
        wsRef.current.close();
      }
    };
  }, []);

  const startStream = () => {
    setIsStreaming(true);
    lastFrameTimeRef.current = Date.now();
    setFrameCount(0);
    wsRef.current?.send(JSON.stringify({ type: 'start-stream' }));
  };

  const stopStream = () => {
    // Mettre à jour l'état
    setIsStreaming(false);
    wsRef.current?.send(JSON.stringify({ type: 'stop-stream' }));
  
    // Réinitialiser le message d'état
    setConnectionInfo('Le streaming est arrêté.');
    setStatus({ message: 'Streaming arrêté avec succès', type: 'info' });
  
    // Effacer le canvas
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && canvasRef.current) {
      ctx.fillStyle = '#ffffff'; // Utilisation du blanc pur
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };
  

  const chartData = metrics.ping.map((_, index) => ({
    name: index,
    ping: metrics.ping[index],
    jitter: metrics.jitter[index],
    latency: metrics.latency[index],
    fps: metrics.fps[index]
  }));

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>Streaming ESP32-CAM</h1>

        <div style={styles.buttonContainer}>
          <button
            onClick={startStream}
            disabled={isStreaming}
            style={{
              ...styles.button,
              ...styles.startButton,
              ...(isStreaming && styles.disabledButton)
            }}
          >
            Démarrer Stream
          </button>
          <button
            onClick={stopStream}
            disabled={!isStreaming}
            style={{
              ...styles.button,
              ...styles.stopButton,
              ...(!isStreaming && styles.disabledButton)
            }}
          >
            Arrêter Stream
          </button>
        </div>

        <div style={{
          ...styles.status,
          ...(status.type === 'error' ? styles.errorStatus : styles.successStatus)
        }}>
          {status.message}
        </div>

        {isStreaming && (
          <div style={{
            width: '40px',
            height: '40px',
            margin: '20px auto',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #4CAF50',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}/>
        )}

        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          style={styles.canvas}
        />

        <div style={styles.metricsGrid}>
          <MetricCard label="Ping" value={`${average(metrics.ping)} ms`} />
          <MetricCard label="Gigue" value={`${average(metrics.jitter)} ms`} />
          <MetricCard label="Latence" value={`${average(metrics.latency)} ms`} />
          <MetricCard label="FPS" value={average(metrics.fps)} />
        </div>

        <div style={styles.chartContainer}>
          <LineChart width={600} height={200} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ping" stroke="#2196F3" name="Ping (ms)" />
            <Line type="monotone" dataKey="jitter" stroke="#4CAF50" name="Gigue (ms)" />
            <Line type="monotone" dataKey="latency" stroke="#FFC107" name="Latence (ms)" />
            <Line type="monotone" dataKey="fps" stroke="#9C27B0" name="FPS" />
          </LineChart>
        </div>

        <div style={{
          ...styles.status,
          ...(connectionInfo.includes('arrêté') ? styles.errorStatus : styles.successStatus)
        }}>
          {connectionInfo}
        </div>
      </div>
    </div>
  );
};

export default ESP32CamStream;

