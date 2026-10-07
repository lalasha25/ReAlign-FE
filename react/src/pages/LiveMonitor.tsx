import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, MoreVertical, Play, Square } from 'lucide-react'
import '../App.css'

function LiveMonitor({ onBack }: { onBack: () => void }) {
    const [isMonitoring, setIsMonitoring] = useState(true)
    const [durationSeconds, setDurationSeconds] = useState(154)

    const [backAngle, setBackAngle] = useState(8.2)
    const [neckAngle, setNeckAngle] = useState(11.4)

    const [isGood, setIsGood] = useState(true)
    const [hasPostureAlert, setHasPostureAlert] = useState(false)
    const [chartPoints, setChartPoints] = useState<number[]>([
        8,
        9,
        11,
        10,
        12,
        9,
        11,
        13,
        10,
        12,
        8,
        9,
        11,
        10,
        12,
        ])
    const highAngleDuration = useRef(0)

    useEffect(() => {
    if (!isMonitoring) return

    const timer = setInterval(() => {
        setDurationSeconds((previous) => previous + 1)

        const simulateSpike = Math.random() < 0.25

        let newBackAngle: number
        let newNeckAngle: number

        if (simulateSpike) {
        newBackAngle = 21 + Math.random() * 5
        newNeckAngle = 22 + Math.random() * 4
        } else {
        newBackAngle = 6 + Math.random() * 7
        newNeckAngle = 9 + Math.random() * 6
        }

        setBackAngle(newBackAngle)
        setNeckAngle(newNeckAngle)

        const maxAngle = Math.max(newBackAngle, newNeckAngle)

        setChartPoints((previous) => [
        ...previous,
        maxAngle,
        ].slice(-25))

        if (maxAngle > 20) {
        highAngleDuration.current += 1

        setIsGood(false)

        if (highAngleDuration.current >= 3) {
            setHasPostureAlert(true)
        }
        } else {
        highAngleDuration.current = 0
        setIsGood(true)
        setHasPostureAlert(false)
        }
    }, 1000)

    return () => clearInterval(timer)
    }, [isMonitoring])
  return (
    <div className="app">
      <header className="monitor-header">
        <div className="monitor-header-inner">
          <div className="monitor-title">
            <button
                className="back-button"
                onClick={onBack}
                aria-label="Back to home"
                >
                <ArrowLeft size={20} />
            </button>
            <img
              src="/src/assets/realign_logo.png"
              alt="Re:Align logo"
              className="monitor-logo"
            />

            <div>
              <h1>Live Monitor</h1>
              <p>Natasha</p>
            </div>
          </div>

          <button className="more-button" aria-label="More options">
            <MoreVertical size={20} />
          </button>
        </div>

        <div className="device-status">
          <span className="status-dot"></span>
          <span>Re:Align Device - Connected</span>
        </div>
      </header>

      <main className="monitor-content">
        <section className={`posture-status ${isGood ? 'good' : 'bad'}`}>
            <p className="status-label">POSTURE STATUS</p>

            <div className="status-icon">
                {isGood ? '✓' : '!'}
            </div>

            <h2>
                {isGood ? 'GOOD' : 'POOR POSTURE'}
            </h2>

            <p className="status-message">
            {isGood
                ? "You're sitting upright"
                : 'Slouch Detected! Please sit up straight.'}
            </p>

            {hasPostureAlert && (
                <div className="posture-alert">
                    ⚠️ ALERT: Angle &gt; 20° for 3s+
                </div>
            )}
            </section>

            <section className="sensor-section">
                <h3>LIVE SENSOR DATA</h3>

                <div className="sensor-grid">
                    <div className="sensor-card">
                    <div className="sensor-title">
                        <span>◒</span>
                        <span>BACK</span>
                    </div>

                    <div className="sensor-angle">
                        {backAngle.toFixed(1)}°
                    </div>

                    <div className="sensor-normal">
                        ✓ Normal
                    </div>
                    </div>

                    <div className="sensor-card">
                    <div className="sensor-title">
                        <span>♙</span>
                        <span>NECK</span>
                    </div>

                    <div className="sensor-angle">
                        {neckAngle.toFixed(1)}°
                    </div>

                    <div className="sensor-normal">
                        ✓ Normal
                    </div>
                    </div>
                </div>
            </section>

            <section className="angle-chart-card">
                <div className="chart-header">
                    <div>
                    <h3>Live Angle Chart</h3>
                    <p>Posture angle history</p>
                    </div>

                    <div className="current-angle">
                        {Math.max(backAngle, neckAngle).toFixed(1)}°
                    </div>
                </div>

                <div className="chart-area">
                    <div className="chart-grid-line grid-top"></div>
                    <div className="chart-grid-line grid-middle"></div>
                    <div className="chart-grid-line grid-bottom"></div>

                    <span className="chart-y-label label-30">30°</span>
                    <span className="chart-y-label label-20">20°</span>
                    <span className="chart-y-label label-0">0°</span>

                    <svg
                        className="live-chart"
                        viewBox="0 0 500 180"
                        preserveAspectRatio="none"
                    >
                        <polyline
                        points={chartPoints
                            .map((point, index) => {
                            const x =
                                chartPoints.length === 1
                                ? 0
                                : (index / (chartPoints.length - 1)) * 500

                            const y = 180 - (Math.min(point, 30) / 30) * 180

                            return `${x},${y}`
                            })
                            .join(' ')}
                        fill="none"
                        stroke="#4b3f91"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
                    </div>
            </section>

            <div className="monitor-duration">
                <span
                    className={`duration-dot ${isMonitoring ? 'active' : 'paused'}`}
                ></span>

                <span>
                    {isMonitoring
                    ? `Monitoring for ${String(Math.floor(durationSeconds / 60)).padStart(2, '0')}:${String(durationSeconds % 60).padStart(2, '0')}`
                    : `Monitoring Paused (${String(Math.floor(durationSeconds / 60)).padStart(2, '0')}:${String(durationSeconds % 60).padStart(2, '0')})`}
                </span>
            </div>
            <button
                className={`monitor-button ${isMonitoring ? 'stop' : 'start'}`}
                onClick={() => setIsMonitoring((previous) => !previous)}
                >
                <span className="monitor-button-icon">
                    {isMonitoring ? <Square size={22} /> : <Play size={22} />}
                </span>

                {isMonitoring ? 'STOP MONITORING' : 'START MONITORING'}
            </button>
        </main>
    </div>
  )
}

export default LiveMonitor