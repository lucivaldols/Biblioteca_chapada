import React, { useState } from 'react';
import { Livro, View, StatusLeitura } from '../types';
import StarRating from './common/StarRating';
import Badge from './common/Badge';
import Modal from './common/Modal';

interface BookDetailProps {
    book: Livro;
    setView: (view: View) => void;
    onDelete: (bookId: string) => void;
    isAuthenticated: boolean;
}

const DetailItem: React.FC<{ label: string; value?: string | number }> = ({ label, value }) => (
    value ? (
        <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-lg text-gray-800 dark:text-gray-200">{value}</p>
        </div>
    ) : null
);

const BookDetail: React.FC<BookDetailProps> = ({ book, setView, onDelete, isAuthenticated }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const readingProgress = book.paginas && book.paginaAtual ? Math.round((book.paginaAtual / book.paginas) * 100) : 0;
    
    const handleDeleteConfirm = () => {
        onDelete(book.id);
        setShowDeleteModal(false);
    };

    const handleDownloadPdf = () => {
        if (!book.arquivoPdf) return;
        const link = document.createElement('a');
        link.href = book.arquivoPdf;
        link.download = `${book.titulo.replace(/ /g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="max-w-5xl mx-auto">
             <button onClick={() => setView({ type: 'LIBRARY' })} className="mb-6 inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline">
                <ArrowLeftIcon />
                Voltar para a Biblioteca
            </button>
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden md:flex">
                <div className="md:w-1/3">
                    <img src={book.capa || 'https://picsum.photos/400/600'} alt={`Capa de ${book.titulo}`} className="w-full h-full object-cover" />
                </div>
                <div className="md:w-2/3 p-8 flex flex-col">
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                             <div>
                                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{book.titulo}</h1>
                                <p className="text-xl text-gray-600 dark:text-gray-300 mt-1">{book.autor}</p>
                            </div>
                            <div className="flex-shrink-0">
                                <Badge genre={book.genero} size="lg" />
                            </div>
                        </div>

                        {book.avaliacao && (
                            <div className="my-4">
                                <StarRating rating={book.avaliacao} size="lg" />
                            </div>
                        )}

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 my-6 border-y border-gray-200 dark:border-gray-700 py-4">
                            <DetailItem label="Status" value={book.status} />
                            <DetailItem label="Ano" value={book.ano} />
                            <DetailItem label="Páginas" value={book.paginas} />
                            <DetailItem label="Avaliação" value={book.avaliacao ? `${book.avaliacao}/5` : 'Não avaliado'} />
                        </div>
                        
                        {book.sinopse && (
                            <div>
                                <h2 className="text-xl font-bold mb-2">Sinopse</h2>
                                <p className="text-gray-600 dark:text-gray-400 prose dark:prose-invert">{book.sinopse}</p>
                            </div>
                        )}
                        
                        {(book.status === StatusLeitura.LENDO || book.status === StatusLeitura.PAUSADO) && book.paginas && (
                             <div className="mt-6">
                                <h2 className="text-xl font-bold mb-2">Progresso da Leitura</h2>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                                    <div className="bg-indigo-600 h-4 rounded-full text-xs text-white flex items-center justify-center" style={{ width: `${readingProgress}%` }}>
                                        {readingProgress}%
                                    </div>
                                </div>
                                <p className="text-sm text-center mt-1 text-gray-500 dark:text-gray-400">Página {book.paginaAtual} de {book.paginas}</p>
                            </div>
                        )}

                        {book.notas && (
                            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h2 className="text-xl font-bold mb-2">Suas Notas</h2>
                                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{book.notas}</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex justify-end items-center gap-4">
                        {book.arquivoPdf && (
                             <button onClick={handleDownloadPdf} className="px-5 py-2.5 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition inline-flex items-center">
                                <DownloadIcon />
                                Baixar PDF
                            </button>
                        )}
                        {isAuthenticated && (
                            <>
                                <button onClick={() => setShowDeleteModal(true)} className="px-5 py-2.5 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition">Excluir</button>
                                <button onClick={() => setView({ type: 'EDIT_BOOK', bookId: book.id })} className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition">Editar</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            
            {showDeleteModal && (
                <Modal onClose={() => setShowDeleteModal(false)}>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Excluir Livro</h3>
                    <p className="my-4 text-gray-600 dark:text-gray-300">Você tem certeza que deseja excluir "{book.titulo}"? Esta ação não pode ser desfeita.</p>
                    <div className="flex justify-end gap-4 mt-6">
                        <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition">Cancelar</button>
                        <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">Confirmar Exclusão</button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

const ArrowLeftIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
);

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export default BookDetail;