import { UploadDropzone } from "@bytescale/upload-widget-react";

// -----
// Configuration:
// https://www.bytescale.com/docs/upload-widget#configuration
// -----
const options = {
  apiKey: "secret_kW15bkg3tQzmNBALef9V3NjPN8sn", // This is your API key.
  maxFileCount: 5,
  showFinishButton: true, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
  styles: {
    colors: {
      primary: "#377dff",
    },
  },
};

const images = [];

const PanoUploadBotton = ({ handelChange, data }) => (
  <UploadDropzone
    options={options}
    onUpdate={({ uploadedFiles }) => {
      console.log(uploadedFiles.map((x) => x.fileUrl).join("\n") === "");

      if (
        uploadedFiles.map((x) => x.fileUrl).join("\n") !== "" &&
        images.indexOf(uploadedFiles.map((x) => x.fileUrl).join("\n")) === -1
      ) {
        images.push(uploadedFiles.map((x) => x.fileUrl).join("\n"));
      }
    }}
    onComplete={() => {
      console.log(images);
      handelChange(images);
      if (data.length > 0) {
        images.length = 0;
      }
    }}
    width="600px"
    height="305px"
  />
);

export default PanoUploadBotton;
