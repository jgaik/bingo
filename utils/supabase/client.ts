import { Database } from "@/types";
import { createBrowserClient } from "@supabase/ssr";

export function createClient<
  T = ReturnType<typeof createBrowserClient<Database>>
>(
  supabaseCallback?: (
    supabaseClient: ReturnType<typeof createBrowserClient<Database>>
  ) => T
): T {
  const supabaseClient = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  if (supabaseCallback) return supabaseCallback(supabaseClient);

  return supabaseClient as T;
}
