import { useState, useEffect } from "react";
import { auth } from "../auth/firebase";
import { getUser } from "../../API/userService";
import { getPostofUser } from "../../API/postService";

const MyPosts = () => {
  const [userDetail, setUserDetail] = useState(null);
  const [postImg, setPostsImg] = useState([]);

  const fetchUserData = async () => {
    try {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const idToken = await user.getIdToken();
          const userDetail = await getUser(user.uid, idToken);
          const posts = await getPostofUser(user.uid, idToken);

          setPostsImg(posts.data); // Assuming `posts.data` contains the array of posts
          setUserDetail(userDetail);
        } else {
          console.log("User is not logged in");
        }
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log("Posts updated:", postImg);
  }, [postImg]);

  // Post component to display each post
const Post = ({ media, likes, caption }) => {
  return (
    <div className="flex flex-col mb-4">
      <div className="relative">
        <div className="absolute bottom-6 left-3 z-10">
          <div className="flex flex-col items-left justify-center">
            <p className="text-sm text-white kumbh-sans-font mt-2">{caption}</p>
            <div className="flex flex-row items-center">
              <img src="/images/HiHeartWhite.svg" alt="Likes" />
              <p className="text-xs text-white font-semibold">{likes}</p>
            </div>
          </div>
        </div>

        {/* Display only the first image from the media array */}
        <img
          className="masonry-item-mob min-h-full min-w-full object-cover rounded-lg"
          src={media[0]}
          alt={`Media 1`}
        />

        {/* Display number of images in the media array */}
        {media.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
            {media.length} {media.length > 1 ? "images" : "image"}
          </div>
        )}
      </div>
    </div>
  );
};


  return (
    <div>
      {postImg.length > 0 && userDetail ? (
        <div>
          <div>
            <p className="karla-font text-black text-[24px] font-extrabold">
              {userDetail.firstName}
            </p>
            <p className="kumbh-sans-font text-black font-normal text-[14px]">
              Just someone who loves designing, sketching, and finding beauty in
              the little things 💕
            </p>
          </div>
          <div>
            <p className="karla-font font-semibold text-[18px] text-black mt-6">
              My Posts
            </p>
            <div className="overflow-y-auto overflow-x-hidden max-h-[400px]">
              <div className="masonry-layout-mob masonry-layout mt-4">
                {postImg.map((post, index) => (
                  <Post
                    key={index}
                    media={post.media}
                    likes={post.likes}
                    caption={post.caption}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">
          No posts available or user not logged in.
        </p>
      )}
    </div>
  );
};

export default MyPosts;
