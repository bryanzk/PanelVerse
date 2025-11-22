'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBookById, BookData } from '../../lib/google-books';
import styles from './page.module.css';

export default function BookDetailsPage({ params }: { params: { id: string } }) {
    const [book, setBook] = useState<BookData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBook() {
            try {
                const data = await getBookById(params.id);
                setBook(data);
            } catch (err) {
                console.error('Error fetching book:', err);
                setError('Failed to load book details.');
            } finally {
                setLoading(false);
            }
        }

        if (params.id) {
            fetchBook();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Loading book details...</div>
            </div>
        );
    }

    if (error || !book) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <h2>Book not found</h2>
                    <p>{error || "The requested book could not be found."}</p>
                    <Link href="/search" className={styles.backLink}>← Back to Search</Link>
                </div>
            </div>
        );
    }

    // Clean up description HTML tags if present
    const cleanDescription = book.description?.replace(/<[^>]*>/g, '') || 'No description available.';

    return (
        <div className={styles.container}>
            <Link href="/search" className={styles.backLink}>
                ← Back to Search
            </Link>

            <div className={styles.content}>
                {/* Sidebar with Cover & Actions */}
                <aside className={styles.sidebar}>
                    <div className={styles.coverContainer}>
                        {book.coverUrl ? (
                            <img
                                src={book.coverUrl}
                                alt={`Cover of ${book.title}`}
                                className={styles.cover}
                            />
                        ) : (
                            <div className={styles.placeholderCover}>📚</div>
                        )}
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.primaryButton}>
                            <span>+</span> Add to Library
                        </button>
                        <button className={styles.secondaryButton}>
                            Write a Review
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className={styles.mainInfo}>
                    <header className={styles.header}>
                        <h1 className={styles.title}>{book.title}</h1>
                        <p className={styles.author}>by {book.author}</p>

                        <div className={styles.meta}>
                            {book.publishedDate && (
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Published</span>
                                    <span className={styles.metaValue}>{book.publishedDate}</span>
                                </div>
                            )}
                            {book.publisher && (
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Publisher</span>
                                    <span className={styles.metaValue}>{book.publisher}</span>
                                </div>
                            )}
                            {book.pageCount && (
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Pages</span>
                                    <span className={styles.metaValue}>{book.pageCount}</span>
                                </div>
                            )}
                            {book.isbn && (
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>ISBN</span>
                                    <span className={styles.metaValue}>{book.isbn}</span>
                                </div>
                            )}
                        </div>
                    </header>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>About this book</h2>
                        <p className={styles.description}>{cleanDescription}</p>
                    </section>

                    {book.categories && book.categories.length > 0 && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Categories</h2>
                            <div className={styles.tags}>
                                {book.categories.map((category, index) => (
                                    <span key={index} className={styles.tag}>{category}</span>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}
