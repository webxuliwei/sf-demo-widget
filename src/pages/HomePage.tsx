import React from 'react'
export default function HomePage() {
  const lineData = [16, 24, 18, 30, 22, 27, 34, 29]
  const maxValue = Math.max(...lineData)
  const linePoints = lineData
    .map((value, index) => {
      const x = (index / (lineData.length - 1)) * 100
      const y = 72 - (value / maxValue) * 58
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="h-full flex flex-col">
      <div className="bg-card border-b border-border px-6 py-4">
        <h1 className="text-lg font-medium text-foreground">演示首页</h1>
      </div>
      <div className="flex-1 p-4 bg-surface-page">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="bg-card border border-border rounded-lg p-8 text-center text-muted-foreground">
            <p>这是演示插件的首页内容。</p>
            <p className="mt-2">这里新增了一段示例说明文本。</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-sm font-medium text-foreground mb-2">新增卡片</h2>
            <p className="text-sm text-muted-foreground">这是新增的演示卡片内容。</p>
            <p className="text-sm text-muted-foreground mt-2">这是新增的一段说明文字。</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-sm font-medium text-foreground mb-3">示例折线</h2>
            <p className="text-xs text-muted-foreground mb-3">一组趋势数据的折线展示。</p>
            <svg viewBox="0 0 100 72" className="h-36 w-full text-muted-foreground" role="img" aria-label="示例折线图">
              <polyline
                fill="none"
                points={linePoints}
                className="text-foreground"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              {lineData.map((value, index) => {
                const x = (index / (lineData.length - 1)) * 100
                const y = 72 - (value / maxValue) * 58
                return <circle key={index} cx={x} cy={y} r="1.1" className="text-foreground" fill="currentColor" />
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
