import { useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import { getUser } from "../../API/userService";
import Card from "../subComponent/Card";
import { getAllPosts } from "../../API/postService";
import UploadButton from "../subComponent/UploadButton";

function MainPage() {
  const [userDetail, setUserDetail] = useState(null);
  const [posts, setPosts] = useState([]); // State to store posts
  const [loading, setLoading] = useState(true); // State for loading

  const colors = [
    "bg-[#F7EBFF]",
    "bg-[#FFFAEE]",
    "bg-[#e1f7d5]",
    "bg-[#ffbddd]",
    "bg-[#c9c9ff]",
  ];

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Get the Firebase ID token

          const idToken = await user.getIdToken();

          // Fetch user data from your backend API and pass the token in the Authorization header
          const response = await getUser(user.uid, idToken); // Send token as second argument
          setUserDetail(response.data); // Set user data from API response

          // Fetch posts using the ID token
          const postsResponse = await getAllPosts(idToken);
          setPosts(postsResponse.data); // Set posts data
         
          setLoading(false); // Set loading to false once data is fetched
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      } else {
        console.log("User is not logged in");
        setLoading(false);
      }
    });
  };
  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/";
      console.log("Logged out");
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);
console.log(posts)
  if (loading) {
    return <div>Loading...</div>; 
  }
const calculateTimeAgoInHours = (createdAt) => {
  const createdTime = new Date(createdAt).getTime(); 
  const currentTime = Date.now(); 
  const differenceInMilliseconds = currentTime - createdTime; 
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  return Math.floor(differenceInHours); 
};

  return (
    <div>
      {userDetail && (
        <div className="p-4 ">
          <div className="flex flex-col gap-[31px]">
            {" "}
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center">
                <a href="/myProfile">
                  <img
                    href="/myProfile"
                    className="w-[50px] h-[50px] rounded-full"
                    src={
                      userDetail.displayPicture
                        ? userDetail.displayPicture
                        : "/images/userLogo.jpg"
                    }
                  />
                </a>
                <div>
                  <p className=" kumbh-sans-font flex flex-col">
                    <span className="text-[10px] font-normal leading-[12.4px] color-[#000000] opacity-[33%]">
                      Welcome Back,
                    </span>
                    <span className=" text-[16px] font-semibold leading-[19.84px] text-left text-[#000000]">
                      {" "}
                      {userDetail.firstName}{" "}
                      {userDetail.lastName ? userDetail.lastName : ""}{" "}
                    </span>
                  </p>
                </div>
              </div>
              <p onClick={handleLogout}>
                <img className="w-5 h-5" src="/images/logout.svg" />
              </p>
            </div>
            <div>
              <p className="karla-font text-[#000000]  font-extrabold text-[24px]">
                Feeds
              </p>
            </div>
          </div>
          <div className="mt-[19px] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <Card
                  key={post._id} // Ensure each child has a unique key for performance
                  profilePic="/images/userLogo.jpg"
                  username={post?.user?.firstName}
                  timeAgo={`${calculateTimeAgoInHours(
                    post?.createdAt
                  )} hours ago`}
                  caption={post.caption}
                  postImages={post.media}
                  likes={67}
                  bgColor={colors[index % colors.length]}
                  text={post.text}
                />
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </div>
      )}
      <UploadButton />
    </div>
  );
}

export default MainPage;
