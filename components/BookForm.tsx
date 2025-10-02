import React, { useState } from 'react';
import { Livro, StatusLeitura, Generos, Genero } from '../types';

interface BookFormProps {
    initialData?: Livro;
    onSave: (book: Livro) => void;
    onCancel: () => void;
}

const formInputClasses = "w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";
const fileInputLabelClasses = "flex items-center justify-center w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600";


const BookForm: React.FC<BookFormProps> = ({ initialData, onSave, onCancel }) => {
    const [book, setBook] = useState<Livro>(initialData || {
        id: '',
        titulo: '',
        autor: '',
        genero: Generos[0],
        status: StatusLeitura.QUERO_LER,
    });

    const [coverPreview, setCoverPreview] = useState<string | undefined>(initialData?.capa);
    const [pdfFileName, setPdfFileName] = useState<string | null>(null);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBook(prev => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBook(prev => ({ ...prev, [name]: value === '' ? undefined : parseInt(value, 10) }));
    };

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setBook(prev => ({ ...prev, capa: value }));
        setCoverPreview(value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBook(prev => ({ ...prev, arquivoPdf: reader.result as string }));
                setPdfFileName(file.name);
            };
            reader.readAsDataURL(file);
        } else {
             setBook(prev => ({ ...prev, arquivoPdf: undefined }));
             setPdfFileName(null);
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (book.titulo && book.autor) {
            onSave(book);
        } else {
            alert('Título e Autor são campos obrigatórios.');
        }
    };
    
    const totalFields = 11; // Increased for arquivoPdf
    const filledFields = Object.values(book).filter(value => value !== '' && value !== undefined && value !== null).length -1; // exclude id
    const progress = (filledFields / totalFields) * 100;


    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
             <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">{initialData ? 'Editar Livro' : 'Adicionar Novo Livro'}</h2>
             <p className="text-gray-600 dark:text-gray-400 mb-6">Preencha os detalhes abaixo para adicionar um livro à sua estante.</p>

             <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6">
                <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-4">
                     <div>
                        <label htmlFor="capa" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL da Imagem da Capa</label>
                        <input
                            type="text"
                            name="capa"
                            id="capa"
                            value={book.capa || ''}
                            onChange={handleCoverChange}
                            placeholder="https://exemplo.com/capa.jpg"
                            className={formInputClasses}
                        />
                    </div>
                    {coverPreview ? (
                        <img src={coverPreview} alt="Pré-visualização da capa" className="w-full h-auto object-cover rounded-md shadow-md" />
                    ) : (
                         <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                            <span className="text-gray-500">Pré-visualização da Capa</span>
                        </div>
                    )}
                </div>

                <div className="md:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <div>
                            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título <span className="text-red-500">*</span></label>
                            <input type="text" name="titulo" id="titulo" value={book.titulo} onChange={handleChange} required className={formInputClasses} />
                        </div>
                        <div>
                            <label htmlFor="autor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Autor <span className="text-red-500">*</span></label>
                            <input type="text" name="autor" id="autor" value={book.autor} onChange={handleChange} required className={formInputClasses} />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="genero" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gênero</label>
                            <select name="genero" id="genero" value={book.genero} onChange={handleChange} className={formInputClasses}>
                                {Generos.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status da Leitura</label>
                            <select name="status" id="status" value={book.status} onChange={handleChange} className={formInputClasses}>
                                {Object.values(StatusLeitura).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label htmlFor="ano" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ano</label>
                            <input type="number" name="ano" id="ano" value={book.ano || ''} onChange={handleNumberChange} className={formInputClasses} />
                        </div>
                        <div>
                            <label htmlFor="paginas" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total de Páginas</label>
                            <input type="number" name="paginas" id="paginas" value={book.paginas || ''} onChange={handleNumberChange} className={formInputClasses} />
                        </div>
                        <div>
                            <label htmlFor="paginaAtual" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Página Atual</label>
                            <input type="number" name="paginaAtual" id="paginaAtual" value={book.paginaAtual || ''} onChange={handleNumberChange} className={formInputClasses} />
                        </div>
                        <div>
                            <label htmlFor="avaliacao" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avaliação (1-5)</label>
                            <input type="number" name="avaliacao" id="avaliacao" min="1" max="5" value={book.avaliacao || ''} onChange={handleNumberChange} className={formInputClasses} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="arquivoPdf" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Arquivo PDF do Livro</label>
                        <label htmlFor="arquivoPdf" className={fileInputLabelClasses}>
                            <UploadIcon />
                            <span className="ml-2 truncate">{pdfFileName || 'Selecionar arquivo PDF...'}</span>
                        </label>
                        <input
                            type="file"
                            name="arquivoPdf"
                            id="arquivoPdf"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    <div>
                        <label htmlFor="sinopse" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sinopse</label>
                        <textarea name="sinopse" id="sinopse" value={book.sinopse || ''} onChange={handleChange} rows={4} className={formInputClasses}></textarea>
                    </div>
                    <div>
                        <label htmlFor="notas" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notas</label>
                        <textarea name="notas" id="notas" value={book.notas || ''} onChange={handleChange} rows={3} className={formInputClasses}></textarea>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition">Cancelar</button>
                        <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">Salvar Livro</button>
                    </div>
                </div>
            </form>
        </div>
    );
};


const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export default BookForm;