const { createClient } = require('@supabase/supabase-js');

// server-side client — the service role key must never leave the server
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

module.exports = supabase;
