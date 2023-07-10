/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'upload.wikimedia.org',
            'firebasestorage.googleapis.com',
            'plus.unsplash.com',
            'images.unsplash.com',
            'lh3.googleusercontent.com',
        ],
    },
};

module.exports = nextConfig;
