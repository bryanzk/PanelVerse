'use client';

import { useRouter } from 'next/navigation';
import BookCard from '../components/BookCard';
import { LibraryItem } from '../lib/store';
import { removeFromLibraryAction } from '../lib/actions';
import styles from './page.module.css';

export default function LibraryGrid({ items }: { items: LibraryItem[] }) {
    const router = useRouter();

    const handleRemove = async (bookId: string) => {
        if (confirm('Are you sure you want to remove this book from your library?')) {
            await removeFromLibraryAction(bookId);
        }
    };

    return (
        <div className={styles.grid}>
            {items.map((item) => (
                <BookCard
                    key={item.book.id}
                    book={item.book}
                    onViewDetails={(id) => router.push(`/book/${id}`)}
                    onAddToLibrary={() => { }} // Already in library, maybe change icon?
                // Ideally we should have a "Remove" button or different action
                />
            ))}
        </div>
    );
}
