// Utility function to handle number input and remove leading zeros
export function parseNumberInput(value: string): number {
  // Handle empty string
  if (value === '') return 0

  // Remove spaces (thousand separators) before parsing
  const cleanValue = value.replace(/\s/g, '')

  // Parse the number - this automatically removes leading zeros
  const parsed = parseFloat(cleanValue)

  // Return 0 for NaN, otherwise return the parsed number
  return isNaN(parsed) ? 0 : parsed
}

// Format number for display in input fields with Swedish thousand separators
export function formatNumberForInput(value: number): string {
  if (value === 0) return ''
  return value.toLocaleString('sv-SE', { maximumFractionDigits: 10 })
}

// Parse formatted input back to number
export function parseFormattedInput(value: string): number {
  if (value === '') return 0
  // Remove spaces and parse
  const cleanValue = value.replace(/\s/g, '').replace(',', '.')
  const parsed = parseFloat(cleanValue)
  return isNaN(parsed) ? 0 : parsed
}

// Function to handle immediate leading zero removal on input
export function handleLeadingZeros(e: React.FormEvent<HTMLInputElement>) {
  const target = e.target as HTMLInputElement
  const value = target.value

  // Remove leading zeros but keep single "0" and allow decimal values
  if (
    value.length > 1 &&
    value.startsWith('0') &&
    value[1] !== '.' &&
    value[1] !== ','
  ) {
    const cleanValue = value.replace(/^0+/, '') || '0'
    if (cleanValue !== value) {
      // Store cursor position
      const cursorPosition = target.selectionStart
      // Update the visual value
      target.value = cleanValue
      // Restore cursor position (accounting for removed characters)
      const removedChars = value.length - target.value.length
      const newPosition = Math.max(0, (cursorPosition || 0) - removedChars)
      setTimeout(() => {
        target.setSelectionRange(newPosition, newPosition)
      }, 0)
    }
  }
}
