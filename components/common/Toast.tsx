
import React, { useEffect, useState } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            // Allow time for fade-out animation before calling onClose
            setTimeout(onClose, 300); 
        }, 2700);

        return () => clearTimeout(timer);
    }, [onClose]);

    const baseClasses = "fixed bottom-5 right-5 flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse divide-x rtl:divide-x-reverse rounded-lg shadow-lg z-50 transition-all duration-300";
    const typeClasses = {
        success: "text-green-500 dark:text-green-400 bg-white dark:bg-gray-800 divide-gray-200 dark:divide-gray-700",
        error: "text-red-500 dark:text-red-400 bg-white dark:bg-gray-800 divide-gray-200 dark:divide-gray-700",
    };
    const visibilityClasses = visible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-5";

    const SuccessIcon = () => (
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
    );

    const ErrorIcon = () => (
         <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
        </svg>
    );

    return (
        <div className={`${baseClasses} ${typeClasses[type]} ${visibilityClasses}`} role="alert">
            <div className="flex-shrink-0">
                {type === 'success' ? <SuccessIcon /> : <ErrorIcon />}
            </div>
            <div className="ps-4 text-sm font-normal text-gray-700 dark:text-gray-300">{message}</div>
        </div>
    );
};

export default Toast;
