import React from 'react';
import { Livro, View } from '../types';
import StarRating from './common/StarRating';
import Badge from './common/Badge';

interface BookCardProps {
    book: Livro;
    setView: (view: View) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, setView }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="relative cursor-pointer" onClick={() => setView({ type: 'VIEW_BOOK', bookId: book.id })}>
                <img 
                    src={book.capa || 'https://picsum.photos/300/450'} 
                    alt={`Capa do ${book.titulo}`} 
                    className="w-full h-64 object-cover"
                />
                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Ver Detalhes</p>
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">{book.titulo}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{book.autor}</p>
                
                <div className="flex items-center mb-2">
                    {book.avaliacao && <StarRating rating={book.avaliacao} />}
                </div>

                <div className="mt-auto pt-2">
                   <Badge genre={book.genero} />
                </div>
            </div>
        </div>
    );
};

export default BookCard;