/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['static-maps.yandex.ru','storage.yandexcloud.net'],
  },
}

module.exports = nextConfig
