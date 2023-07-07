/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['upload.wikimedia.org', 'kenh14cdn.com'],
    },
};

module.exports = nextConfig;
