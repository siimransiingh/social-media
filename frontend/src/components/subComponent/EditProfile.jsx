import { useState, useEffect } from "react";
import { auth } from "../auth/firebase";
import { editUser } from "../../API/userService";

const EditProfile = ({ onSave, initialData, profilePicture , bgPicture }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    bio: "",
    profilePicture: "",
    bgpicture : ""

  });
console.log(bgPicture);
   useEffect(() => {
     // Initialize form with user data if available
     if (initialData) {
       setFormData({
         firstName: initialData.firstName || "",
         bio: initialData.bio || "",
         displayPicture: profilePicture || "",
         backgroundPicture: bgPicture || "",
       });
     }

     console.log("changed")
   }, [initialData]);
  
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
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const idToken = await user.getIdToken();

          const response = await editUser(user.uid, idToken, formData);

          console.log("User updated:", response.data);
          onSave(); // Call onSave to close the form or update the UI
        } else {
          console.log("User is not logged in");
        }
      });
    } catch (error) {
      console.error("Error updating user:", error);
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
