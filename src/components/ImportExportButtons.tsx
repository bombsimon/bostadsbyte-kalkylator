import type { State } from '../types'

export default function ImportExportButtons({
  s,
  onImport,
  className = '',
}: {
  s: State
  onImport: (data: State) => void
  className?: string
}) {
  const onExport = () => {
    const dataStr = JSON.stringify(s, null, 2)
    const blob = new Blob([dataStr], {
      type: 'application/json;charset=utf-8;',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'bostadsbyte-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const onImportClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async e => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        try {
          const text = await file.text()
          const data = JSON.parse(text)
          onImport(data)
        } catch (error) {
          alert(
            'Fel vid inläsning av fil. Kontrollera att det är en giltig JSON-fil.'
          )
        }
      }
    }
    input.click()
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        className={`btn-ghost ${className ? 'flex-1' : ''}`}
        onClick={onExport}
      >
        Exportera data
      </button>
      <button
        className={`btn-ghost ${className ? 'flex-1' : ''}`}
        onClick={onImportClick}
      >
        Importera data
      </button>
    </div>
  )
}
