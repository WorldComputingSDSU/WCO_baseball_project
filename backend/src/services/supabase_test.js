// backend/src/services/supabase_test.js
// Require the client relative to this file (same folder)
const supabase = require('./supabase_client');

async function run() {
  try {
    
    const { data, error, status } = await supabase
      .from('pitch_data')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Query error:', error);
      return;
    }
    console.log('success:', data);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}
run();