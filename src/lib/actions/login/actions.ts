"use server";

import { auth, signIn } from "@/auth";
import { type LoginFormType } from "@/lib/schemas/auth";
import { getSession } from "next-auth/react";

export const credentialLogin = async (values: LoginFormType) => {
    try {
        console.log("Trying to login with credentials: ", values);
        const result = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        });

        if (result?.error) {
            throw new Error(result.error);
        }

        return result;
    } catch (error) {
        console.error("Form submission error", error);
        throw error;
    }
}
