import React, { useState, useMemo } from 'react';
import { Livro, View, Generos, Genero } from '../types';
import BookCard from './BookCard';

interface LibraryProps {
    books: Livro[];
    setView: (view: View) => void;
}

const Library: React.FC<LibraryProps> = ({ books, setView }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGenre, setFilterGenre] = useState<Genero | 'all'>('all');
    
    const filteredBooks = useMemo(() => {
        return books.filter(book => {
            const matchesSearch = searchTerm === '' || 
                book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.autor.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesGenre = filterGenre === 'all' || book.genero === filterGenre;

            return matchesSearch && matchesGenre;
        });
    }, [books, searchTerm, filterGenre]);

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                 <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                         <input
                            type="text"
                            placeholder="Buscar por título ou autor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700"
                        />
                        <SearchIcon />
                    </div>
                    <select
                        value={filterGenre}
                        onChange={(e) => setFilterGenre(e.target.value as Genero | 'all')}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700"
                    >
                        <option value="all">Todos os Gêneros</option>
                        {Generos.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            {filteredBooks.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredBooks.map(book => (
                        <BookCard key={book.id} book={book} setView={setView} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Nenhum livro encontrado</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Tente ajustar sua busca ou filtros!</p>
                </div>
            )}
        </div>
    );
};

const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export default Library;