import SignInWithGoogle from "../subComponent/SignInWithGoogle"
import EntryPagebg from "../subComponent/EntryPagebg"

const EntryPage = () => {
  return (
     <div className="relative h-screen overflow-hidden">
      <EntryPagebg />
      <div className="absolute min-w-full bottom-0 left-1/2 transform -translate-x-1/2">
        <SignInWithGoogle />
      </div>
    </div>
  )
}

export default EntryPage