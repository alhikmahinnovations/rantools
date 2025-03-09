import { createContext } from "react";

export type NotificationSeverity = "success" | "error" | "warning" | "info";

interface NotificationPayload {
  [key: string]: string | number | boolean;
}

interface NotificationContextType {
  showNotification: (message: string, severity?: NotificationSeverity, payload?: NotificationPayload) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);
