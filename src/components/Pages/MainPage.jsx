import { useEffect, useState } from "react";
import { auth, db } from "../auth/firebase";
import { getDoc, doc } from "firebase/firestore";

function MainPage() {
  const [userDetail, setUserDetail] = useState(null);

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
        console.log("User is nott logged in");
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
        <h1>Welcome, {userDetail.firstName}!</h1>
      ) : (
        <h1>Loading...</h1>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default MainPage;
