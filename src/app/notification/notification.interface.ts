export enum AppNotificationLevel { ERROR = "error", WARNING = "warning", INFO = "info" }

export interface AppNotification {
    level: AppNotificationLevel,
    message: string,
    description: string
}