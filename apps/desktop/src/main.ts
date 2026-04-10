import {
  DesktopHelloResponseSchema,
  DesktopPingRequestSchema,
  DesktopPingResponseSchema,
  DESKTOP_CHANNELS,
} from "@repo/desktop-bridge";
import { APP_DEV_URL } from "@repo/tooling";
import { app, BrowserWindow, ipcMain, shell } from "electron";
import path from "node:path";

const APP_URL = process.env.APP_URL ?? APP_DEV_URL;

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 1024,
    minHeight: 700,
    show: false,
    backgroundColor: "#F6F7FB",
    webPreferences: {
      preload: path.join(process.cwd(), "dist", "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  void mainWindow.loadURL(APP_URL);
}

function registerIpcHandlers() {
  ipcMain.handle(DESKTOP_CHANNELS.hello, () => {
    return DesktopHelloResponseSchema.parse({
      message: "Hello from Electron main process.",
      appVersion: app.getVersion(),
      platform: process.platform,
    });
  });

  ipcMain.handle(DESKTOP_CHANNELS.ping, (_event, input: unknown) => {
    const request = DesktopPingRequestSchema.parse(input);

    return DesktopPingResponseSchema.parse({
      ok: true,
      message: `Electron main received: ${request.message}`,
      platform: process.platform,
    });
  });
}

void app.whenReady().then(() => {
  registerIpcHandlers();
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
