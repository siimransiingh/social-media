import { useState } from "react";
import SignInWithGoogle from "../SignInWithGoogle";
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-500 mb-4">
          Sign in to your account or create a new one.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            className="w-full py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="pt-4">
          <SignInWithGoogle />
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
