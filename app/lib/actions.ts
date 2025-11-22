'use server';

import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { addToLibrary as dbAdd, removeFromLibrary as dbRemove, checkInLibrary as dbCheck } from './store';
import { Book } from '../components/BookCard';

export async function addToLibraryAction(book: Book) {
    const session = await auth();
    if (!session?.user?.email) {
        throw new Error('Not authenticated');
    }

    await dbAdd(session.user.email, book);
    revalidatePath('/library');
    revalidatePath(`/book/${book.id}`);
}

export async function removeFromLibraryAction(bookId: string) {
    const session = await auth();
    if (!session?.user?.email) {
        throw new Error('Not authenticated');
    }

    await dbRemove(session.user.email, bookId);
    revalidatePath('/library');
    revalidatePath(`/book/${bookId}`);
}

export async function checkIsBookInLibrary(bookId: string) {
    const session = await auth();
    if (!session?.user?.email) {
        return false;
    }
    return dbCheck(session.user.email, bookId);
}
