import { getAuth } from "firebase-admin/auth";
import "../config/firebase-admin.js";

export async function verifyFirebaseToken(idToken) {
    const decodedToken = await getAuth().verifyIdToken(idToken);

    return decodedToken;
}