import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../auth/firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUser } from "./../../API/userService";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      alert("All fields are required!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: firstName,
          lastName: lastName,
          photo: "",
        });
        const response = await createUser({
          firstName: firstName,
          lastName: lastName,
          email: user.email,
          bio: "",
          displayPicture: "",
          uid:user.uid
        });
        console.log("MongoDB response:", response.data);
        console.log("registered");
      }
      window.location.href="/login"
    } catch (error) {
     console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-medium mb-2"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-medium mb-2"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your last name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Create a password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#292929] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-[#292929] hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
