import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://kgmtpxeccxdasvbmmgny.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnbXRweGVjY3hkYXN2Ym1tZ255Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwOTUyMTYsImV4cCI6MjAzMDY3MTIxNn0.qYOfXOBkNKSl7w0jt7FecLZrxOjG42MUGMVwvEuXllA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
