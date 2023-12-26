import React from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
const useFireStore = (collect, codition) => {
  const [documents, setDocuments] = React.useState([]);
  React.useEffect(() => {
    let collectionRef = query(collection(db, collect), orderBy("createAt")); //Tạo một truy vấn (query) với sắp xếp theo một trường cụ thể

    if (codition) {
      if (!codition.compareValue || !codition.compareValue.length) {
        return;
      }
      collectionRef = query(
        collection(db, collect),
        where(codition.fieldName, codition.operator, codition.compareValue),
        orderBy("createAt")
      );
      // Where tại codition nếu có condition
    }
    // có sự thay đổi ở collection thì onSnapshot sẽ được thực thi
    const unsubscribe = onSnapshot(collectionRef, (snapShot) => {
      const document = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(document);
    });

    return unsubscribe;
  }, [collect, codition]);
  return documents;
};

export default useFireStore;
