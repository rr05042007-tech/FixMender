
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function validateLogin(email: string, password: string): string | null {
  if (!email.trim()) return "Please enter your email.";
  if (!isValidEmail(email)) return "Please enter a valid email.";
  if (!password) return "Please enter your password.";
  if (!isValidPassword(password)) {
    return "Password must contain at least 8 characters.";
  }
  return null;
}
