declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_PASSWORD: string;
      DATABASE_USERNAME: string;
      DATABASE_HOST: string;
      DATABASE_PORT: number;
      DATABASE_NAME: string;
      DATABASE_DIALECT: string;
      AUTH_SALT_ROUNDS: number;
    }
  }
}
export {};
