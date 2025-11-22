'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>🌌</span>
                    <span>PanelVerse</span>
                </Link>

                <form className={styles.searchContainer} onSubmit={handleSearch}>
                    <span className={styles.searchIcon}>🔍</span>
                    <input
                        type="text"
                        placeholder="Search books, authors, or tags..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                <div className={styles.navLinks}>
                    <Link href="/explore" className={styles.navLink}>
                        Explore
                    </Link>
                    <Link href="/library" className={styles.navLink}>
                        My Library
                    </Link>
                    <button className={styles.loginButton}>
                        Sign In
                    </button>
                </div>
            </div>
        </nav>
    );
}
