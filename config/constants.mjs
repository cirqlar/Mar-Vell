const dev = process.env.NODE_ENV === "development";

export const {
  REACT_APP_API_PORT: PORT = (dev ? 8080 : process.env.PORT),
  MARVEL_API_PUBLIC_KEY: PUBLIC_KEY,
  MARVEL_API_PRIVATE_KEY: PRIVATE_KEY,
  CORS_HOSTS = "",
} = process.env;