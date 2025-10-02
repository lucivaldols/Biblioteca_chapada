import React, { useState } from 'react';

interface LoginProps {
    onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('demo@bookshelf.com');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock authentication
        if (email === 'demo@bookshelf.com' && password === 'password') {
            setError('');
            onLoginSuccess();
        } else {
            setError('E-mail ou senha inválidos.');
        }
    };

    return (
        <div className="flex items-center justify-center pt-10 px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 space-y-8">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <BookIcon />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Acesse sua conta BookShelf
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Use <span className="font-mono text-indigo-500">demo@bookshelf.com</span> e <span className="font-mono text-indigo-500">password</span>
                    </p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="sr-only">Endereço de e-mail</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Endereço de e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password-input" className="sr-only">Senha</label>
                        <input
                            id="password-input"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors"
                        >
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const BookIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

export default Login;