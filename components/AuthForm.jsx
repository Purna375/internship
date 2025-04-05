"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function AuthForm() {
  const [tab, setTab] = useState("login"); 
  const isLogin = tab === "login";

  return (
    <div className=" w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg min-h-[400px]">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setTab("login")}
          className={`w-1/2 py-2 ${isLogin ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500 dark:text-gray-400"}`}
        >
          Login
        </button>
        <button
          onClick={() => setTab("register")}
          className={`w-1/2 py-2 ${!isLogin ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500 dark:text-gray-400"}`}
        >
          Register
        </button>
      </div>

      {isLogin ? (
        <LoginForm />
      ) : (
        <RegisterForm />
      )}
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const user = await response.json();

    if (user.projects === 0) {
      router.push("/projectdetails");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <form className="space-y-4 mt-16" onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Login
      </button>
    </form>
  );
}


function RegisterForm() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showOtpMessage, setShowOtpMessage] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    router.push("/studentdetails");
  };

  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleGetOtp = () => {
    setShowOtpMessage(true);
    setTimeout(() => setShowOtpMessage(false), 3000); 
  };

  return (
    <form className="space-y-4" onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
      />
      <div className="flex justify-between space-x-2">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            id={`otp-${idx}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(e.target.value, idx)}
            className="w-12 h-12 text-center text-lg border rounded dark:bg-gray-700 dark:text-white"
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleGetOtp}
        className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
      >
        Get OTP
      </button>
      
      {showOtpMessage && (
        <div className="bg-green-100 text-green-800 p-2 rounded text-center transition-all duration-300">
          OTP has been sent to your registered email ID.
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Register
      </button>
    </form>
  );
}
