import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

export const getAllUsersFromFirestore = async () => {
  const a = await getDocs(collection(db, "users"));
  let aa = [];
  a.forEach((doc) => {
    aa.push(doc.data());
  });
  return aa;
};
