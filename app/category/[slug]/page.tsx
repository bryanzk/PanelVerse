'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BookCard, { Book } from '../../components/BookCard';
import { searchGraphicNovels } from '../../lib/google-books';
import styles from './page.module.css';

export default function CategoryPage({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const categoryName = params.slug.replace(/-/g, ' ');

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBooks() {
            setLoading(true);
            setError(null);

            try {
                // Search for graphic novels in this specific category
                // Using "subject:" filter in Google Books API
                const query = `subject:${categoryName}`;
                const results = await searchGraphicNovels(query, undefined, 20);

                const formattedBooks: Book[] = results.map(item => ({
                    id: item.externalId,
                    title: item.title,
                    author: item.author,
                    coverUrl: item.coverUrl,
                    rating: undefined,
                    readCount: undefined,
                }));

                setBooks(formattedBooks);
            } catch (err) {
                console.error('Category fetch error:', err);
                setError('Failed to load books for this category.');
            } finally {
                setLoading(false);
            }
        }

        if (params.slug) {
            fetchBooks();
        }
    }, [params.slug, categoryName]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>{categoryName}</h1>
                <p className={styles.subtitle}>
                    Explore the best {categoryName} graphic novels
                </p>
            </div>

            {loading ? (
                <div className={styles.loading}>Loading books...</div>
            ) : error ? (
                <div className={styles.error}>{error}</div>
            ) : books.length === 0 ? (
                <div className={styles.empty}>
                    <span className={styles.emptyIcon}>📚</span>
                    <h2>No books found</h2>
                    <p>We couldn't find any graphic novels in this category.</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {books.map(book => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onViewDetails={(id) => router.push(`/book/${id}`)}
                            onAddToLibrary={(id) => console.log('Add:', id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
