import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

//should be global
export interface User {
  id: string;
  username: string;
  email: string;
}

export class UserService {
  static async authenticateUser(email: string, password: string) {
    console.log(email,password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("⚡ Response from Supabase:", { data, error });

    if (error || !data.session) {
      return null;
    }

    return data.session;
  }
} 