import { useState, useEffect } from "react";
import { auth } from "../auth/firebase";
import { editUser } from "../../API/userService";
import useUserStore from "../../store/userStore";


const EditProfile = ({ onSave, initialData }) => {
   const { updateUserProfile, profilePicture, backgroundPicture } =
     useUserStore();

  const [formData, setFormData] = useState({
    firstName: "",
    bio: "",
    displayPicture: "",
    backgroundPicture: "",
  });

   useEffect(() => {
     // Initialize form with user data if available
     if (initialData) {
       setFormData({
         firstName: initialData.firstName || "",
         bio: initialData.bio || "",
         displayPicture: profilePicture || "",
         backgroundPicture: backgroundPicture || "",
       });
     }

     console.log("changed");
   }, [initialData, profilePicture, backgroundPicture]);
  
  // Handle input change for firstName and bio
const handleInput = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  // Handle Save button click
const handleSave = async () => {
  try {
    // Include the current profile and background picture URLs in the update
    const updatedData = {
      ...formData,
      displayPicture: profilePicture,
      backgroundPicture: backgroundPicture,
    };

    await updateUserProfile(updatedData);
    onSave();
  } catch (error) {
    console.error("Error saving profile:", error);
  }
};

  return (
    <div className="flex flex-col gap-4 p-4 max-w-full mx-auto">
      {/* Name Input */}
      <div className="flex flex-col gap-2">
        <label className="kumbh-sans-font font-normal text-sm text-[#000000]">
          Name
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInput}
          className="border-b-2 border-[#939090] kumbh-sans-font font-semibold text-sm text-[#000000] resize-none focus:outline-none"
        />
      </div>

      {/* Bio Input */}
      <div className="flex flex-col gap-2">
        <label className="kumbh-sans-font font-normal text-sm text-[#000000]">
          Bio
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInput}
          className="border-b-2 border-[#939090] kumbh-sans-font font-semibold text-sm text-[#000000] resize-none focus:outline-none"
          rows="1"
          style={{ overflow: "hidden" }}
        ></textarea>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
        <button
          onClick={handleSave}
          className="w-full bg-black text-white py-2 rounded-full text-sm font-semibold tracking-wider hover:bg-gray-800"
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
