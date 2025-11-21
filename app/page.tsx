import BookCard from './components/BookCard';
import styles from './page.module.css';
import { MOCK_BOOKS } from './lib/google-books';

const CATEGORIES = [
    'Detective', 'Romance', 'Non-fiction', 'Biography',
    'Sci-Fi', 'Fantasy', 'Superhero', 'Horror', 'Historical'
];

export default function HomePage() {
    // In production, this would fetch from database
    const mockBooks = MOCK_BOOKS.map(book => ({
        id: book.externalId,
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        rating: 4.5,
        readCount: Math.floor(Math.random() * 500) + 50,
    }));

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
