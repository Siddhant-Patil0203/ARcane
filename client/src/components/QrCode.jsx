import React from "react";
import { QRCode } from "antd";
import { Button } from "@nextui-org/react";
import { ImQrcode } from "react-icons/im";
const downloadQRCode = () => {
  const canvas = document.getElementById("myqrcode")?.querySelector("canvas");
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.download = "QRCode.png";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
const QrCode = ({ link }) => (
  <div id="myqrcode" className="flex flex-col justify-center items-center">
    <QRCode
      value={link}
      bgColor="#fff"
      size={250}
      style={{
        marginBottom: 16,
      }}
    />
    <Button
      color="primary"
      endContent={<ImQrcode />}
      onClick={downloadQRCode}
      className="w-[200px]"
    >
      Download QR
    </Button>
  </div>
);
export default QrCode;
