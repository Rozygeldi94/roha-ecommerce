import { db } from "@/firebase/firebaseConfig";
import { IComment } from "@/hooks/realtimeDataBase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getCommentsFromFirestore = async () => {
  const allComments: IComment[] = [];
  const q = query(collection(db, "users"), where("product_comments", "!=", []));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    allComments.push(doc.data()?.product_comments);
  });
  return allComments;
};
