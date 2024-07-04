import { useActions } from "@/hooks/useActions";

export const resetSidebarValuesFn = () => {
  console.log("oo da");

  const { resetSidebarValues } = useActions();
  resetSidebarValues();
};
