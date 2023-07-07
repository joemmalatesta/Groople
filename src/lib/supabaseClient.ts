import { createClient } from '@supabase/supabase-js'
import { SUPABASE_SECRET} from '$env/static/private'

export const supabase = createClient('https://ipnppjfncsoflyoqyoxw.supabase.co', SUPABASE_SECRET)