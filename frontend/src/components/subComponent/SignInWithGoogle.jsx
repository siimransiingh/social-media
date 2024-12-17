import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../auth/firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUser } from "../../API/userService";

function SignInWithGoogle() {

 async function googleLogin() {
  const provider = new GoogleAuthProvider();
  
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user) {
      console.log("before adding to db");

      // Add user details to Firestore
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        photo: user.photoURL,
      });

      console.log("after adding to db");

      // Obtain ID Token for secure backend API call
      const idToken = await user.getIdToken();

      // Send user details to MongoDB backend
      const response = await createUser({
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        email: user.email,
        bio: "",
        displayPicture: user.photoURL,
        uid: user.uid,
        idToken: idToken,
      });

      console.log("MongoDB response:", response.data);

      // Redirect user to explore page
      window.location.href = "/explore";
    }
  } catch (error) {
    console.error("Error during Google login:", error);
  }
}

  return (
    <div className="bg-white pt-[35px] px-[37px] min-h-[260px] min-w-screen rounded-t-[63px]">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row gap-1 items-center ">
          <img className="h-[46px] w-[34px]" src="/images/logo.svg" />
          <p className="font-semibold text-[28px] leading-[32.73px] karla-font">
            Vibesnap
          </p>
        </div>
        <p className="whitespace-nowrap font-normal text-base leading-5 kumbh-sans-font ">
          Moments That Matter, Shared Forever.
        </p>
        <button
          onClick={googleLogin}
          className="min-w-[232.59px] min-h-[50px] mt-10 px-[14px]   rounded-[26px] bg-[#292929]"
        >
          <div className="flex flex-row items-center gap-2">
            <img className="w-[18px] h-[18px]" src="/images/google.svg" />
            <p className="text-white karla-font font-bold text-base">
              Continue with Google
            </p>
          </div>
        </button>
        <a href="/login" className="karla-font text-sm mt-2">
          Login with email{" "}
        </a>
      </div>
    </div>
  );
}

export default SignInWithGoogle;
