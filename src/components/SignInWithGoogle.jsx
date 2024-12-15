import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./auth/firebase";
import { setDoc, doc } from "firebase/firestore";

function SignInWithGoogle() {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
  
      const user = result.user;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          lastName: "",
          photo: user.photoURL,
        });
        window.location.href = "/explore";
      }
    });
  }

  return (
    <button
      onClick={googleLogin}
      className={
        "px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 "
      }
    >
      sign in with google
    </button>
  );
}

export default SignInWithGoogle;
