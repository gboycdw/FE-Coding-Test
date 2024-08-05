import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

export function useCustomAlertHook() {
  const customInfoMessage = (message: string, second?: number) => {
    notification.info({ message, duration: second, placement: "top" as NotificationPlacement });
  };

  const customWarningMessage = (message: string, second?: number) => {
    notification.warning({ message, duration: second, placement: "top" as NotificationPlacement });
  };

  const customErrorMessage = (message: string, second?: number) => {
    notification.error({ message, duration: second, placement: "top" as NotificationPlacement });
  };

  const customSuccessMessage = (message: string, second?: number) => {
    notification.success({ message, duration: second, placement: "top" as NotificationPlacement });
  };

  return {
    customInfoMessage,
    customWarningMessage,
    customErrorMessage,
    customSuccessMessage,
  };
}
