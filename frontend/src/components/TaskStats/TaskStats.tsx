import type { Stats } from '../types'
import './TaskStats.css'

interface TaskStatsProps {
  stats: Stats;
}

export default function TaskStatsProps({ stats }: TaskStatsProps) {
  return (
    <div className="task-stats">
      <div className="stat-card">
        <div className="stat-label">Total</div>
        <div className="stat-value">{stats.total}</div>
      </div>
      <div className="stat-card completed">
        <div className="stat-label">Completed</div>
        <div className="stat-value">{stats.completed}</div>
        <div className="stat-rate">{stats.rate}% done</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Pending</div>
        <div className="stat-value">{stats.pending}</div>
      </div>
    </div>
  )
}