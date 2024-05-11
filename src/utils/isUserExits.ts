import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function IsUserExits(email: string | null) {
  const isExit = await getDocs(
    query(collection(db, "users"), where("user_email", "==", email))
  );

  return isExit.size > 0;
}
