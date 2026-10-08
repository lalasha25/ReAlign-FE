import { useState } from 'react'
import './App.css'
import {
  Bell,
  UserRound,
  Home as HomeIcon,
  History as HistoryIcon,
} from 'lucide-react'
import LiveMonitor from './pages/LiveMonitor'
import History from './pages/History'
import Profile from './components/Profile' 

function App() {
  const [page, setPage] = useState<
    'home' | 'monitoring' | 'history' | 'profile'
  >('home')

  if (page === 'monitoring') {
    return <LiveMonitor onBack={() => setPage('home')} />
  }

  return (
    <div className="app">
      {page === 'history' ? (
        <History onBack={() => setPage('home')} />
      ) : page === 'profile' ? (
        <Profile onBack={() => setPage('home')} />
      ) : (
        <>
          <header className="header">
            <div className="top-bar">
              <div className="brand">
                <img
                  src="/src/assets/realign_logo.png"
                  alt="Re:Align logo"
                  className="brand-logo"
                />
                <span className="brand-name">Re:Align</span>
              </div>

              <div className="header-actions">
                <button
                  className="notification"
                  aria-label="Notifications"
                >
                  <Bell size={24} />
                  <span className="notification-dot"></span>
                </button>

                <button
                  className="profile"
                  aria-label="Profile"
                  onClick={() => setPage('profile')}
                  >
                  <UserRound size={21} />
                </button>
              </div>
            </div>

            <div className="greeting">
              <h1>Good Morning, Natasha</h1>
              <p>Let’s keep your posture aligned today.</p>
            </div>

            <div className="device-status">
              <span className="status-dot"></span>
              <span>Re:Align Device - Connected</span>
            </div>
          </header>

          <main className="content">
            <section className="card posture-profile">
              <h2>Posture Profile</h2>

              <div className="angles">
                <div>
                  <p>Neck Angle</p>
                  <strong>12°</strong>
                </div>

                <div>
                  <p>Back Angle</p>
                  <strong>8°</strong>
                </div>
              </div>

              <div className="balance-status">
                <span className="status-dot"></span>
                Sumbu Seimbang
              </div>
            </section>

            <section className="card posture-score">
              <h2>Posture Score</h2>

              <div className="score">82</div>

              <p>Excellent posture today</p>
            </section>

            <section className="angle-cards">
              <div className="angle-card">
                <p>Back Angle</p>
                <strong>8°</strong>
              </div>

              <div className="angle-card">
                <p>Neck Angle</p>
                <strong>12°</strong>
              </div>
            </section>

            <button
              className="start-button"
              onClick={() => setPage('monitoring')}
            >
              <span>▶</span>
              Start Monitoring
            </button>
          </main>
        </>
      )}

      <nav className="bottom-nav">
        <button
          className={`bottom-nav-item ${
            page === 'home' ? 'active' : ''
          }`}
          onClick={() => setPage('home')}
        >
          <HomeIcon size={20} />
          <span>Home</span>
        </button>

        <button
          className={`bottom-nav-item ${
            page === 'history' ? 'active' : ''
          }`}
          onClick={() => setPage('history')}
        >
          <HistoryIcon size={20} />
          <span>History</span>
        </button>
      </nav>
    </div>
  )
}

export default App