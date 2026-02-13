export function sanitizeInput(input: string, maxLength: number = 100): string {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>'"&\\]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
}

export function sanitizePhone(phone: string): string {
  // Keep only digits and leading +
  return phone.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '');
}

export function sanitizeName(name: string): string {
  // Allow letters, spaces, apostrophes, dots, and hyphens. No numbers or other symbols.
  return name
    .replace(/[^a-zA-Z\s'.-]/g, '')
    .slice(0, 100);
}

export function isValidPhone(phone: string): boolean {
  // Kenyan Phone Number Regex
  // Prefixes: 07..., 01..., 254..., +254...
  // ISP Codes:
  // Safaricom: 070, 071, 072, 0740-0743, 0745, 0746, 0748, 0757-0759, 0768, 0769, 079, 0110-0115
  // Airtel: 073, 0750-0756, 078, 010
  // Telkom: 077, 020
  // Faiba: 0747

  // Regex breakdown:
  // ^(?:254|\+254|0)? - Optional prefix
  // (
  //   7(?:0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-35-8]|5[0-9]|6[89]|7[0-9]|8[0-9]|9[0-9]) - 7 series
  //   |
  //   1(?:0[0-2]|1[0-5]) - 1 series (010, 011)
  //   |
  //   20[0-9] - 2 series (020)
  // )
  // [0-9]{6}$ - Remaining 6 digits

  const kenyanPhoneRegex = /^(?:254|\+254|0)?((?:7(?:0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-35-8]|5[0-9]|6[89]|7[0-9]|8[0-9]|9[0-9])|1(?:0[0-2]|1[0-5])|20[0-9])[0-9]{6})$/;
  return kenyanPhoneRegex.test(phone);
}

export function isValidName(name: string): boolean {
  // Must be at least 2 chars long and contain at least one space (implying two names)
  return name.trim().length >= 2 && name.trim().includes(' ');
}
