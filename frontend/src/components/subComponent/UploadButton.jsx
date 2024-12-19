import { useState } from "react";
import UploadPost from "./UploadPost";

const UploadButton = () => {
    const [uploadVisible, setUploadVisible] = useState(false);


     const openUpload = () => {
       setUploadVisible(true);
       console.log("visible");
     };

     const closeUpload = () => {
       setUploadVisible(false);
       console.log("hidden");
     };

  return (
    <div className="w-full min-h-full">
      {" "}
      <div className="fixed z-10 rounded-full h-[50px] w-[50px] bottom-4 right-4 text-white bg-black z-100 flex items-center justify-center">
        <img
          onClick={openUpload}
          className="h-4 w-4"
          src="/images/BsPlusLg.svg"
        />
      </div>
      {uploadVisible && <UploadPost onBack={closeUpload} />}
    </div>
  );
};

export default UploadButton;
