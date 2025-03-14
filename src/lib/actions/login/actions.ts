"use server";

import { signIn } from "@/auth";
import { type LoginFormType } from "@/lib/schemas/auth";

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
        console.log("✅ Credential Login Success")
        return result;
    } catch (error) {
        console.error("Form submission error", error);
        return null;
    }
}
