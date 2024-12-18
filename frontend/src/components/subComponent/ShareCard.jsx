import { useState } from "react";
import { PropTypes } from "prop-types";

const ShareCard = ({ onClose }) => {
  const [link, setLink] = useState("https://www.arnaw/feed");

const platforms = [
  { platform: "Twitter", bgColor: "#E9F6FB", icon: "/images/twitter.svg" },
  { platform: "Facebook", bgColor: "#E7F1FD", icon: "/images/facebook.svg" },
  { platform: "Reddit", bgColor: "#FDECE7", icon: "/images/reddit.svg" },
  { platform: "Discord", bgColor: "#ECF5FA", icon: "/images/discord.svg" },
  { platform: "Whatsapp", bgColor: "#E7FBF0", icon: "/images/whatsapp.svg" },
  { platform: "Messenger", bgColor: "#E5F3FE", icon: "/images/messenger.svg" },
  { platform: "Telegram", bgColor: "#E6F3FB", icon: "/images/telegram.svg" },
  { platform: "Instagram", bgColor: "#FF40C617", icon: "/images/instagram.svg" },
  ];
  
  const ShareButton = ({ platform, bgColor, icon }) => (
  <div className="flex flex-col items-center">
    <button
      className={`items-center flex justify-center text-white p-2 w-[56px] h-[56px] rounded-full`}
      style={{ backgroundColor: bgColor }}
    >
      <img src={icon} alt={`${platform} icon`} />
    </button>
    <p className="kumbh-sans-font text-xs font-regular mt-2 opacity-[60%]">
      {platform}
    </p>
  </div>
  );
  ShareButton.propTypes = {
  platform: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
  return (
    <div className="fixed top-0 left-0 w-full h-full px-4 flex items-center justify-center bg-[#444444] bg-opacity-[10%] z-50">
      <div className="bg-white min-h-[379px] min-w-[328px] py-6 px-5 rounded-xl shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[22px] karla-font text-black font-bold">
            Share post
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 bg-[#f5f5f5] h-8 w-8 rounded-full flex items-center justify-center leading-none"
          >
            &times;
          </button>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {platforms.map(({ platform, bgColor, icon }) => (
            <ShareButton
              key={platform}
              platform={platform}
              bgColor={bgColor}
              icon={icon}
            />
          ))}
        </div>

        <div className="flex pt-6 flex-col gap-2 items-start">
          <p className="karla-font text-black text-[16px] font-semibold">
            Page Link
          </p>
          <div className="w-full  px-[13px] flex items-center bg-[#D9D9D9] p-2 rounded-lg ">
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="flex-grow bg-transparent outline-none"
              readOnly
            />
            <img
              className="ml-2 cursor-pointer"
              src="/images/copy.svg"
              alt="Copy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ShareCard.propTypes = {
  onClose: PropTypes.func.isRequired,
};


export default ShareCard;
