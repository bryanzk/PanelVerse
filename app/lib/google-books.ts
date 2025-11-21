/**
 * Google Books API Client
 * For searching and fetching book metadata
 */

export interface GoogleBooksVolume {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        publisher?: string;
        publishedDate?: string;
        pageCount?: number;
        categories?: string[];
        imageLinks?: {
            thumbnail?: string;
            smallThumbnail?: string;
        };
        industryIdentifiers?: Array<{
            type: string;
            identifier: string;
        }>;
        language?: string;
    };
}

export interface BookData {
    externalId: string;
    externalSource: 'google_books';
    title: string;
    author: string;
    isbn?: string;
    coverUrl?: string;
    description?: string;
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
    categories?: string[];
    language?: string;
}

const GOOGLE_BOOKS_API_BASE = 'https://www.googleapis.com/books/v1';

/**
 * Search for books using Google Books API
 * @param query - Search query (title, author, ISBN, etc.)
 * @param apiKey - Google Books API key (optional for public data)
 * @param maxResults - Maximum number of results (default: 10)
 */
export async function searchBooks(
    query: string,
    apiKey?: string,
    maxResults: number = 10
): Promise<BookData[]> {
    try {
        const params = new URLSearchParams({
            q: query,
            maxResults: maxResults.toString(),
            printType: 'books',
        });

        if (apiKey) {
            params.append('key', apiKey);
        }

        const response = await fetch(
            `${GOOGLE_BOOKS_API_BASE}/volumes?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error(`Google Books API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            return [];
        }

        return data.items.map((item: GoogleBooksVolume) => transformVolumeToBookData(item));
    } catch (error) {
        console.error('Error searching books:', error);
        throw error;
    }
}

/**
 * Get a single book by ID
 */
export async function getBookById(
    volumeId: string,
    apiKey?: string
): Promise<BookData | null> {
    try {
        const params = new URLSearchParams();
        if (apiKey) {
            params.append('key', apiKey);
        }

        const response = await fetch(
            `${GOOGLE_BOOKS_API_BASE}/volumes/${volumeId}${params.toString() ? '?' + params.toString() : ''}`
        );

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`Google Books API error: ${response.statusText}`);
        }

        const data: GoogleBooksVolume = await response.json();
        return transformVolumeToBookData(data);
    } catch (error) {
        console.error('Error fetching book:', error);
        throw error;
    }
}

/**
 * Search specifically for graphic novels
 */
export async function searchGraphicNovels(
    query: string,
    apiKey?: string,
    maxResults: number = 20
): Promise<BookData[]> {
    const graphicNovelQuery = `${query} subject:"graphic novels" OR subject:"comics"`;
    return searchBooks(graphicNovelQuery, apiKey, maxResults);
}

/**
 * Transform Google Books volume to our BookData format
 */
function transformVolumeToBookData(volume: GoogleBooksVolume): BookData {
    const { volumeInfo } = volume;

    // Get the best quality cover image URL
    let coverUrl = volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail;

    // Upgrade to higher resolution if available
    if (coverUrl) {
        coverUrl = coverUrl
            .replace('zoom=1', 'zoom=2') // Higher quality
            .replace('http://', 'https://'); // Force HTTPS
    }

    // Get ISBN (prefer ISBN_13, fallback to ISBN_10)
    const isbn = volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier
        || volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_10')?.identifier;

    return {
        externalId: volume.id,
        externalSource: 'google_books',
        title: volumeInfo.title,
        author: volumeInfo.authors?.[0] || 'Unknown Author',
        isbn,
        coverUrl,
        description: volumeInfo.description,
        publisher: volumeInfo.publisher,
        publishedDate: volumeInfo.publishedDate,
        pageCount: volumeInfo.pageCount,
        categories: volumeInfo.categories,
        language: volumeInfo.language || 'en',
    };
}

/**
 * Mock data for development/testing
 */
export const MOCK_BOOKS: BookData[] = [
    {
        externalId: 'mock-1',
        externalSource: 'google_books',
        title: 'Watchmen',
        author: 'Alan Moore',
        isbn: '9780930289232',
        coverUrl: 'https://books.google.com/books/content?id=mock&printsec=frontcover&img=1&zoom=2',
        description: 'A dark and complex deconstruction of the superhero genre...',
        publisher: 'DC Comics',
        publishedDate: '1987',
        pageCount: 416,
        categories: ['Comics & Graphic Novels', 'Fiction'],
    },
    {
        externalId: 'mock-2',
        externalSource: 'google_books',
        title: 'Maus',
        author: 'Art Spiegelman',
        isbn: '9780394747231',
        description: 'A Pulitzer Prize-winning Holocaust memoir...',
        publisher: 'Pantheon',
        publishedDate: '1991',
        pageCount: 296,
        categories: ['Biography', 'Comics & Graphic Novels'],
    },
];
