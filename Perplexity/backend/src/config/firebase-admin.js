import { initializeApp, cert } from "firebase-admin/app";
import serviceAccount from "./perplexity-433db-firebase-adminsdk-fbsvc-3f09899528.json" with { type: "json" };

const firebaseAdmin = initializeApp({
    credential: cert(serviceAccount)
});

export default firebaseAdmin;