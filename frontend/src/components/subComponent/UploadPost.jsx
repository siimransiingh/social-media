import { useState } from "react";

const UploadPost = ({ onBack }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleBulletClick = (index) => {
    setCurrentIndex(index);
  };

  const hasImages = selectedFiles.some((file) =>
    file.type.startsWith("image/")
  );
  const hasVideos = selectedFiles.some((file) =>
    file.type.startsWith("video/")
  );

  const handleDelete = (index) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);

      // If we're deleting the last item or current item, adjust the index
      if (currentIndex >= updatedFiles.length) {
        setCurrentIndex(Math.max(0, updatedFiles.length - 1));
      }

      return updatedFiles;
    });
  };

  return (
    <div className="z-10 fixed top-0 bg-white w-full min-h-screen px-4 py-[25px]">
      <div className="flex flex-row gap-4 items-center">
        <img onClick={onBack} src="/images/HiArrowSmLeftAlt.svg" alt="Back" />
        <p className="karla-font text-black text-[20px] font-extrabold">
          New post
        </p>
      </div>

      {selectedFiles.length > 0 ? (
        <div className="mt-6 flex flex-col items-center">
          <div className="flex justify-center items-center relative">
            {selectedFiles[currentIndex]?.type.startsWith("image/") && (
              <div className="relative">
                <img
                  src={URL.createObjectURL(selectedFiles[currentIndex])}
                  alt="Selected"
                  className="object-cover min-w-[285px] h-[285px] rounded-lg"
                />
                <div className="absolute  bg-[#FFFFFF] right-2 top-2 w-[50px] h-[20px] rounded-[10px] flex items-center justify-center">
                  <p className="whitespace-nowrap text-black karlna-font text-xs font-semibold">
                    {currentIndex + 1} / {selectedFiles.length}
                  </p>
                </div>

                <img
                  onClick={() => handleDelete(currentIndex)}
                  src="/images/delete.svg"
                  alt="Delete"
                  className="absolute bottom-2 right-2 w-6 h-6 cursor-pointer"
                />
              </div>
            )}
            {selectedFiles[currentIndex]?.type.startsWith("video/") && (
              <div className="relative">
                <video
                  controls
                  src={URL.createObjectURL(selectedFiles[currentIndex])}
                  className="min-w-[285px] h-[285px] object-cover rounded-lg"
                />
                <div className="absolute  bg-[#FFFFFF] right-2 top-2 w-[50px] h-[20px] rounded-[10px] flex items-center justify-center">
                  <p className="whitespace-nowrap text-black karlna-font text-xs font-semibold">
                    {currentIndex + 1} / {selectedFiles.length}
                  </p>
                </div>
                <img
                  onClick={() => handleDelete(currentIndex)}
                  src="/images/delete.svg"
                  alt="Delete"
                  className="absolute bottom-2 right-2 w-6 h-6 cursor-pointer"
                />
              </div>
            )}
          </div>

          <div className="flex mt-3 gap-2">
            {selectedFiles.map((_, index) => (
              <button
                key={index}
                className={`h-1 w-1 rounded-full ${
                  index === currentIndex
                    ? "bg-black"
                    : "bg-gray-400 hover:bg-gray-600"
                }`}
                onClick={() => handleBulletClick(index)}
              ></button>
            ))}
          </div>

          {hasImages && (
            <label className="flex flex-row w-full items-center gap-1 cursor-pointer">
              <img src="/images/photos.svg" alt="Add Photos" />
              <p className="kumbh-sans-font text-sm font-bold text-black">
                Add more photos
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}
          {hasVideos && (
            <label className="flex flex-row w-full items-center gap-1 cursor-pointer">
              <img src="/images/video.svg" alt="Video" />
              <p className="kumbh-sans-font text-sm font-bold text-black">
                Add more videos
              </p>
              <input
                type="file"
                accept="video/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}

          <textarea
            placeholder="What's on your mind?"
            className="w-full bg-[#D9D9D99C] min-h-[300px] px-2 py-5 opacity-[61%] mt-[14px] rounded-lg"
          ></textarea>
        </div>
      ) : (
        <textarea
          placeholder="What's on your mind?"
          className="w-full bg-[#D9D9D99C] h-[250px] px-[7px] py-5 opacity-[61%] mt-[15px] rounded-lg"
        ></textarea>
      )}

      {selectedFiles.length === 0 && (
        <div className="flex flex-col gap-4 mt-[22px]">
          <label className="flex flex-row items-center gap-1 cursor-pointer">
            <img src="/images/photos.svg" alt="Photos" />
            <p className="kumbh-sans-font text-sm font-bold text-black">
              Photos
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <label className="flex flex-row items-center gap-1 cursor-pointer">
            <img src="/images/video.svg" alt="Video" />
            <p className="kumbh-sans-font text-sm font-bold text-black">
              Video
            </p>
            <input
              type="file"
              accept="video/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <label className="flex flex-row items-center gap-1 cursor-pointer">
            <img src="/images/camera.svg" alt="Camera" />
            <p className="kumbh-sans-font text-sm font-bold text-black">
              Camera
            </p>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      )}

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-full px-4">
        <a href="/explore">
          <button className="w-full bg-black text-white py-2 rounded-full text-sm font-semibold tracking-wider hover:bg-gray-800">
            CREATE
          </button>
        </a>
      </div>
    </div>
  );
};

export default UploadPost;
