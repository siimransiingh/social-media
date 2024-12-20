import { create } from "zustand";
import { getUser, editUser } from "../API/userService";
import { auth } from "../components/auth/firebase";
import { cloudinaryConfig } from "../../config/cloudinary";
import { getAllPosts } from "../API/postService";

const useUserStore = create((set, get) => ({
  userDetail: null,
  isEditing: false,
  profilePicture: null,
  backgroundPicture: null,
  isUploading: false,
  allPosts: [],

  setIsEditing: (value) => set({ isEditing: value }),

 fetchUserData: async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const idToken = await user.getIdToken();

      // Fetch user details and posts in parallel for better performance
      const [userDetail, postsResponse] = await Promise.all([
        getUser(user.uid, idToken),
        getAllPosts(idToken),
      ]);

      // Update state with fetched data
      set({
        userDetail,
        profilePicture: userDetail?.data?.displayPicture || "/images/userLogo.jpg",
        backgroundPicture: userDetail?.data?.backgroundPicture || "/images/img3.svg",
        allPosts: postsResponse?.data || [],
      });

      return { userDetail, postsResponse }; // Return data if needed elsewhere
    } else {
      console.warn("No authenticated user found.");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Re-throw the error if the calling function needs to handle it
  }
},


  uploadMedia: async (file) => {
    if (!file) {
      throw new Error("No file provided");
    }

    if (!cloudinaryConfig.cloudName || !cloudinaryConfig.uploadPreset) {
      throw new Error("Cloudinary configuration missing");
    }

    try {
      const formData = new FormData();

      // Ensure file is properly handled
      if (file instanceof File) {
        formData.append("file", file);
      } else {
        throw new Error("Invalid file object");
      }

      // Add upload preset
      formData.append("upload_preset", cloudinaryConfig.uploadPreset);

      // Make the request
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Upload failed: ${errorData.error?.message || "Unknown error"}`
        );
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  },

  handleProfilePictureChange: async (file) => {
    if (file) {
      try {
        set({ isUploading: true });
        const uploadedUrl = await get().uploadMedia(file);
        // Update local state immediately
        set({ profilePicture: uploadedUrl });
        // Update in backend
        await get().updateUserProfile({
          ...get().userDetail.data,
          displayPicture: uploadedUrl,
        });
      } catch (error) {
        console.error("Error updating profile picture:", error);
      } finally {
        set({ isUploading: false });
      }
    }
  },

  handleBackgroundPictureChange: async (file) => {
    if (file) {
      try {
        set({ isUploading: true });
        const uploadedUrl = await get().uploadMedia(file);
        // Update local state immediately
        set({ backgroundPicture: uploadedUrl });
        // Update in backend
        await get().updateUserProfile({
          ...get().userDetail.data,
          backgroundPicture: uploadedUrl,
        });
      } catch (error) {
        console.error("Error updating background picture:", error);
      } finally {
        set({ isUploading: false });
      }
    }
  },

  updateUserProfile: async (userData) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const idToken = await user.getIdToken();
        await editUser(user.uid, idToken, userData);
        await get().fetchUserData();
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  },
}));

export default useUserStore;
