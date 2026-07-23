import React from 'react'
export default function HomePage() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-card border-b border-border px-6 py-4">
        <h1 className="text-lg font-medium text-foreground">演示首页</h1>
      </div>
      <div className="flex-1 p-4 bg-surface-page">
        <div className="bg-card border rounded p-8 text-center text-muted-foreground">
          <div>这是演示插件的首页内容。</div>
          <div className="mt-2 text-xs">v0.1.0</div>
        </div>
      </div>
    </div>
  )
}
