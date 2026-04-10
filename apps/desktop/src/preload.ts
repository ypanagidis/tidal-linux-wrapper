import {
  DesktopHelloResponseSchema,
  DesktopPingRequestSchema,
  DesktopPingResponseSchema,
  DESKTOP_CHANNELS,
  type DesktopApi,
} from "@repo/desktop-bridge";
import { contextBridge, ipcRenderer } from "electron";

const desktopApi: DesktopApi = {
  hello: async () => {
    const response = await ipcRenderer.invoke(DESKTOP_CHANNELS.hello);
    return DesktopHelloResponseSchema.parse(response);
  },
  ping: async (input) => {
    const request = DesktopPingRequestSchema.parse(input);
    const response = await ipcRenderer.invoke(DESKTOP_CHANNELS.ping, request);
    return DesktopPingResponseSchema.parse(response);
  },
};

contextBridge.exposeInMainWorld("desktop", desktopApi);
