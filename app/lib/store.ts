import fs from 'fs/promises';
import path from 'path';
import { Book } from '../components/BookCard';

const DB_PATH = path.join(process.cwd(), 'data', 'library.json');

export interface LibraryItem {
    userId: string;
    book: Book;
    addedAt: string;
}

async function ensureDb() {
    try {
        await fs.access(DB_PATH);
    } catch {
        const dir = path.dirname(DB_PATH);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(DB_PATH, '[]');
    }
}

export async function getLibrary(userId: string): Promise<LibraryItem[]> {
    await ensureDb();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const items: LibraryItem[] = JSON.parse(data);
    return items.filter(item => item.userId === userId);
}

export async function addToLibrary(userId: string, book: Book): Promise<void> {
    await ensureDb();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const items: LibraryItem[] = JSON.parse(data);

    // Check if already exists
    const exists = items.some(item => item.userId === userId && item.book.id === book.id);
    if (exists) return;

    items.push({
        userId,
        book,
        addedAt: new Date().toISOString(),
    });

    await fs.writeFile(DB_PATH, JSON.stringify(items, null, 2));
}

export async function removeFromLibrary(userId: string, bookId: string): Promise<void> {
    await ensureDb();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const items: LibraryItem[] = JSON.parse(data);

    const newItems = items.filter(item => !(item.userId === userId && item.book.id === bookId));

    await fs.writeFile(DB_PATH, JSON.stringify(newItems, null, 2));
}

export async function checkInLibrary(userId: string, bookId: string): Promise<boolean> {
    await ensureDb();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const items: LibraryItem[] = JSON.parse(data);
    return items.some(item => item.userId === userId && item.book.id === bookId);
}
