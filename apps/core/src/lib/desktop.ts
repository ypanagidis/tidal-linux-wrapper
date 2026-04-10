import type { DesktopApi } from "@repo/desktop-bridge";

export const getDesktopApi = (): DesktopApi | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.desktop ?? null;
};
