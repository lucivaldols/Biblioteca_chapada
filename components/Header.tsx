import React, { useState, useEffect } from 'react';
import { View } from '../types';

interface HeaderProps {
    setView: (view: View) => void;
    isAuthenticated: boolean;
    onLogout: () => void;
}

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

    useEffect(() => {
        const root = window.document.documentElement;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        const applyTheme = (newTheme: string) => {
            if (newTheme === 'dark' || (newTheme === 'system' && systemPrefersDark.matches)) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };

        applyTheme(theme);
        
        const handleChange = (e: MediaQueryListEvent) => {
            if (theme === 'system') {
                applyTheme('system');
            }
        };

        systemPrefersDark.addEventListener('change', handleChange);
        return () => systemPrefersDark.removeEventListener('change', handleChange);
    }, [theme]);

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const themes = [
        { name: 'light', icon: <SunIcon />, label: 'Tema claro' },
        { name: 'dark', icon: <MoonIcon />, label: 'Tema escuro' },
        { name: 'system', icon: <SystemIcon />, label: 'Tema do sistema' },
    ];

    return (
        <div className="flex items-center space-x-1 rounded-full bg-gray-200 dark:bg-gray-700 p-1">
            {themes.map(t => (
                <button
                    key={t.name}
                    onClick={() => handleThemeChange(t.name)}
                    className={`p-2 rounded-full transition-colors ${theme === t.name ? 'bg-white dark:bg-gray-800' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                    aria-label={t.label}
                    title={t.label}
                >
                    {t.icon}
                </button>
            ))}
        </div>
    );
};


const Header: React.FC<HeaderProps> = ({ setView, isAuthenticated, onLogout }) => {
    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-md dark:shadow-gray-800">
            <nav className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView({ type: 'LIBRARY' })}>
                    <BookIcon />
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">BookShelf</h1>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                    <button onClick={() => setView({ type: 'LIBRARY' })} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Minha Biblioteca</button>
                    {isAuthenticated && (
                         <button onClick={() => setView({ type: 'DASHBOARD' })} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Dashboard</button>
                    )}
                </div>
                 <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                         <button onClick={onLogout} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-sm font-medium">
                            Sair
                        </button>
                    ) : (
                        <button onClick={() => setView({ type: 'LOGIN' })} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-sm font-medium">
                            Login
                        </button>
                    )}
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
};


const BookIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);
const SunIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
);
const MoonIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
);
const SystemIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);

export default Header;