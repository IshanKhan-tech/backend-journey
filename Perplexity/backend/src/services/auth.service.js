import { getAuth } from "firebase-admin/auth";
import "../config/firebase-admin.js";

export async function createFirebaseUser({ email, password }) {
    const auth = getAuth();

    const userRecord = await auth.createUser({
        email,
        password,
    });

    return userRecord;
}