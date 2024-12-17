import { useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import { getUser } from "../../API/userService";
import Card from "../subComponent/Card";
import { getAllPosts } from "../../API/postService";
import ShareCard from "../subComponent/ShareCard";

function MainPage() {
  const [userDetail, setUserDetail] = useState(null);
  const [posts, setPosts] = useState([]); // State to store posts
  const [loading, setLoading] = useState(true); // State for loading
  const [viewShare, setViewShare] = useState(false);

  const visibleShare = () => {
    setViewShare(!viewShare);
  };

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
          console.log(postsResponse.data);
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

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div>
      {userDetail && (
        <div className="p-4 ">
          <div className="flex flex-col gap-[31px]">
            {" "}
            <div className="flex flex-row items-center">
              <img
                className="w-[50px] h-[50px] rounded-full"
                src={
                  userDetail.displayPicture
                    ? userDetail.displayPicture
                    : "/images/userLogo.jpg"
                }
              />
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
            <div>
              <p className="karla-font text-[#000000]  font-extrabold text-[24px]">
                Feeds
              </p>
            </div>
          </div>
          <div className="mt-[19px]">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Card
                  key={post._id} // Ensure each child has a unique key for performance
                  profilePic="/images/userLogo.jpg"
                  username="Aarav"
                  timeAgo="2 hours ago"
                  caption={post.caption}
                  postImages={post.media}
                  likes={67}
                />
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
          
          <div
            onClick={visibleShare}
            className="fixed rounded-full h-[50px] w-[50px] bottom-4 right-4 text-white bg-black z-100 flex items-center justify-center"
          >
            <img className="h-4 w-4" src="/images/BsPlusLg.svg" />
          </div>
        </div>
      )}
      return (
    <div>
      {userDetail && (
        <div className="p-4 ">
          <div className="flex flex-col gap-[31px]">
            {" "}
            <div className="flex flex-row items-center">
              <img
                className="w-[50px] h-[50px] rounded-full"
                src={
                  userDetail.displayPicture
                    ? userDetail.displayPicture
                    : "/images/userLogo.jpg"
                }
              />
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
            <div>
              <p className="karla-font text-[#000000]  font-extrabold text-[24px]">
                Feeds
              </p>
            </div>
          </div>
          <div className="mt-[19px]">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Card
                  key={post._id} // Ensure each child has a unique key for performance
                  profilePic="/images/userLogo.jpg"
                  username="Aarav"
                  timeAgo="2 hours ago"
                  caption={post.caption}
                  postImages={post.media}
                  likes={67}
                />
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
          
          <div
            onClick={visibleShare}
            className="fixed rounded-full h-[50px] w-[50px] bottom-4 right-4 text-white bg-black z-100 flex items-center justify-center"
          >
            <img className="h-4 w-4" src="/images/BsPlusLg.svg" />
          </div>
        </div>
      )}
      {viewShare && <div className="bg-opacity-[0.07]"><ShareCard /></div> }
    </div>
  );
    </div>
  );
}

export default MainPage;
