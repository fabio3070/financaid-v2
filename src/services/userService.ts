import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

//should be global
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export class UserService {
  static async authenticateUser(email: string, password: string) {
    console.log(email,password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      return null;
    }

    console.log("✅ Authenticated User");
    return data.session;
  }
} 