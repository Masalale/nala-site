export function sanitizeInput(input: string, maxLength: number = 100): string {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>'"&\\]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
}

export function sanitizePhone(phone: string): string {
  return phone
    .trim()
    .replace(/[^\d+\-() ]/g, '')
    .slice(0, 20)
}

export function sanitizeName(name: string): string {
  return name
    .trim()
    .slice(0, 100)
    .replace(/[<>'"&\\]/g, '')
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d+\-() ]{7,20}$/
  return phoneRegex.test(phone)
}

export function isValidName(name: string): boolean {
  return name.length >= 2 && name.length <= 100
}
