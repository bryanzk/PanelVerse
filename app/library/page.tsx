import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

export default async function LibraryPage() {
    const session = await auth();

    if (!session?.user) {
        redirect('/login');
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.userInfo}>
                    {session.user.image && (
                        <img
                            src={session.user.image}
                            alt={session.user.name || 'User'}
                            className={styles.avatar}
                        />
                    )}
                    <div>
                        <h1 className={styles.title}>My Library</h1>
                        <p className={styles.subtitle}>Welcome back, {session.user.name}</p>
                    </div>
                </div>
            </header>

            <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>📚</span>
                <h2>Your library is empty</h2>
                <p>Start exploring books and add them to your collection.</p>
            </div>
        </div>
    );
}
