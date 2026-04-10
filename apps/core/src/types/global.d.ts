import type { DesktopApi } from "@repo/desktop-bridge";

declare global {
  interface Window {
    desktop?: DesktopApi;
  }
}

export {};
