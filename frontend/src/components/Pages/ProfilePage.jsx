import { useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import MyPosts from "../subComponent/MyPosts";
import EditProfile from "../subComponent/EditProfile";
import UploadButton from "../subComponent/UploadButton";
import { getUser } from "../../API/userService";
import { cloudinaryConfig } from "../../../config/cloudinary";

function ProfilePage() {
  const [userDetail, setUserDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to track if edit mode is active
  const [profilePicture, setProfilePicture] = useState();
  const [backgroundPicture, setBackgroundPicture] = useState();
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        const userDetail = await getUser(user.uid, idToken);
        console.log("detail", userDetail.data);
        setUserDetail(userDetail);
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const uploadMedia = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", cloudinaryConfig.uploadPreset); // Get this from Cloudinary dashboard

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  const handleEditClick = () => {
    setIsEditing(true); // Switch to edit mode
  };

  const handleSave = async () => {
    await fetchUserData();
    setIsEditing(false); // Exit edit mode and show MyPosts
  };

  if (!userDetail) {
    return <p>Loading...</p>;
  }

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedUrl = await uploadMedia(file);
        setProfilePicture(uploadedUrl);
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
  };

  const handleBackgroundPictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedUrl = await uploadMedia(file);
        setBackgroundPicture(uploadedUrl);
      } catch (error) {
        console.error("Error updating background picture:", error);
      }
    }
  };

  console.log(profilePicture);
  console.log(backgroundPicture);
  return (
    <div className=" fixed w-full">
      {userDetail && (
        <div className="relative w-full">
          {/* Background Image */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="backgroundPictureInput"
            onChange={handleBackgroundPictureChange}
          />
          <a href="/explore">
            <img
              src="images/HiArrowSmLeft.svg"
              className="absolute left-2 top-1"
            />
          </a>

          <div>
            {isEditing && (
              <div
                onClick={() => {
                  console.log("Div clicked");
                  document.getElementById("backgroundPictureInput").click();
                }}
               
              >
                <img
                  alt="editBg"
                  src="images/HiPencil.svg"
                  className=" absolute right-2 bg-[#F4F4F4] cursor-pointer bottom-2 w-[27px] h-[27px] rounded-full  "
                />
              </div>
            )}
            <img
              className="w-[100%] object-cover h-[189px] rounded-b-[20px]"
              src={userDetail?.data?.backgroundPicture || "/images/img3.svg"}
              alt="Background"
            />
          </div>

          {/* Profile Image and Edit Button */}
          <div className="absolute top-[130px] left-4 flex flex-row justify-start gap-4 items-end">
            <div className="w-[112px] h-[112px]">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="profilePictureInput"
                onChange={handleProfilePictureChange}
              />
              {isEditing && (
                <div
                  onClick={() =>
                    document.getElementById("profilePictureInput").click()
                  }
                  className="z-10 cursor-pointer absolute flex items-center justify-center top-14 left-[93px] bg-[#F4F4F4] w-[27px] h-[27px] rounded-full"
                >
                  <img alt="editpfp" src="images/HiPencil.svg" className=" " />
                </div>
              )}
              <img
                className="transform w-full h-full object-cover rounded-full"
                src={userDetail?.data?.displayPicture || "/images/userLogo.jpg"}
                alt="Profile"
              />
            </div>

            {!isEditing && (
              <div className="flex items-center pb-1 min-w-[168px]">
                <button
                  className="karla-font text-xs font-bold border-2 rounded-full px-4 py-1 text-black hover:text-white transition duration-300 w-full"
                  onClick={handleEditClick} // Show EditProfile component when clicked
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          <div className="z-100 fixed px-4 top-[32%] w-full">
            {isEditing ? (
              <div className="mt-[30px]">
                <EditProfile profilePicture={profilePicture} bgPicture={backgroundPicture}
                  onSave={handleSave}
                  initialData={userDetail.data}
                />{" "}
                {/* Pass handleBackClick to go back */}
              </div>
            ) : (
              <MyPosts bio={userDetail?.data?.bio} />
            )}
          </div>
        </div>
      )}
      {!isEditing && <UploadButton />}
    </div>
  );
}

export default ProfilePage;
