export const locales = ["en", "jp"] as const;
export type Locale = (typeof locales)[number];
