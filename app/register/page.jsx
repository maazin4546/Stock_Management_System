"use client"
import Link from "next/link"
import { useState } from "react"
import PasswordValidator from 'password-validator';
import emailValidator from 'email-validator';
import "react-phone-input-2/lib/style.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CgGoogle, CgFacebook, CgGitFork } from "react-icons/cg"
import axios from "axios";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import Toast from "../../Components/Toast";
import { toast } from "react-toastify";
// import { signIn } from "next-auth/react";

const register = () => {

    const router = useRouter()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [buttondisabled, setbuttondisabled] = useState(false)
    const [loading, setloading] = useState(false)
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [nameError, setnameError] = useState('');


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

    // Password validation
    const passwordSchema = new PasswordValidator();

    passwordSchema
        .is().min(8)
        .is().max(20)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().not().spaces()
        .is().not().oneOf(['Passw0rd', 'Password1']);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setUser({ ...user, password: newPassword });

        if (passwordSchema.validate(newPassword)) {
            setPasswordError('');
        } else {
            setPasswordError('Password must be between 8-20 characters, include uppercase, lowercase, digits, and no spaces.');
        }
    };

    // Name error Handling
    const handlenameChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, name: value });

        if (value.trim() === "") {
            setnameError("");
        } else if (value.length < 3) {
            setnameError('First name must be at least 3 characters long.');
        } else if (/[^a-zA-Z ]/.test(value)) {
            setnameError('First name cannot contain special characters or numbers.');
        } else {
            setnameError(''); // Clear error if valid
        }
    };


    const register_user = async (req) => {
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user), // Send the user object as JSON
            });
    
            if (!response.ok) {
                // Handle errors returned by the API
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to register");
            }
    
            const responseData = await response.json();
            toast.success("Register successfully");
            console.log("Register successfully", responseData);    
            setUser({ name: "", email: "", password: "" }); // Reset state properly
            router.push("/login");

        } catch (error) {
            toast.error("Register Failed");
            console.error("Registration Error:", error.message);
        }
    };
    


    // // * Google signin
    // const googleLogin = () => {
    //     signIn("google", {
    //         callbackUrl: "/",
    //     });
    // };

    // // * Github signin
    // const onGithubSignUp = () => {
    //     signIn("github", {
    //         callbackUrl: "/",
    //     });
    // };


    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <Toast />
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md my-10">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
                    {loading ? "Processing..." : "Register Here"}
                </h1>

                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                    <input
                        className={`w-full text-black p-3 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 ${nameError ? 'border-red-500' : ''}`}
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        value={user.name}
                        onChange={handlenameChange}
                    />
                    {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}


                </div>

                {/* Email */}
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
                        className={`w-full text-black p-3 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 pr-12 ${passwordError ? 'border-red-500' : ''}`}
                        type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
                        id="password"
                        placeholder="Enter your password"
                        value={user.password}
                        onChange={handlePasswordChange}
                    />
                    <button
                        type="button"
                        className="absolute right-3 transform -translate-y-1/2 text-sm text-gray-600"
                        style={{ marginTop: "32px" }}
                        onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>

                    {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                </div>




                <button
                    className="w-full py-3 text-white rounded-lg font-semibold bg-indigo-500 hover:bg-indigo-600"
                    disabled={buttondisabled}
                    onClick={register_user}
                >
                    SignUp
                </button>

                <div className="my-6">
                    <div className="flex justify-center space-x-3">
                        {/* Google Button */}
                        <button
                            className="flex items-center px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-lg font-medium"
                        // onClick={googleLogin}
                        >
                            <CgGoogle className="w-5 h-5 mr-2" />
                            Google
                        </button>

                        {/* Facebook Button */}
                        <button
                            className="flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg font-medium"
                        // onClick={onFacebookSignUp} // Define this function for Facebook OAuth
                        >
                            <CgFacebook className="w-5 h-5 mr-2" />
                            Facebook
                        </button>

                        {/* GitHub Button */}
                        <button
                            className="flex items-center px-4 py-2 text-white bg-gray-800 hover:bg-gray-900 rounded-lg shadow-lg font-medium"
                        // onClick={onGithubSignUp} // Define this function for GitHub OAuth
                        >
                            <CgGitFork className="w-5 h-5 mr-2" />
                            GitHub
                        </button>
                    </div>
                </div>


                <p className="text-sm text-center text-gray-500 mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-indigo-500 hover:underline">
                        Visit login page
                    </Link>
                </p>

            </div>
        </div>

    )
}

export default register