"use server";

import {signIn, signOut} from "@/auth";
import { type LoginFormType } from "@/lib/schemas/auth"

export const credentialLogin = async (values: LoginFormType) => {
    try {
        console.log("Trying to login with credentials: ", values);
        const result = await signIn("credentials", {
            username: values.username,
            password: values.password,
            redirect: false
        });

        console.log('result: ', result);
        if (result?.error) {
            throw new Error(result.error);
        }

        return result;
    } catch (error) {
        console.error("Form submission error", error);
        throw error;
    }
}

export const credentialsLogout = () => {
    // TODO: limpar dados da sessão criada
    signOut();
}

