import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const sanitizeNumericInput = (value) => {
  const sanitised = value
    .replace(/[^0-9]/g, "")
    .replace(/^0+/, "")

  return sanitised
}
