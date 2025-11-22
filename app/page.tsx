'use client';

import BookCard from './components/BookCard';
import styles from './page.module.css';

const CATEGORIES = [
    'Detective', 'Romance', 'Non-fiction', 'Biography',
    'Sci-Fi', 'Fantasy', 'Superhero', 'Horror', 'Historical'
];

export default function HomePage() {
    // In production, this would fetch from database
    // Using fixed data to avoid hydration errors
    const mockBooks = [
        {
            id: 'mock-1',
            title: 'Watchmen',
            author: 'Alan Moore',
            coverUrl: 'https://books.google.com/books/content?id=lV4_OIx_Q-MC&printsec=frontcover&img=1&zoom=2',
            icon: '⚡',
            rating: 4.8,
            readCount: 342,
        },
        {
            id: 'mock-2',
            title: 'Maus',
            author: 'Art Spiegelman',
            coverUrl: 'https://books.google.com/books/content?id=9BTwO4u7Jx8C&printsec=frontcover&img=1&zoom=2',
            icon: '🐭',
            rating: 4.9,
            readCount: 289,
        },
        {
            id: 'mock-3',
            title: 'The Sandman',
            author: 'Neil Gaiman',
            coverUrl: 'https://books.google.com/books/content?id=AxGGDwAAQBAJ&printsec=frontcover&img=1&zoom=2',
            icon: '🌙',
            rating: 4.7,
            readCount: 456,
        },
        {
            id: 'mock-4',
            title: 'Batman: The Dark Knight Returns',
            author: 'Frank Miller',
            coverUrl: 'https://books.google.com/books/content?id=6OyZQwAACAAJ&printsec=frontcover&img=1&zoom=2',
            icon: '🦇',
            rating: 4.6,
            readCount: 378,
        },
        {
            id: 'mock-5',
            title: 'V for Vendetta',
            author: 'Alan Moore',
            coverUrl: 'https://books.google.com/books/content?id=QrqJDwAAQBAJ&printsec=frontcover&img=1&zoom=2',
            icon: '🎭',
            rating: 4.5,
            readCount: 256,
        },
        {
            id: 'mock-6',
            title: 'Saga',
            author: 'Brian K. Vaughan',
            coverUrl: 'https://books.google.com/books/content?id=ViIhBAAAQBAJ&printsec=frontcover&img=1&zoom=2',
            icon: '🚀',
            rating: 4.7,
            readCount: 412,
        },
    ];

    return (
        <div className={styles.homepage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.heroTitle}>PanelVerse 🌌</h1>
                    <p className={styles.heroSubtitle}>
                        Explore the infinite universe of graphic novels
                    </p>

                    {/* Categories */}
                    <div className={styles.categories}>
                        {CATEGORIES.map(category => (
                            <a
                                key={category}
                                href={`/category/${category.toLowerCase()}`}
                                className={styles.categoryChip}
                            >
                                {category}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Weekly Popular */}
            <section className={styles.section}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>🔥 This Week's Popular</h2>
                        <a href="/trending" className={styles.viewAll}>View all →</a>
                    </div>

                    <div className={styles.booksGrid}>
                        {mockBooks.map(book => (
                            <BookCard
                                key={book.id}
                                book={book}
                                onViewDetails={(id) => console.log('View:', id)}
                                onAddToLibrary={(id) => console.log('Add:', id)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Community Stats */}
            <section className={styles.section}>
                <div className="container">
                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>1,234</span>
                            <span className={styles.statLabel}>Books</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>567</span>
                            <span className={styles.statLabel}>Readers</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>89</span>
                            <span className={styles.statLabel}>Added This Week</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
