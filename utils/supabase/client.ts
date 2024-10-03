import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase client that is compatible with the browser environment.
 *
 * This function should be used in client-side code, such as in a Next.js page
 * or component.
 *
 * @returns A Supabase client instance.
 */
export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
