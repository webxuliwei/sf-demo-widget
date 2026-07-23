import React from 'react'

const linePoints = [14, 20, 16, 22, 28, 24, 30, 26, 32, 30, 34, 29, 33]

const cards = [
  { title: 'CPU', metric: '4 核', description: '当前可用算力指标' },
  { title: 'GPU', metric: '2 卡', description: '可调度加速卡' },
  { title: '内存', metric: '16GB', description: '剩余额度（演示）' },
  { title: '存储', metric: '1.2TB', description: '可用容量（演示）' },
  { title: '网络', metric: '2Gbps', description: '外网带宽（演示）' },
  { title: '任务', metric: '48', description: '待处理任务数（演示）' },
  { title: '告警', metric: '1', description: '未处理告警（演示）' },
  { title: '服务', metric: '12', description: '运行中服务数（演示）' },
  { title: '数据库', metric: '3 台', description: '可用实例（演示）' },
  { title: '缓存', metric: '6.4GB', description: '可用内存缓存（演示）' },
]

function renderLineChartPoints(values: number[]) {
  if (values.length < 2) {
    return '0,24 100,24'
  }
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = Math.max(max - min, 1)
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100
      const y = 24 - ((value - min) / range) * 20
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
}

export default function HomePage() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-card border-b border-border px-6 py-4">
        <h1 className="text-lg font-medium text-foreground">演示主页</h1>
      </div>
      <div className="flex-1 p-4 bg-surface-page">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((item) => (
            <div key={item.title} className="bg-card border border-border rounded p-4">
              <div className="text-sm text-muted-foreground">{item.title}</div>
              <div className="mt-2 text-2xl font-semibold text-foreground">{item.metric}</div>
              <div className="mt-2 text-xs text-muted-foreground">{item.description}</div>
            </div>
          ))}
          <div className="bg-card border border-border rounded p-4 lg:col-span-2">
            <div className="text-sm text-muted-foreground">资源趋势</div>
            <div className="mt-1 text-xl font-semibold text-foreground">近 24 小时</div>
            <svg className="mt-4 h-28 w-full" viewBox="0 0 100 30" aria-label="资源趋势折线图" preserveAspectRatio="none">
              <polyline
                className="fill-none text-foreground"
                points={renderLineChartPoints(linePoints)}
                vectorEffect="non-scaling-stroke"
                style={{ stroke: 'currentColor', strokeWidth: 2 }}
              />
              <line
                className="text-muted-foreground"
                x1="0"
                x2="100"
                y1="24"
                y2="24"
                style={{ stroke: 'currentColor', strokeWidth: 1 }}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
