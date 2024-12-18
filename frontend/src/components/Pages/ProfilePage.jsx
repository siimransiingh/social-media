import { useEffect, useState } from "react";
import { auth, db } from "../auth/firebase";
import { getDoc, doc } from "firebase/firestore";
import MyPosts from "../subComponent/MyPosts";
import EditProfile from "../subComponent/EditProfile";

function ProfilePage() {
  const [userDetail, setUserDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to track if edit mode is active

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserDetail(user);

        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetail(docSnap.data());
        } else {
          console.log("No user data found");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true); // Switch to edit mode
  };

  const handleBackClick = () => {
    setIsEditing(false); // Switch back to view mode
  };

  if (!userDetail) {
    return <p>Loading...</p>;
  }

return (
  <div className=" fixed w-full">
    {userDetail && (
      <div className="relative w-full">
        {/* Background Image */}
        <a href="/explore">
          <img
            src="images/HiArrowSmLeft.svg"
            className="absolute left-2 top-1"
          />
        </a>
        <img
          className="w-[100%] object-cover h-[189px] rounded-b-[20px]"
          src="/images/img3.svg"
          alt="Background"
        />

        {/* Profile Image and Edit Button */}
        <div className="absolute top-[130px] left-4 flex flex-row justify-start gap-4 items-end w-full">
          <div className="w-[112px] h-[112px]">
            <img
              className="transform w-full h-full object-cover rounded-full"
              src="/images/img8.svg"
              alt="Profile"
            />
          </div>
          <div className="flex items-center pb-1 min-w-[168px]">
            <button
              className="karla-font text-xs font-bold border-2 rounded-full px-4 py-1 text-black hover:text-white transition duration-300 w-full"
              onClick={handleEditClick} // Show EditProfile component when clicked
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="z-100 fixed px-4 top-[40%] w-full">
          {isEditing ? (
            <div>
              <EditProfile onBackClick={handleBackClick} />{" "}
              {/* Pass handleBackClick to go back */}
            </div>
          ) : (
            <MyPosts />
          )}
        </div>
      </div>
    )}
  </div>
);


}

export default ProfilePage;
