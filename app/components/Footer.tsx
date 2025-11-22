import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            <span>🌌</span>
                            <span>PanelVerse</span>
                        </div>
                        <p className={styles.description}>
                            The ultimate destination for graphic novel enthusiasts.
                            Discover, track, and share your reading journey.
                        </p>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Discover</h3>
                        <div className={styles.links}>
                            <Link href="/trending" className={styles.link}>Trending</Link>
                            <Link href="/new" className={styles.link}>New Releases</Link>
                            <Link href="/categories" className={styles.link}>Categories</Link>
                            <Link href="/lists" className={styles.link}>Curated Lists</Link>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Community</h3>
                        <div className={styles.links}>
                            <Link href="/discussions" className={styles.link}>Discussions</Link>
                            <Link href="/reviews" className={styles.link}>Reviews</Link>
                            <Link href="/guidelines" className={styles.link}>Guidelines</Link>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Project</h3>
                        <div className={styles.links}>
                            <Link href="/about" className={styles.link}>About</Link>
                            <a href="https://github.com/bryanzk/PanelVerse" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
                            <Link href="/privacy" className={styles.link}>Privacy</Link>
                            <Link href="/terms" className={styles.link}>Terms</Link>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© {new Date().getFullYear()} PanelVerse. All rights reserved.</p>
                    <p>Built with Next.js & Cloudflare</p>
                </div>
            </div>
        </footer>
    );
}
