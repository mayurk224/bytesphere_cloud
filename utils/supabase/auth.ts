import { supabase } from "@/utils/supabase/client";
import bcrypt from "bcryptjs";

interface RegisterResponse {
    success: boolean;
    userId?: string;
    error?: string;
}

export const registerUser = async (email: string, password: string): Promise<RegisterResponse> => {
    try {
        // Step 1: Register user with Supabase Authentication
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return { success: false, error: error.message };
        }

        const userId = data.user?.id;
        if (!userId) {
            return { success: false, error: "User ID not returned by Supabase" };
        }

        // Step 2: Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Step 3: Insert user into the "users" table with hashed password
        const { error: insertError } = await supabase.from("users").insert([
            {
                id: userId,
                email,
                password: hashedPassword, // Storing the hashed password
                created_at: new Date(),
            },
        ]);

        if (insertError) {
            return { success: false, error: insertError.message };
        }
        console.log(userId)
        return { success: true, userId };
    } catch (err) {
        return { success: false, error: (err as Error).message };
    }
};


export const verifyOtp = async (email: string, otp: string): Promise<{ success: boolean; error?: string }> => {
    try {
        // Step 1: Verify the OTP using Supabase's verifyOtp method
        const { data, error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: "signup", // Adjust based on use case (e.g., "signup", "recovery", etc.)
        });

        if (error) {
            return { success: false, error: error.message };
        }

        // Step 2: Store the JWT token in localStorage if verification is successful
        if (data?.session?.access_token) {
            localStorage.setItem("token", data.session.access_token);
            localStorage.setItem("refresh_token", data.session.refresh_token);
        } else {
            return { success: false, error: "Failed to retrieve access token" };
        }

        return { success: true };
    } catch (err) {
        return { success: false, error: (err as Error).message };
    }
};
