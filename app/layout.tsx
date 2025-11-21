import './styles/globals.css';

export const metadata = {
    title: 'PanelVerse - Explore Graphic Novels',
    description: 'Discover, share, and discuss your favorite graphic novels',
    keywords: 'graphic novels, comics, manga, books, reading',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" />
            </head>
            <body>{children}</body>
        </html>
    );
}
