export enum AppNotificationLevel { ERROR, WARNING, INFO }

export interface AppNotification {
    level: AppNotificationLevel,
    message: string,
    description: string
}