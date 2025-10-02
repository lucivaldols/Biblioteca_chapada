import React, { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { Livro, View } from './types';
import { INITIAL_BOOKS } from './constants';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Library from './components/Library';
import BookDetail from './components/BookDetail';
import BookForm from './components/BookForm';
import Toast from './components/common/Toast';
import Login from './components/Login';

const App: React.FC = () => {
    const [books, setBooks] = useLocalStorage<Livro[]>('books', INITIAL_BOOKS);
    const [view, setView] = useState<View>({ type: 'LIBRARY' });
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated', false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setView({ type: 'DASHBOARD' });
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setView({ type: 'LIBRARY' });
    };

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSaveBook = (bookData: Livro) => {
        const isEditing = books.some(b => b.id === bookData.id);
        if (isEditing) {
            setBooks(prevBooks => prevBooks.map(b => (b.id === bookData.id ? bookData : b)));
            showToast('Livro atualizado com sucesso!', 'success');
        } else {
            setBooks(prevBooks => [...prevBooks, { ...bookData, id: Date.now().toString() }]);
            showToast('Livro adicionado com sucesso!', 'success');
        }
        setView({ type: 'LIBRARY' });
    };

    const handleDeleteBook = (bookId: string) => {
        setBooks(prevBooks => prevBooks.filter(b => b.id !== bookId));
        showToast('Livro excluído.', 'success');
        setView({ type: 'LIBRARY' });
    };

    const renderContent = () => {
        // Handle unprotected "login" view
        if (view.type === 'LOGIN') {
            return <Login onLoginSuccess={handleLoginSuccess} />;
        }
        
        // Handle protected views
        const isProtectedView = view.type === 'DASHBOARD' || view.type === 'ADD_BOOK' || view.type === 'EDIT_BOOK';
        if (isProtectedView && !isAuthenticated) {
            setView({ type: 'LOGIN'});
            return <Login onLoginSuccess={handleLoginSuccess} />;
        }
        
        switch (view.type) {
            case 'DASHBOARD':
                return <Dashboard books={books} setView={setView} />;
            case 'LIBRARY':
                return <Library books={books} setView={setView} />;
            case 'ADD_BOOK':
                return <BookForm onSave={handleSaveBook} onCancel={() => setView({ type: 'DASHBOARD' })} />;
            case 'EDIT_BOOK':
                const bookToEdit = books.find(b => b.id === view.bookId);
                return bookToEdit ? <BookForm initialData={bookToEdit} onSave={handleSaveBook} onCancel={() => setView({ type: 'VIEW_BOOK', bookId: view.bookId })} /> : <div>Livro não encontrado</div>;
            case 'VIEW_BOOK':
                 const bookToView = books.find(b => b.id === view.bookId);
                return bookToView ? <BookDetail book={bookToView} setView={setView} onDelete={handleDeleteBook} isAuthenticated={isAuthenticated} /> : <div>Livro não encontrado</div>;
            default:
                return <Library books={books} setView={setView} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header setView={setView} isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <main className="flex-grow container mx-auto p-4 md:p-8">
                {renderContent()}
            </main>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

export default App;