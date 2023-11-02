import { UploadDropzone } from "@bytescale/upload-widget-react";

// -----
// Configuration:
// https://www.bytescale.com/docs/upload-widget#configuration
// -----
const options = {
  apiKey: "secret_kW15bkg3tQzmNBALef9V3NjPN8sn", // This is your API key.
  maxFileCount: 1,
  showFinishButton: true, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
  styles: {
    colors: {
      primary: "#377dff",
    },
  },
};

const Upload3dModel = ({ handelChange }) => (
  <UploadDropzone
    options={options}
    onUpdate={({ uploadedFiles }) => {
      handelChange(uploadedFiles.map((x) => x.fileUrl).join("\n"));
    }}
    onComplete={(files) => handelChange(files.map((x) => x.fileUrl).join("\n"))}
    width="600px"
    height="305px"
  />
);

export default Upload3dModel;
