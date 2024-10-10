import React from "react";
import Notifications from "./components/Notifications";
import { messagesNotifications } from "./components/moskData";

const getMessages = async () => {
  const messagesNotification = messagesNotifications;
  return messagesNotification;
};

const NotificationsPage = async () => {
  const messages = await getMessages();

  return (
    <div className="page-notificacions">
      <Notifications messages={messages} />
    </div>
  );
};

export default NotificationsPage;
