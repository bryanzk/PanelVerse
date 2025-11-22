'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BookCard, { Book } from '../components/BookCard';
import { searchGraphicNovels, BookData } from '../lib/google-books';
import styles from './page.module.css';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBooks() {
            if (!query) return;

            setLoading(true);
            setError(null);

            try {
                // Search for graphic novels specifically
                const results = await searchGraphicNovels(query);

                // Transform API data to Book component format
                const formattedBooks: Book[] = results.map(item => ({
                    id: item.externalId,
                    title: item.title,
                    author: item.author,
                    coverUrl: item.coverUrl,
                    // We don't have ratings/read counts from Google Books yet
                    // In a real app, we'd merge this with our database data
                    rating: undefined,
                    readCount: undefined,
                }));

                setBooks(formattedBooks);
            } catch (err) {
                console.error('Search error:', err);
                setError('Failed to search books. Please try again.');
            } finally {
                setLoading(false);
            }
        }

        fetchBooks();
    }, [query]);

    if (!query) {
        return (
            <div className={styles.container}>
                <div className={styles.empty}>
                    <span className={styles.emptyIcon}>🔍</span>
                    <h2>Search for graphic novels</h2>
                    <p>Enter a title, author, or keyword in the search bar above.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Search Results</h1>
                <p className={styles.subtitle}>
                    Found {books.length} results for "{query}"
                </p>
            </div>

            {loading ? (
                <div className={styles.loading}>Loading...</div>
            ) : error ? (
                <div className={styles.empty}>{error}</div>
            ) : books.length === 0 ? (
                <div className={styles.empty}>
                    <span className={styles.emptyIcon}>😕</span>
                    <h2>No results found</h2>
                    <p>Try adjusting your search terms.</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {books.map(book => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onViewDetails={(id) => console.log('View:', id)}
                            onAddToLibrary={(id) => console.log('Add:', id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
