import {
  CheckCircle,
  Clock3,
  TriangleAlert,
} from 'lucide-react'

type Session = {
  date: string
  time: string
  duration: string
  score: number
  status: string
  warnings: number
}

const sessions: Session[] = [
  {
    date: 'Today',
    time: '14:30 - 15:45',
    duration: '1h 15m',
    score: 92,
    status: 'Great Posture',
    warnings: 3,
  },
  {
    date: 'Today',
    time: '09:15 - 11:30',
    duration: '2h 15m',
    score: 85,
    status: 'Good Posture',
    warnings: 5,
  },
  {
    date: 'Yesterday',
    time: '15:00 - 16:30',
    duration: '1h 30m',
    score: 74,
    status: 'Needs Attention',
    warnings: 8,
  },
  {
    date: '2 Oct',
    time: '10:00 - 12:00',
    duration: '2h 00m',
    score: 90,
    status: 'Great Posture',
    warnings: 2,
  },
]

function RecentSessions() {
  return (
    <section className="recent-sessions">
      <h2 className="recent-sessions-title">
        RECENT SESSIONS
      </h2>

      <div className="session-list">
        {sessions.map((session) => {
          const isGood = session.score >= 85

          return (
            <div
              className="session-card"
              key={`${session.date}-${session.time}`}
            >
              <div className="session-icon">
                <Clock3 size={20} />
              </div>

              <div className="session-info">
                <p className="session-date">
                  {session.date}
                </p>

                <p className="session-time">
                  {session.time}
                </p>

                <div className="session-details">
                  <span>{session.duration}</span>
                  <span>•</span>
                  <span>{session.warnings} warnings</span>
                </div>
              </div>

              <div className="session-score">
                <div className="score-value">
                  {session.score}
                  <span>/100</span>
                </div>

                <div
                  className={`session-status ${
                    isGood ? 'good' : 'warning'
                  }`}
                >
                  {isGood ? (
                    <CheckCircle size={12} />
                  ) : (
                    <TriangleAlert size={12} />
                  )}

                  <span>{session.status}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default RecentSessions