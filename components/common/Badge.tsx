import React from 'react';
import { Genero } from '../../types';

interface BadgeProps {
    genre: Genero;
    size?: 'sm' | 'lg';
}

const genreColors: Record<Genero, string> = {
    "Literatura": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    "Ficção Científica": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "Realismo Mágico": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "Ficção": "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    "Fantasia": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    "Romance": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    "Biografia": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
    "História": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    "Autoajuda": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "Tecnologia": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
    "Programação": "bg-gray-800 text-green-400 border border-green-400/50",
    "Negócios": "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300",
    "Psicologia": "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
    "Filosofia": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    "Poesia": "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300"
};

const Badge: React.FC<BadgeProps> = ({ genre, size = 'sm' }) => {
    const colorClass = genreColors[genre] || "bg-gray-100 text-gray-800";
    const sizeClass = size === 'sm' ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm";
    
    return (
        <span className={`inline-flex items-center ${sizeClass} font-medium rounded-full ${colorClass}`}>
            {genre}
        </span>
    );
};

export default Badge;