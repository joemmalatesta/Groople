import { createClient } from "@supabase/supabase-js";
import { S as SUPABASE_URL, a as SUPABASE_SECRET } from "./private.js";
import "./index.js";
const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET);
export {
  supabase as s
};
