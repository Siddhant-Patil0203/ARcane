import { UploadDropzone } from "@bytescale/upload-widget-react";

// -----
// Configuration:
// https://www.bytescale.com/docs/upload-widget#configuration
// -----
const options = {
  apiKey: "public_kW15bkgR8Hr82MCvEkL4dVUGDNC4", // This is your API key.
  maxFileCount: 1,
  showFinishButton: true, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
  styles: {
    colors: {
      primary: "#377dff",
    },
  },
};

const UploadBottonComp = ({ setImgLink }) => (
  <UploadDropzone
    options={options}
    onUpdate={({ uploadedFiles }) => {
      // console.log(uploadedFiles.map((x) => x.fileUrl).join("\n"));
      setImgLink(uploadedFiles.map((x) => x.fileUrl).join("\n"));
    }}
    onComplete={(files) => alert(files.map((x) => x.fileUrl).join("\n"))}
    width="600px"
    height="205px"
  />
);

export default UploadBottonComp;
