import "../config/firebase-admin.js";
import { getAuth } from "firebase-admin/auth";

export async function createVerificationLink(email) {
    const auth = getAuth();

    const link = await auth.generateEmailVerificationLink(email);

    return link;
}