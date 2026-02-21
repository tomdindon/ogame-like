import { createClient } from '@supabase/supabase-js'

// =======================================
// CONNEXION SUPABASE
// =======================================

const supabase = createClient(
    "https://urtnjlcudxlxphciclzr.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVydG5qbGN1ZHhseHBoY2ljbHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODAyMzMsImV4cCI6MjA4Njc1NjIzM30.jHoD9PfLW2Rl7gftTqioG60sHiTk4J0C6Al8jk24rKI"
);
console.log("SUPABASE CLIENT CHARGÉ");