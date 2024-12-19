// "use client";
// import React, { useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useSearchParams } from "next/navigation";

// export default function Toast() {
//     const params = useSearchParams();
//     return (
//         <div>
//             <ToastContainer />
//         </div>
//     );
// }

"use client";

import React, { Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";

function ToastComponent() {
    const params = useSearchParams();
    // You can log params or use them if needed
    console.log(params?.toString());
    return (
        <div>
            <ToastContainer />
        </div>
    );
}

export default function Toast() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ToastComponent />
        </Suspense>
    );
}
