import * as React from 'react'
import { parseNumberInput, formatNumberForInput } from '../utils'

export default function FormattedNumberInput({
  value,
  onChange,
  className,
  ...props
}: {
  value: number
  onChange: (value: number) => void
  className?: string
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'type'
>) {
  const [displayValue, setDisplayValue] = React.useState('')
  const [isFocused, setIsFocused] = React.useState(false)

  // Update display value when external value changes and input is not focused
  React.useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatNumberForInput(value))
    }
  }, [value, isFocused])

  // Set initial display value
  React.useEffect(() => {
    setDisplayValue(formatNumberForInput(value))
  }, [])

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    // Show raw number for editing
    const rawValue = value === 0 ? '' : value.toString()
    setDisplayValue(rawValue)
    e.target.select() // Select all for easy replacement
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    // Parse, update, and format
    const numericValue = parseNumberInput(displayValue)
    onChange(numericValue)
    setDisplayValue(formatNumberForInput(numericValue))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(e.target.value)
  }

  return (
    <input
      {...props}
      type="text"
      className={className}
      value={displayValue}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  )
}
