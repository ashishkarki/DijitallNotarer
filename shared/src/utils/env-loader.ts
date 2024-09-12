import { config } from 'dotenv';
import * as fs from 'fs';

/**
 * Loads environment variables from the appropriate .env file
 * based on the current NODE_ENV value.
 * Defaults to .env.local if NODE_ENV is not set.
 */
export function loadEnv() {
  const envFile = process.env.NODE_ENV
    ? `.env.${process.env.NODE_ENV}`// load .env or .env.prod
    : '.env'; // default to .env

  if (fs.existsSync(envFile)) {
    config({ path: envFile });
  } else {
    config(); // fallback to .env
  }
}