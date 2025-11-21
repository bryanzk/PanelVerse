import styles from './BookCard.module.css';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  rating?: number;
  readCount?: number;
}

interface BookCardProps {
  book: Book;
  onViewDetails?: (bookId: string) => void;
  onAddToLibrary?: (bookId: string) => void;
}

export default function BookCard({ book, onViewDetails, onAddToLibrary }: BookCardProps) {
  const handleViewClick = () => {
    onViewDetails?.(book.id);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToLibrary?.(book.id);
  };

  return (
    <article className={styles.bookCard} onClick={handleViewClick}>
      <div className={styles.coverContainer}>
        {book.coverUrl ? (
          <img 
            src={book.coverUrl} 
            alt={`${book.title} cover`}
            className={styles.cover}
          />
        ) : (
          <div className={styles.placeholderCover}>
            📚
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>By {book.author}</p>
        
        {(book.rating || book.readCount) && (
          <div className={styles.meta}>
            {book.rating && (
              <div className={styles.rating}>
                <span>⭐</span>
                <span>{book.rating.toFixed(1)}</span>
              </div>
            )}
            {book.readCount && (
              <div className={styles.readers}>
                <span>👥</span>
                <span>{book.readCount}</span>
              </div>
            )}
          </div>
        )}
        
        <div className={styles.actions}>
          <button 
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={handleViewClick}
          >
            View book
          </button>
          {onAddToLibrary && (
            <button 
              className={`${styles.button} ${styles.secondaryButton}`}
              onClick={handleAddClick}
              aria-label="Add to my library"
            >
              +
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
