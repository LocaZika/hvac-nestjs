export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Server //
      PORT: string;
      NODE_ENV: 'dev' | 'prod';
      // Database //
      DB_HOST: string;
      DB_PORT: string;
      DB_NAME: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      // Jwt //
      JWT_SECRET_KEY: string;
      WT_ACCESS_TOKEN_EXPIRED: string;
      // Mail //
      MAIL_HOST: string;
      MAIL_PORT: string;
      MAIL_USER: string;
      MAIL_PASS: string;
      MAIL_EXPIRE: string;
    }
  }
}
