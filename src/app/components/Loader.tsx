import React, { useEffect, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { Spin } from "antd";

type LoaderProps = {
  height?: string;
  size?: number;
  color?: string;
  onlySpinner?: boolean;
};

const loadingMessages: string[] = [
  "Fetching data, please wait...",
  "Processing your request, almost done!",
  "Loading, thank you for your patience.",
  "Preparing your data, almost ready!",
  "Processing data, thank you for waiting.",
  "Request in progress, please hold on."
];

const Loader: React.FC<LoaderProps> = ({ height, size, color, onlySpinner = false }) => {
  const antIcon = (
    <SyncOutlined
      className="text-[#FE5200]"
      style={{ fontSize: size || 46, color: color || "#FE5200" }}
      spin
    />
  );

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const randomMessage =
      loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    setMessage(randomMessage);
  }, []);

  return (
    <div className={`w-full ${height ? `h-[${height}]` : "h-[calc(100vh-100px)]"} flex flex-col items-center justify-center gap-2`}>
      <Spin className="m-0" indicator={antIcon} />
      {!onlySpinner && (
        <p className="text-lg relative overflow-hidden bg-clip-text">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loader;