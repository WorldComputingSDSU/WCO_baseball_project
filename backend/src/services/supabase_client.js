// backend/src/services/supabase_client.js
const path = require('path');
// Ensure we load the backend/.env when running scripts from repo root
const envPath = path.resolve(__dirname, '../../.env');
require('dotenv').config({ path: envPath }); // loads backend/.env in local dev
console.log('Loaded env from:', envPath);
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY. Check your .env and remove spaces around "=".');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;