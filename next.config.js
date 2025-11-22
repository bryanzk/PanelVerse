/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['books.google.com', 'covers.openlibrary.org'],
        unoptimized: true,
    },
}

module.exports = nextConfig
