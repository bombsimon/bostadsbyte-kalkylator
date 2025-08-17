import * as React from 'react'

export default function CollapsibleSection({
  title,
  children,
  defaultExpanded = true,
}: {
  title: string | React.ReactNode
  children: React.ReactNode
  defaultExpanded?: boolean
}) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)

  return (
    <section className="card p-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isExpanded && <div className="mt-2">{children}</div>}
    </section>
  )
}
