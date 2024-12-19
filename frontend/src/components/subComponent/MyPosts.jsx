import { useState, useEffect } from "react";
import { auth, db } from "../auth/firebase";
import { getDoc, doc } from "firebase/firestore";

const MyPosts = () => {
  const [userDetail, setUserDetail] = useState(null);

  // Fetch user data from Firebase
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetail({ ...user, ...docSnap.data() }); // Combine user data and Firestore data
        } else {
          console.log("No user data found");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const postInfo = [
    { imgSrc: "/images/img4.svg", likes: 35, caption: "alala" },
    { imgSrc: "/images/img6.svg", likes: 35, caption: "alala" },
    { imgSrc: "/images/img1.svg", likes: 35, caption: "alala" },
    { imgSrc: "/images/img1.svg", likes: 35, caption: "alala" },
    { imgSrc: "/images/img1.svg", likes: 35, caption: "alala" },
    { imgSrc: "/images/img9.svg", likes: 35, caption: "alala" },
    { imgSrc: "/images/img9.svg", likes: 35, caption: "alala" },
    { imgSrc: "/images/img9.svg", likes: 35, caption: "alala" },
    { imgSrc: "/images/img9.svg", likes: 35, caption: "alala" },
    { imgSrc: "/images/img10.svg", likes: 35, caption: "alala" },
    { imgSrc: "/images/img5.svg", likes: 35, caption: "alala" },
    { imgSrc: "/images/img5.svg", likes: 35, caption: "alala" },
  ];

  // Post component to display each post
  const Post = ({ imgSrc, likes, caption }) => (
    <div className="flex flex-col">
      <div className="flex  relative">
        <div className="absolute bottom-6 left-3">
          <div className="flex flex-col items-left justify-center">
            <p className="text-sm text-white kumbh-sans-font mt-2">{caption}</p>
            <div className="flex flex-row items-center">
              <img src="/images/HiHeartWhite.svg" />{" "}
              <p className="text-xs text-white font-semibold">{likes}</p>
            </div>
          </div>
        </div>
        <img
          className="masonry-item-mob min-h-full min-w-full object-cover rounded-lg"
          src={imgSrc}
          alt="Post"
        />
      </div>
    </div>
  );

  return (
    <div>
      {userDetail && (
        <div className="">
          <div>
            <p className="karla-font text-black text-[24px] font-extrabold">
              {userDetail.firstName}
            </p>
            <p className="kumbh-sans-font text-black font-normal text-[14px]">
              Just someone who loves designing, sketching, and finding beauty in
              the little things 💕
            </p>
          </div>
          <div className=" ">
            <p className="karla-font font-semibold text-[18px] text-black mt-6">
              My Posts
            </p>
            <div className="overflow-y-auto overflow-x-hidden max-h-[400px]">
              <div className="masonry-layout-mob masonry-layout mt-4">
                {postInfo.map((post, index) => (
                  <Post
                    key={index}
                    imgSrc={post.imgSrc}
                    likes={post.likes}
                    caption={post.caption}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
