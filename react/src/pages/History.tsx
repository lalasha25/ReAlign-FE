import { useState } from 'react'
import { CalendarDays } from 'lucide-react'

type HistoryFilter = 'daily' | 'weekly' | 'monthly'

function History() {
  const [selectedFilter, setSelectedFilter] =
    useState<HistoryFilter>('weekly')

  const chartData = {
    daily: {
      title: "Today's Hourly Score",
      average: 'Avg 86/100',
      labels: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM'],
      values: [82, 90, 78, 88, 92, 85],
    },
    weekly: {
      title: 'Weekly Posture Score',
      average: 'Avg 87/100',
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [85, 90, 78, 92, 88, 95, 82],
    },
    monthly: {
      title: 'Monthly Average Score',
      average: 'Avg 84/100',
      labels: ['W1', 'W2', 'W3', 'W4'],
      values: [82, 88, 85, 84],
    },
  }

  const currentChart = chartData[selectedFilter]

  return (
    <div className="app">
      {/* Header */}
      <header className="history-header">
        <div className="history-header-inner">
          <div className="history-title">
            <img
              src="/src/assets/realign_logo.png"
              alt="Re:Align logo"
              className="history-logo"
            />

            <div>
              <h1>Posture History</h1>
              <p>Natasha</p>
            </div>
          </div>

          <button
            className="history-calendar"
            aria-label="Calendar"
          >
            <CalendarDays size={18} />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="history-content">

        {/* Filter */}
        <div className="history-filter">
          {[
            { label: 'Daily', value: 'daily' },
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly' },
          ].map((filter) => (
            <button
              key={filter.value}
              className={`history-filter-button ${
                selectedFilter === filter.value ? 'selected' : ''
              }`}
              onClick={() =>
                setSelectedFilter(filter.value as HistoryFilter)
              }
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Chart Card */}
        <div className="history-chart-card">
          <div className="history-chart-header">
            <h2>{currentChart.title}</h2>

            <span className="history-average">
              {currentChart.average}
            </span>
          </div>

          {/* Chart */}
          <div className="history-chart">
            <div className="history-y-axis">
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>

            <div className="history-chart-area">
              {currentChart.values.map((value, index) => (
                <div
                  className="history-bar-wrapper"
                  key={currentChart.labels[index]}
                >
                  <div className="history-bar-area">
                    <div
                      className={`history-bar ${
                        value >= 90 ? 'top-score' : ''
                      }`}
                      style={{ height: `${value}%` }}
                    />
                  </div>

                  <span className="history-bar-label">
                    {currentChart.labels[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

export default History