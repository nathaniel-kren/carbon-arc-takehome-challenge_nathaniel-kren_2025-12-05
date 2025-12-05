import type { Stats } from '../types'

interface TaskStatsProps {
  stats: Stats;
}

export default function TaskStatsProps({ stats }: TaskStatsProps) {
  return (
    <div>
      <div>Total tasks: {stats.total}</div>
      <div>Completed: {stats.completed} ({stats.rate}% completed)</div>
      <div>Pending: {stats.pending}</div>
    </div>
  )
}