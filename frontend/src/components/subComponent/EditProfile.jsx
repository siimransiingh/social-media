import { useState, useEffect } from "react";
import { auth } from "../auth/firebase";
import { editUser } from "../../API/userService";

const EditProfile = ({ onSave }) => {
  const [firstName, setFirstName] = useState("");
  const [bio, setBio] = useState("");

  // Handle input change for firstName and bio
  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "bio") {
      setBio(value);
    }
  };


  // Handle Save button click
  const handleSave = async () => {
    try {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const idToken = await user.getIdToken();
           console.log(idToken);
          const updatedData = {
            firstName,
            bio,
          };
          const response = await editUser(user.uid, idToken, updatedData);
          console.log(idToken)
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
          value={firstName}
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
          value={bio}
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
