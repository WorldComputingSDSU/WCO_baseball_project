// backend/scripts/import_json_to_supabase.js
const fs = require('fs');
const path = require('path');

// Load backend supabase client (we set this up earlier)
const supabase = require('../src/services/supabase_client'); // uses backend/.env

// Config
const JSON_FILE = path.resolve(__dirname, '../output_jsons/output.json'); // change if needed
const TABLE = 'pitch_data'; // <-- change to your table name
const CHUNK_SIZE = 200; // number of rows per insert
const UPSERT = false; // true = upsert (update on conflict), false = insert only
const ON_CONFLICT = 'id'; // column name or array for onConflict when using upsert

function readJsonFile(filePath) {
  if (!fs.existsSync(filePath)) throw new Error('JSON file not found: ' + filePath);
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

function transformRow(row) {
  // Optional: transform incoming JSON to match your table schema.
  // Example:
  // return {
  //   id: row.id,
  //   name: row.player_name,
  //   team: row.team || null,
  //   created_at: row.createdAt ? new Date(row.createdAt).toISOString() : undefined,
  // };
  // By default, return the row as-is:
  return row;
}

(async () => {
  try {
    console.log('Reading JSON from', JSON_FILE);
    const all = readJsonFile(JSON_FILE);
    if (!Array.isArray(all)) throw new Error('JSON root must be an array of objects');

    console.log('Total records to import:', all.length);
    if (all.length === 0) return console.log('No data to import.');

    const rows = all.map(transformRow);
    const chunks = chunkArray(rows, CHUNK_SIZE);

    let inserted = 0;
    let failed = 0;
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(`Importing chunk ${i + 1}/${chunks.length} (${chunk.length} rows)...`);

      let res;
      if (UPSERT) {
        res = await supabase.from(TABLE).upsert(chunk, { onConflict: ON_CONFLICT });
      } else {
        res = await supabase.from(TABLE).insert(chunk);
      }

      if (res.error) {
        console.error('Chunk error:', res.error);
        failed += chunk.length;
      } else {
        const count = Array.isArray(res.data) ? res.data.length : (res.data ? 1 : 0);
        inserted += count;
        console.log(`Chunk success, inserted: ${count}`);
      }
      // small pause to avoid rate limits (optional)
      await new Promise(r => setTimeout(r, 200));
    }

    console.log('Import finished. inserted:', inserted, 'failed:', failed);
  } catch (err) {
    console.error('Import failed:', err);
  }
})();