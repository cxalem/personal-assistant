// next.config.js

module.exports = {
  reactStrictMode: false,
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PERSONAL_ADDRESS: process.env.PERSONAL_ADDRESS,
  },
  images: {
    domains: [""],
  },
};
