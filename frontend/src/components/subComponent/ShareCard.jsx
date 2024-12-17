import  { useState } from "react";

const ShareCard = () => {
  const [link, setLink] = useState("https://www.arnaw/feed");

  return (
    <div className="fixed top-0 left-0 w-full h-full px-4 flex items-center justify-center bg-[#444444] bg-opacity-[10%] z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Share post</h2>
          <button className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
            <i className="fab fa-twitter"></i>
            <span className="sr-only">Twitter</span>
          </button>
          <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
            <i className="fab fa-facebook"></i>
            <span className="sr-only">Facebook</span>
          </button>
          <button className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600">
            <i className="fab fa-reddit"></i>
            <span className="sr-only">Reddit</span>
          </button>
          <button className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700">
            <i className="fab fa-discord"></i>
            <span className="sr-only">Discord</span>
          </button>
          <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
            <i className="fab fa-whatsapp"></i>
            <span className="sr-only">WhatsApp</span>
          </button>
          <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
            <i className="fab fa-facebook-messenger"></i>
            <span className="sr-only">Messenger</span>
          </button>
          <button className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500">
            <i className="fab fa-telegram"></i>
            <span className="sr-only">Telegram</span>
          </button>
          <button className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600">
            <i className="fab fa-instagram"></i>
            <span className="sr-only">Instagram</span>
          </button>
        </div>
        <div className="flex items-center border-t pt-4">
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-lg"
            readOnly
          />
          <button className="ml-2 text-blue-500 hover:text-blue-600">Copy</button>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
