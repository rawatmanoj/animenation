/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    disable: process.env.NODE_ENV === "development",
    workboxOptions: {
        disableDevLogs: true,
    },
    // ... other options you like
});

const nextConfig = {
    images: {
        domains: ['gogocdn.net', 's4.anilist.co', 'images.unsplash.com'],
    },
}

module.exports = withPWA(nextConfig)
