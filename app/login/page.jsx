"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { CgGoogle, CgFacebook, CgGitFork } from "react-icons/cg"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import emailValidator from 'email-validator';
import Toast from "../../Components/Toast";
import { toast } from "react-toastify";

const Login = () => {

    const router = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [buttondisabled, setbuttondisabled] = useState(false)
    const [loading, setloading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        if (user.password.length > 0 && user.email.length > 0) {
            setbuttondisabled(false)
        }
        else {
            setbuttondisabled(true)
        }
    }, [user])

    // email validation
    const handleEmailChange = (e) => {
        const email = e.target.value;
        setUser({ ...user, email });

        // Validate email
        if (!emailValidator.validate(email)) {
            setEmailError('Enter a valid email address');
        } else {
            setEmailError('');
        }
    };


    const login_user = async (req) => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user), // Send the user object as JSON
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to Login");
            }

            const responseData = await response.json();
            toast.success("Login successfully");
            console.log("Login successfully", responseData);
            setUser({ email: "", password: "" }); // Reset state properly
            router.push("/");

        } catch (error) {
            toast.error("Login Failed");
        }
    };


    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 pt-10">
            <Toast />
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
                    {loading ? "Processing..." : "Login"}
                </h1>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        className="w-full text-black p-3 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                        type="email"
                        id="email"
                        value={user.email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                    />
                    {emailError && (
                        <p className="text-sm text-red-500 mt-1">{emailError}</p>
                    )}
                </div>

                {/* Password */}
                <div className="mb-4 relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                    <input
                        className={`w-full text-black p-3 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 pr-12`}
                        type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
                        id="password"
                        placeholder="Enter your password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    <button
                        type="button"
                        className="absolute right-3 transform -translate-y-1/2 text-sm text-gray-600"
                        style={{ marginTop: "32px" }}
                        onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <button
                    className={`w-full py-3 rounded-lg font-medium text-white ${buttondisabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    disabled={buttondisabled}
                    onClick={login_user}
                >
                    {buttondisabled ? "No Login" : "Login"}
                </button>

                <p className="text-sm text-center text-gray-500 mt-4">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-500 hover:underline">
                        Visit SignUp page
                    </Link>
                </p>

            </div>
        </div>

    )
}

export default Login