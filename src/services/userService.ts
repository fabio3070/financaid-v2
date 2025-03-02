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
  static async getUserByUsername(username: string): Promise<User | null> {
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`);
      if(!response.ok) {
        throw new Error(`User not found (Status: ${response.status})`)
      };

      return await response.json();
    } catch(error){
      console.error(error);
      return null;
    }
  }

  static async authenticateUser(email: string, password: string) {
    console.log(email,password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("service data: ", data);

    if (error || !data.session) {
      return null;
    }

    return data.session;
  }
} 