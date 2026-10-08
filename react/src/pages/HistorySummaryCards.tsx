import React from 'react'
import {
  Accessibility,
  BellRing,
  CheckCircle,
  CircleAlert,
  PersonStanding,
} from 'lucide-react'

type HistoryFilter = 'daily' | 'weekly' | 'monthly'

type SummaryData = {
  goodDuration: string
  poorDuration: string
  avgBackAngle: string
  avgNeckAngle: string
  warningCount: number
}

const summaryData: Record<HistoryFilter, SummaryData> = {
  daily: {
    goodDuration: '5h 42m',
    poorDuration: '48m',
    avgBackAngle: '7.4°',
    avgNeckAngle: '11.2°',
    warningCount: 12,
  },
  weekly: {
    goodDuration: '32h 15m',
    poorDuration: '4h 10m',
    avgBackAngle: '8.1°',
    avgNeckAngle: '12.0°',
    warningCount: 64,
  },
  monthly: {
    goodDuration: '138h 40m',
    poorDuration: '18h 25m',
    avgBackAngle: '8.5°',
    avgNeckAngle: '12.4°',
    warningCount: 248,
  },
}

function HistorySummaryCards({
  filter,
}: {
  filter: HistoryFilter
}) {
  const data = summaryData[filter]

  return (
    <section className="history-summary">

      {/* Duration Breakdown */}
      <div className="summary-duration-card">
        <h2>Posture Duration Breakdown</h2>

        <div className="duration-items">
          <div className="duration-item">
            <div className="duration-label good">
              <CheckCircle size={16} />
              <span>Good Posture</span>
            </div>

            <strong>{data.goodDuration}</strong>
          </div>

          <div className="duration-divider" />

          <div className="duration-item">
            <div className="duration-label poor">
              <CircleAlert size={16} />
              <span>Poor Posture</span>
            </div>

            <strong>{data.poorDuration}</strong>
          </div>
        </div>

        <div className="duration-ratio">
          <div className="ratio-good" />
          <div className="ratio-poor" />
        </div>
      </div>

      {/* Average Angles */}
      <div className="summary-metrics">
        <MetricCard
          title="Avg Back Angle"
          value={data.avgBackAngle}
          subtitle="Optimal < 15°"
          icon={<PersonStanding size={16} />}
        />

        <MetricCard
          title="Avg Neck Angle"
          value={data.avgNeckAngle}
          subtitle="Optimal < 15°"
          icon={<Accessibility size={16} />}
        />
      </div>

      {/* Warnings */}
      <div className="summary-warning-card">
        <div className="warning-icon">
          <BellRing size={22} />
        </div>

        <div className="warning-info">
          <span>Total Posture Warnings</span>
          <strong>{data.warningCount} Warnings</strong>
        </div>

        <div className="warning-subtitle">
          Slouch triggers &gt; 3 seconds
        </div>
      </div>

    </section>
  )
}

function MetricCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
}) {
  return (
    <div className="summary-metric-card">
      <div className="metric-title">
        <div className="metric-icon">
          {icon}
        </div>

        <span>{title}</span>
      </div>

      <strong>{value}</strong>

      <p>{subtitle}</p>
    </div>
  )
}

export default HistorySummaryCards