import { Database } from "@/types";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient<
  T = ReturnType<typeof createServerClient<Database>>
>(
  supabaseCallback?: (
    supabaseClient: ReturnType<typeof createServerClient<Database>>
  ) => T
): Promise<T> {
  const cookieStore = await cookies();

  const supabaseClient = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  if (supabaseCallback) return supabaseCallback(supabaseClient);

  return supabaseClient as T;
}
