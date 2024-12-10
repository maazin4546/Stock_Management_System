import React from 'react';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center mt-4">
        <svg
            className="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 50 50"
        >
            <circle
                cx="25"
                cy="25"
                r="20"
                stroke="#f3f3f3"
                strokeWidth="5"
                fill="none"
            />
            <circle
                cx="25"
                cy="25"
                r="20"
                stroke="#000000"
                strokeWidth="5"
                fill="none"
                strokeDasharray="126.92"
                strokeDashoffset="126.92"
            >
                <animate
                    attributeName="stroke-dashoffset"
                    values="126.92;0"
                    dur="1.5s"
                    keyTimes="0;1"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    </div>
);

export default LoadingSpinner;
