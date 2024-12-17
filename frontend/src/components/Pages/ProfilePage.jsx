import { useEffect, useState } from "react";
import { auth, db } from "../auth/firebase";
import { getDoc, doc } from "firebase/firestore";

function ProfilePage() {
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
  return (
    <div>
      {userDetail ? (<div>{userDetail.firstName}</div>) : (<p>loading</p>)}
    </div>
  )
}

export default ProfilePage