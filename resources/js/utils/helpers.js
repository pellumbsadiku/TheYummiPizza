import { Button, notification } from "antd";

export const openNotificationWithIcon = (type, message) => {
    notification[type]({
        message
    });
};
