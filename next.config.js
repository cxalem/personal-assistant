// next.config.js

module.exports = {
  reactStrictMode: true,
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PERSONAL_ADDRESS: process.env.PERSONAL_ADDRESS,
  },
  images: {
    domains: [""],
  },
};
