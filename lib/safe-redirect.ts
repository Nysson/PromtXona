/**
 * Login'dan keyin qaytish manzilini tekshiradi: faqat sayt ichidagi nisbiy
 * yo'l ("/prompts/x") qabul qilinadi. "//evil.com", "/\\evil.com" yoki
 * "@evil.com" kabi qiymatlar open redirect'ga olib keladi — ular rad etiladi.
 */
export function safeNextPath(
  value: string | null | undefined,
  fallback = "/profile"
): string {
  if (!value || !value.startsWith("/")) return fallback;
  if (value.startsWith("//") || value.startsWith("/\\")) return fallback;
  return value;
}
