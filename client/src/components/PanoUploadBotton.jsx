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

const images = [];

const UploadBottonComp = ({ setLink }) => (
  <UploadDropzone
    options={options}
    onUpdate={({ uploadedFiles }) => {
      console.log(uploadedFiles.map((x) => x.fileUrl).join("\n") === "");
    }}
    onComplete={(file) => {
      console.log(images);
      setLink(file.map((x) => x.fileUrl).join("\n"));
    }}
    width="600px"
    height="205px"
  />
);

export default UploadBottonComp;
