import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../auth/firebase";
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
     <div  className="bg-white pt-[35px] px-[37px] min-h-[260px] min-w-screen rounded-t-[63px]">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row gap-1 items-center ">
          <img className="h-[46px] w-[34px]" src="/images/logo.svg" />
          <p className="font-semibold text-[28px] leading-[32.73px] karla-font">Vibesnap</p>
        </div> 
        <p className="whitespace-nowrap font-normal text-base leading-5 kumbh-sans-font ">Moments That Matter, Shared Forever.</p>
        <button onClick={googleLogin} className="min-w-[232.59px] min-h-[50px] mt-10 px-[14px]   rounded-[26px] bg-[#292929]">
        <div className="flex flex-row items-center gap-2">
          <img className="w-[18px] h-[18px]" src="/images/google.svg" />
          <p className="text-white karla-font font-bold text-base">Continue with Google</p></div>
        </button>
        <a href="/login" className="karla-font text-sm mt-2" >Login with email </a>
      </div>
     

    </div>
  );
}

export default SignInWithGoogle;
