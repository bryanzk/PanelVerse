'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const { data: session } = useSession();

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

                    {session ? (
                        <>
                            <Link href="/library" className={styles.navLink}>
                                My Library
                            </Link>
                            <div className={styles.userMenu}>
                                {session.user?.image ? (
                                    <img
                                        src={session.user.image}
                                        alt={session.user.name || 'User'}
                                        className={styles.avatar}
                                    />
                                ) : (
                                    <span className={styles.avatarPlaceholder}>
                                        {session.user?.name?.[0] || 'U'}
                                    </span>
                                )}
                                <button
                                    onClick={() => signOut()}
                                    className={styles.logoutButton}
                                >
                                    Sign Out
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                            onClick={() => signIn()}
                            className={styles.loginButton}
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
