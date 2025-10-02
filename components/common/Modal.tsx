
import React, { useEffect } from 'react';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md m-4"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
