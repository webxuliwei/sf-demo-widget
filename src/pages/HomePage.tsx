import { useEffect, useMemo, useState } from 'react'

const SDK = (window as any).__RISE_SDK__
const { DataTable, PageHeader } = SDK?.components || {}

type TimeWindow = '1d' | '7d' | '30d'

type VendorRow = {
  vendor: string
  modelCount: number
  callCount: number
  inputTokens: number
  outputTokens: number
  successRate: number
  avgLatencyMs: number
  latestRequest: string
}

type VendorRowWithUid = VendorRow & { uid: string }

const WINDOW_OPTIONS = [
  { value: '1d' as const, label: '最近 24 小时' },
  { value: '7d' as const, label: '最近 7 天' },
  { value: '30d' as const, label: '最近 30 天' },
]

const OVERVIEW_DATA: Record<TimeWindow, VendorRow[]> = {
  '1d': [
    { vendor: 'OpenAI', modelCount: 6, callCount: 4860, inputTokens: 1825000, outputTokens: 560000, successRate: 99.3, avgLatencyMs: 920, latestRequest: '10:12' },
    { vendor: 'Azure OpenAI', modelCount: 4, callCount: 3520, inputTokens: 1218000, outputTokens: 410000, successRate: 99.0, avgLatencyMs: 1080, latestRequest: '10:08' },
    { vendor: '阿里云通义', modelCount: 5, callCount: 2980, inputTokens: 980000, outputTokens: 255000, successRate: 98.7, avgLatencyMs: 860, latestRequest: '09:58' },
    { vendor: '百度文心', modelCount: 3, callCount: 1120, inputTokens: 365000, outputTokens: 84000, successRate: 99.5, avgLatencyMs: 760, latestRequest: '09:49' },
    { vendor: '华为盘古', modelCount: 2, callCount: 620, inputTokens: 180000, outputTokens: 42000, successRate: 98.9, avgLatencyMs: 930, latestRequest: '09:31' },
  ],
  '7d': [
    { vendor: 'OpenAI', modelCount: 12, callCount: 24120, inputTokens: 9250000, outputTokens: 2780000, successRate: 99.2, avgLatencyMs: 960, latestRequest: '18:42' },
    { vendor: 'Azure OpenAI', modelCount: 8, callCount: 15390, inputTokens: 5320000, outputTokens: 1780000, successRate: 98.9, avgLatencyMs: 1210, latestRequest: '18:40' },
    { vendor: '阿里云通义', modelCount: 9, callCount: 11840, inputTokens: 4120000, outputTokens: 1045000, successRate: 98.5, avgLatencyMs: 940, latestRequest: '18:36' },
    { vendor: '百度文心', modelCount: 6, callCount: 6120, inputTokens: 1820000, outputTokens: 412000, successRate: 99.4, avgLatencyMs: 840, latestRequest: '18:20' },
    { vendor: '华为盘古', modelCount: 5, callCount: 3020, inputTokens: 760000, outputTokens: 178000, successRate: 99.0, avgLatencyMs: 990, latestRequest: '17:55' },
  ],
  '30d': [
    { vendor: 'OpenAI', modelCount: 28, callCount: 93410, inputTokens: 36124000, outputTokens: 10930000, successRate: 99.1, avgLatencyMs: 975, latestRequest: '11:07' },
    { vendor: 'Azure OpenAI', modelCount: 19, callCount: 61250, inputTokens: 21478000, outputTokens: 6895000, successRate: 98.7, avgLatencyMs: 1135, latestRequest: '11:03' },
    { vendor: '阿里云通义', modelCount: 16, callCount: 44670, inputTokens: 14926000, outputTokens: 3912000, successRate: 98.6, avgLatencyMs: 890, latestRequest: '11:00' },
    { vendor: '百度文心', modelCount: 9, callCount: 18870, inputTokens: 5920000, outputTokens: 1327000, successRate: 99.2, avgLatencyMs: 810, latestRequest: '10:55' },
    { vendor: '华为盘古', modelCount: 7, callCount: 8720, inputTokens: 2480000, outputTokens: 610000, successRate: 99.0, avgLatencyMs: 1030, latestRequest: '10:38' },
  ],
}

function formatNumber(value: number): string {
  return Number(value || 0).toLocaleString('zh-CN')
}

function formatRate(value: number): string {
  return `${(Number(value || 0)).toFixed(1)}%`
}

