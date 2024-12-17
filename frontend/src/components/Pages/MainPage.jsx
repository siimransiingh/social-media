import { useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import { getUser } from "../../API/userService";

function MainPage() {
  const [userDetail, setUserDetail] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Get the Firebase ID token
        
          const idToken = await user.getIdToken();

          // Fetch user data from your backend API and pass the token in the Authorization header
          const response = await getUser(user.uid, idToken);  // Send token as second argument
          setUserDetail(response.data); // Set user data from API response
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/";
      console.log("Logged out");
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div>
      {userDetail ? (
        <h1>Welcome, {userDetail.email}!</h1>
      ) : (
        <h1>Loading...</h1>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default MainPage;
