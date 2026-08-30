/**
 * Design System - Typography
 * Based on Lingua Design System specification (Poppins Font Family)
 */

export const fonts = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semibold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

export const typography = {
  h1: {
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 38.4, // 32 * 1.2
    fontWeight: "700" as const,
    description: "Page / Screen Title",
  },
  h2: {
    fontFamily: fonts.semibold,
    fontSize: 24,
    lineHeight: 31.2, // 24 * 1.3
    fontWeight: "600" as const,
    description: "Section Title",
  },
  h3: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    lineHeight: 26, // 20 * 1.3
    fontWeight: "600" as const,
    description: "Card / Module Title",
  },
  h4: {
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 22.4, // 16 * 1.4
    fontWeight: "500" as const,
    description: "Subheading",
  },
  bodyLarge: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 25.6, // 16 * 1.6
    fontWeight: "400" as const,
    description: "Important content",
  },
  bodyMedium: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22.4, // 14 * 1.6
    fontWeight: "400" as const,
    description: "Body text",
  },
  bodySmall: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 20.8, // 13 * 1.6
    fontWeight: "400" as const,
    description: "Supporting text",
  },
  caption: {
    fontFamily: fonts.regular,
    fontSize: 11,
    lineHeight: 15.4, // 11 * 1.4
    fontWeight: "400" as const,
    description: "Labels, meta text",
  },
} as const;

export type Typography = typeof typography;