export default function HomePage() {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('7d')
  const [vendorFilter, setVendorFilter] = useState('')

  const rows = useMemo<VendorRowWithUid[]>(() => {
    const source = OVERVIEW_DATA[timeWindow] || []
    return source
      .filter(row => !vendorFilter || row.vendor === vendorFilter)
      .map(row => ({ ...row, uid: row.vendor }))
  }, [timeWindow, vendorFilter])

  const vendorOptions = useMemo(() => ['全部厂商', ...OVERVIEW_DATA[timeWindow].map(row => row.vendor)], [timeWindow])

  useEffect(() => {
    const exists = OVERVIEW_DATA[timeWindow].some(row => row.vendor === vendorFilter)
    if (vendorFilter && !exists) setVendorFilter('')
  }, [timeWindow, vendorFilter])

  const totals = useMemo(() => rows.reduce((acc, row) => ({
    vendorCount: acc.vendorCount + 1,
    callCount: acc.callCount + row.callCount,
    inputTokens: acc.inputTokens + row.inputTokens,
    outputTokens: acc.outputTokens + row.outputTokens,
    weightedSuccessRate: acc.weightedSuccessRate + row.successRate * row.callCount,
  }), {
    vendorCount: 0,
    callCount: 0,
    inputTokens: 0,
    outputTokens: 0,
    weightedSuccessRate: 0,
  }), [rows])

  const avgSuccessRate = totals.callCount > 0 ? totals.weightedSuccessRate / totals.callCount : 0

  const cards = useMemo(() => [
    { label: '覆盖厂商数', value: formatNumber(totals.vendorCount), icon: <ProvidersIcon className="h-4 w-4 text-muted-foreground" /> },
    { label: '调用总次数', value: formatNumber(totals.callCount), icon: <CallsIcon className="h-4 w-4 text-muted-foreground" /> },
    { label: '输入 Token', value: formatNumber(totals.inputTokens), icon: <InputTokenIcon className="h-4 w-4 text-muted-foreground" /> },
    { label: '输出 Token', value: formatNumber(totals.outputTokens), icon: <OutputTokenIcon className="h-4 w-4 text-muted-foreground" /> },
    { label: '加权成功率', value: formatRate(avgSuccessRate), icon: <SuccessRateIcon className="h-4 w-4 text-muted-foreground" /> },
  ], [totals, avgSuccessRate])

  const columns = useMemo(() => [
    { key: 'vendor', title: '厂商', width: 120, searchable: true },
    { key: 'modelCount', title: '模型数量', width: 100, render: (row: VendorRow) => <span className="text-foreground">{formatNumber(row.modelCount)}</span> },
    { key: 'callCount', title: '调用次数', width: 100, searchable: true, render: (row: VendorRow) => <span className="text-foreground">{formatNumber(row.callCount)}</span> },
    { key: 'inputTokens', title: '输入 Token', width: 140, render: (row: VendorRow) => <span className="text-foreground">{formatNumber(row.inputTokens)}</span> },
    { key: 'outputTokens', title: '输出 Token', width: 140, render: (row: VendorRow) => <span className="text-foreground">{formatNumber(row.outputTokens)}</span> },
    { key: 'successRate', title: '成功率', width: 100, render: (row: VendorRow) => <span className="text-foreground">{formatRate(row.successRate)}</span> },
    { key: 'avgLatencyMs', title: '平均耗时(ms)', width: 110, render: (row: VendorRow) => <span className="text-foreground">{formatNumber(row.avgLatencyMs)}</span> },
    { key: 'latestRequest', title: '最新调用', width: 110, render: (row: VendorRow) => <span className="text-muted-foreground">{row.latestRequest}</span> },
  ], [])

  const toolbarLeft = (
    <div className="flex flex-wrap items-center gap-2">
      <select value={timeWindow} onChange={event => setTimeWindow(event.target.value as TimeWindow)} className="h-8 px-3 text-xs border border-border rounded bg-card text-foreground">
        {WINDOW_OPTIONS.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
      </select>
      <select value={vendorFilter} onChange={event => setVendorFilter(event.target.value)} className="h-8 px-3 text-xs border border-border rounded bg-card text-foreground">
        {vendorOptions.map(vendor => <option key={vendor} value={vendor === '全部厂商' ? '' : vendor}>{vendor}</option>)}
      </select>
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      <PageHeader title="各厂商大模型调用总览" icon={<Icon />} />
      <div className="flex-1 p-4 bg-surface-page overflow-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {cards.map(card => (
            <div key={card.label} className="bg-card border border-border rounded px-4 py-3">
              <div className="flex items-center gap-2">
                {card.icon}
                <p className="text-xs text-muted-foreground">{card.label}</p>
              </div>
              <p className="mt-1 text-xl font-semibold text-foreground">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-surface-toolbar">
            <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <span>厂商维度调用明细</span>
            </h2>
          </div>
          <DataTable
            mode="static"
            data={rows}
            loading={false}
            rowKey="uid"
            columns={columns}
            showRefresh
            onRefresh={() => undefined}
            showColumnToggle
            showSelection={false}
            toolbarLeft={toolbarLeft}
            exportConfig={{ filename: '各厂商大模型调用总览' }}
            emptyText="当前时间窗口暂无调用数据"
          />
        </div>
      </div>
    </div>
  )
}

function Icon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={`text-foreground ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12l4-4m-4 4 4 4M21 12l-4-4m4 4-4 4M12 3v18M12 3l4 4m-4-4-4 4M12 21l4-4m-4 4-4-4" />
    </svg>
  )
}

function ProvidersIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20V9l8-5 8 5v11M7 20v-9M17 20v-9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 13a2 2 0 1 1 6 0" />
    </svg>
  )
}

function CallsIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3m-7-4l7 4 7-4M5 12h2m10 0h2M8 9l4-4 4 4M8 15l4 4 4-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 1 1-6.65 2.35" />
    </svg>
  )
}

function InputTokenIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7V3m10 4V3m-5 4V3m-4 4h6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 17h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 17l-2 2 2 2M19 17l2 2-2 2M9 14h6" />
    </svg>
  )
}

function OutputTokenIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 17h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 17v4m-4-4v4m-6-4v4m-4-4v4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 7l-2-2 2-2M19 7l2-2-2-2M9 14h6" />
    </svg>
  )
}

function SuccessRateIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 6h14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 18h6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 16.5l-2.2-2.2-2.8 2.8m0 0l-2-2-1.5 1.5m4.3-1.5v4.5" />
    </svg>
  )
}
