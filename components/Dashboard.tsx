import React from 'react';
import { Livro, StatusLeitura, View } from '../types';

interface DashboardProps {
    books: Livro[];
    setView: (view: View) => void;
}

const StatCard: React.FC<{ title: string; value: string | number, icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center space-x-4 transition-transform transform hover:scale-105">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">{icon}</div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
        </div>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ books, setView }) => {
    const totalBooks = books.length;
    const booksReading = books.filter(b => b.status === StatusLeitura.LENDO).length;
    const booksFinished = books.filter(b => b.status === StatusLeitura.LIDO).length;
    const totalPagesRead = books.reduce((sum, book) => {
        if (book.status === StatusLeitura.LIDO && book.paginas) {
            return sum + book.paginas;
        }
        if (book.paginaAtual) {
            return sum + book.paginaAtual;
        }
        return sum;
    }, 0);

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">Bem-vindo à sua Estante</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Aqui está um resumo da sua jornada de leitura.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total de Livros" value={totalBooks} icon={<BookOpenIcon />}/>
                <StatCard title="Lendo Atualmente" value={booksReading} icon={<EyeIcon />}/>
                <StatCard title="Livros Finalizados" value={booksFinished} icon={<CheckCircleIcon />}/>
                <StatCard title="Total de Páginas Lidas" value={totalPagesRead.toLocaleString('pt-BR')} icon={<CollectionIcon />}/>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Ações Rápidas</h2>
                <div className="flex flex-wrap gap-4">
                     <button onClick={() => setView({ type: 'LIBRARY' })} className="flex-1 min-w-[150px] bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-all duration-200 transform hover:-translate-y-1 shadow-lg">
                        Ir para a Biblioteca
                    </button>
                    <button onClick={() => setView({ type: 'ADD_BOOK' })} className="flex-1 min-w-[150px] bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition-all duration-200 transform hover:-translate-y-1 shadow-lg">
                        Adicionar Novo Livro
                    </button>
                </div>
            </div>
        </div>
    );
};


const BookOpenIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const EyeIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const CheckCircleIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CollectionIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;

export default Dashboard;