"use client"
import { toast } from "react-toastify";
import Toast from "./Toast";

export default function LogoutButton() {

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Logout Successfully")
                console.log(data); 
            } else {
                const errorData = await response.json();
                toast.success("Logout Failed")
                console.log(errorData.error || 'Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            console.log('An unexpected error occurred');
        }
    };

    return (
        <div>
        <Toast/>
            <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleLogout}>Logout</button>
        </div>
    );
}
