import { message } from "antd";

export function showNotification({
  text,
  duration,
}: {
  text: string;
  duration: number;
}) {
  message.info(text, duration);
}
