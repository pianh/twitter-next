/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'upload.wikimedia.org',
            'kenh14cdn.com',
            'plus.unsplash.com',
            'images.unsplash.com',
        ],
    },
};

module.exports = nextConfig;
