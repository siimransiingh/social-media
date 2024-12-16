import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your login or signup logic here

    try {
      await signInWithEmailAndPassword(auth, email, password)
  
      window.location.href="/explore"
    } catch (error) {
      console.error(error)
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
  <div className="w-full max-w-md bg-white shadow-lg rounded-lg">
    <form onSubmit={handleSubmit} className="space-y-6 px-4">
      <div>
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
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
        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your password"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 text-white bg-[#292929] h rounded-md focus:outline-none focus:ring-2 transition duration-200"
      >
        Sign In
      </button>
    </form>

    <div className="my-6 text-center">
      <p className="text-gray-600">
        Don’t have an account?{" "}
        <a href="/register" className=" hover:underline">
          Sign up here
        </a>
      </p>
    </div>
  </div>
</div>

  );
}

export default LoginPage;
