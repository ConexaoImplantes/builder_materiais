import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gzaohgicxvurlmzfjfzd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6YW9oZ2ljeHZ1cmxtemZqZnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMTUyOTQsImV4cCI6MjA4Nzc5MTI5NH0.11ADnm6h8xfQMbPw0r7jG46n8rHGSiQpMuyZPbrTC9Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
