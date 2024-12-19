const EditProfile = ({ onSave }) => {
  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // Reset height to calculate the correct scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-full  mx-auto">
      {/* Name Input */}
      <div className="flex flex-col gap-2 ">
        <label className="kumbh-sans-font font-normal text-sm text-[#000000]">
          Name
        </label>
        <input
          type="text"
          className="border-b-2 border-[#939090] kumbh-sans-font font-semibold text-sm text-[#000000] resize-none focus:outline-none"
        />
      </div>

      {/* Bio Input */}
      <div className="flex flex-col gap-2">
        <label className="kumbh-sans-font font-normal text-sm text-[#000000]">
          Bio
        </label>
        <textarea
          className="border-b-2 border-[#939090] kumbh-sans-font font-semibold text-sm text-[#000000] resize-none focus:outline-none"
          rows="1"
          onInput={handleInput}
          style={{ overflow: "hidden" }}
        ></textarea>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
        <button
          onClick={onSave}
          className="w-full bg-black text-white py-2 rounded-full text-sm font-semibold tracking-wider hover:bg-gray-800"
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
