// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lauhbrphzrnlvtkvhihb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhdWhicnBoenJubHZ0a3ZoaWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MTU5NjksImV4cCI6MjA2NTM5MTk2OX0.tOzR5I2MhxPeNFzdYemv1hWVNoPCbqcPa1JGgmUKtNw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);