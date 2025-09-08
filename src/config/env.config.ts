import "dotenv/config";

const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
  COOKIE_NAME: process.env.COOKIE_NAME,
  X_API_KEY: process.env.X_API_KEY,
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  BASE_API_URL: process.env.BASE_API_URL,
};

const envConfig = (key: keyof typeof env): string => {
  const value = env[key];
  return value as string;
};

export default envConfig;
