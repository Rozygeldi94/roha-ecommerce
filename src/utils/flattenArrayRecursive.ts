import { IComment } from "@/hooks/realtimeDataBase";

export const flattenArrayRecursive = (arr) => {
  let flattenedArray = [];

  arr.forEach((element) => {
    if (Array.isArray(element)) {
      flattenedArray = flattenedArray.concat(flattenArrayRecursive(element));
    } else {
      flattenedArray.push(element);
    }
  });

  return flattenedArray;
};
