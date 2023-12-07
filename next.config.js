// next.config.js

module.exports = {
    reactStrictMode: true,
    env: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
    experimental: {
      serverActions: true,
    },
    images: {
      domains: [""],
    },
  };