'use server';

import { RegisterFormType } from "@/lib/schemas/register";
import { supabase } from "@/lib/supabaseClient";
import { AuthResponse } from '@supabase/supabase-js';

interface UserDetailsParams {
    data: AuthResponse['data'];
    values: {
      firstName: string;
      lastName: string;
    };
}

export const registerUser = async (values: RegisterFormType) => {
    try {
        console.log("Registering user: ", values);

        const { data, error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password
        });


        console.log("Supabase response: ", data);

        if (error) {
            throw new Error(error.message);
        }

            registerUserDetails({data, values});

        return data;
    } catch (error) {
        console.error("Registration error", error);
        throw error;
    }
};

async function registerUserDetails({ data, values }: UserDetailsParams) {
  if (!data.user) return;
  
  const { error: userDetailsError } = await supabase
    .from("user_details")
    .insert([{ 
      user_id: data.user.id,
      first_name: values.firstName, 
      last_name: values.lastName 
    }]);

    if (userDetailsError) {
        throw new Error(userDetailsError.message);
    }
}
