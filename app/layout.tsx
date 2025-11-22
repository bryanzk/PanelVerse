import './styles/globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthProvider from './components/AuthProvider';

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
            <body>
                <AuthProvider>
                    <Navbar />
                    <main style={{ minHeight: 'calc(100vh - 64px - 300px)' }}>
                        {children}
                    </main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
