import PropTypes from "prop-types";
import { useState } from "react";

const Card = ({
  profilePic,
  username,
  timeAgo,
  caption,
  postImages,
  likes,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const IMAGES_PER_VIEW = 2; // Number of images to display per row

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - IMAGES_PER_VIEW < 0
        ? 0
        : prevIndex - IMAGES_PER_VIEW
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + IMAGES_PER_VIEW >= postImages.length
        ? prevIndex
        : prevIndex + IMAGES_PER_VIEW
    );
  };

  return (
    <div className="bg-[#F7EBFF] max-w-sm mx-auto p-3 mb-[10px] rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-[14px]">
        <img
          src={profilePic}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-2">
          <h2 className="text-[#000000] karla-font text-[16px] font-semibold">
            {username}
          </h2>
          <p className="text-gray-500 kumbh-sans-font text-[10px] font-normal">
            {timeAgo}
          </p>
        </div>
      </div>

      {/* Caption */}
      <p className="text-[#000000] text-[12px] mb-2 kumbh-sans-font font-normal">
        {caption}{" "}
      </p>

      {/* Carousel - Multi-Image View */}
      <div className="relative w-full overflow-hidden mb-4">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${(currentIndex / postImages.length) * 100}%)`,
          }}
        >
          {postImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-1/2 px-1"
              style={{ flex: `0 0 ${100 / IMAGES_PER_VIEW}%` }}
            >
              <img
                src={image}
                alt={`Post ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-1 rounded-full hover:bg-gray-800"
          >
            &#8592;
          </button>
        )}

        {currentIndex + IMAGES_PER_VIEW < postImages.length && (
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-1 rounded-full hover:bg-gray-800"
          >
            &#8594;
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className=" mr-1 text-xl"><img src="/images/HiHeart.svg"/></span>
          <span className="text-[#D95B7F] font-semibold text-[12px] kumbh-sans-font">{likes}</span>
        </div>
        <button className=" gap-1 flex items-center rounded-[30px] py-[7px]  bg-black bg-opacity-[0.07] hover:bg-gray-300  font-medium px-4">
          <img src="/images/navigation-2.svg"/> <span className="karla-font text-black">Share</span>
        </button>
      </div>
    </div>
  );
};

// PropTypes Validation
Card.propTypes = {
  profilePic: PropTypes.string.isRequired, // URL of the profile picture
  username: PropTypes.string.isRequired, // Username of the post owner
  timeAgo: PropTypes.string.isRequired, // Time of the post
  caption: PropTypes.string.isRequired, // Post caption
  postImages: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of image URLs
  likes: PropTypes.number.isRequired, // Number of likes
};

export default Card;
