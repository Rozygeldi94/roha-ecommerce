import { ref, onValue, update, push, set } from "firebase/database";
import { database } from "@/firebase/firebaseConfig";
import { useActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector";
import { IComment, TCommentLikes } from "@/types/productComments";

export interface IUserInfo {
  userEmail: string;
  userName: string;
  locationCity: string | undefined;
  timeZone: string | undefined;
  id: string;
}
export const useRealtimeDataBase = () => {
  const { setDatabaseUser, setDatabaseUsers } = useActions();
  const databaseUser = useTypedSelector((state) => state.databaseUser.user);
  const databaseUsers = useTypedSelector((state) => state.databaseUser.users);

  const getData = (docRef: string) => {
    if (!docRef) {
      throw new Error("docRef is empty!");
    }
    if (databaseUser === null) {
      onValue(ref(database, docRef), (snapshot) => {
        if (snapshot.exists()) setDatabaseUser(snapshot.val());
      });
    }
  };

  const getData2 = (docRef: string) => {
    if (!docRef) {
      throw new Error("docRef is empty!");
    }
    if (databaseUsers === null) {
      onValue(ref(database, docRef), (snapshot) => {
        setDatabaseUsers(snapshot.val());
      });
    }
  };

  const setData = (
    docRef: string,
    data: IComment | IUserInfo | TCommentLikes,
    method: "push" | "update"
  ) => {
    if (!docRef) {
      throw new Error("docRef is empty!");
    }
    if (method === "push") {
      const documentRef = push(ref(database, docRef));

      set(documentRef, {
        ...data,
        comment_id: documentRef.key,
      });
    } else {
      console.log("update", docRef, data);

      update(ref(database, docRef), {
        ...data,
      });
    }
  };

  return { getData, getData2, setData };
};
