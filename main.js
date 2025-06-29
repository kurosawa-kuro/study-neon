#!/usr/bin/env node
import 'dotenv/config';          // require('dotenv').config() でも可
import { Client } from 'pg';

(async () => {
  const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false }, // Neon は必須
  });

  try {
    await client.connect();
    const { rows } = await client.query('SELECT NOW() AS now');
    console.log('Connected! Server time:', rows[0].now);
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await client.end();
  }
})();