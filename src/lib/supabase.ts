import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uabrniklevoijrnyqogs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhYnJuaWtsZXZvaWpybnlxb2dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTA5MTMsImV4cCI6MjA1OTU4NjkxM30.Z_FsKUp8Y8WGA1AmUSdR9zB1UEpgFQsZAWfjqqNpHT4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserSession = {
  user: {
    id: string;
    email?: string;
  } | null;
  session: unknown | null;
};