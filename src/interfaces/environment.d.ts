declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AI_URL_ENDPOINT: string;
      AI_KEY: string;
      API_ENDPOINT: string;
      API_SECRET: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
