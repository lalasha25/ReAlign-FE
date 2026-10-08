import {
  ArrowLeft,
  UserRound,
  Mail,
  Target,
  Bluetooth,
  Settings,
  LogOut,
} from 'lucide-react'

type ProfileProps = {
  onBack: () => void
  onSettings?: () => void
}

function Profile({ onBack, onSettings }: ProfileProps) {
  return (
    <div className="profile-page">
      <header className="profile-header">
        <button
          className="profile-back-button"
          onClick={onBack}
          aria-label="Back to home"
        >
          <ArrowLeft size={21} />
        </button>

        <h1>Profile</h1>
      </header>

      <main className="profile-content">
        <section className="profile-main-card">
          <div className="profile-avatar">
            <UserRound size={42} />
          </div>

          <h2>Natasha</h2>
          <p>Re:Align User</p>
        </section>

        <section className="profile-section">
          <h3>Personal Information</h3>

          <div className="profile-info-card">
            <div className="profile-info-icon">
              <Mail size={20} />
            </div>

            <div>
              <span>Email</span>
              <strong>natasha@example.com</strong>
            </div>
          </div>

          <div className="profile-info-card">
            <div className="profile-info-icon">
              <Target size={20} />
            </div>

            <div>
              <span>Posture Goal</span>
              <strong>Maintain healthy posture</strong>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <h3>Device</h3>

          <div className="profile-info-card">
            <div className="profile-info-icon connected">
              <Bluetooth size={20} />
            </div>

            <div>
              <span>Re:Align Device</span>
              <strong className="device-connected">
                ● Connected
              </strong>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <h3>Preferences</h3>

          <button
            className="profile-action"
            onClick={onSettings}
          >
            <div className="profile-action-left">
              <div className="profile-info-icon">
                <Settings size={20} />
              </div>

              <div>
                <strong>Settings</strong>
                <span>Manage monitoring preferences</span>
              </div>
            </div>

            <span className="profile-arrow">›</span>
          </button>
        </section>

        <button className="logout-button">
          <LogOut size={19} />
          Logout
        </button>
      </main>
    </div>
  )
}

export default Profile