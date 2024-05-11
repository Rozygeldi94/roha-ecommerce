import { useLogOut } from "@/hooks/auth";
import { Button } from "@chakra-ui/react";

export const LogOutButton = ({ isLargerThan440 = true }) => {
  const { logOut, isLoading } = useLogOut();

  const handleLogOut = () => {
    logOut();
  };
  return (
    <Button
      display={isLargerThan440 ? "block " : "none"}
      ml={isLargerThan440 ? "10px" : "6px"}
      borderRadius="5px"
      bg="twitter.500"
      color={{ base: "#000", md: "initial" }}
      border="none"
      fontWeight="500"
      fontSize={{ base: "0.8rem", md: "1rem" }}
      height={isLargerThan440 ? "32px" : "26px"}
      padding={isLargerThan440 ? "6px 15px" : "3px 10px"}
      size={{ base: "xs", isLargerThan440: "sm" }}
      transition="all 0.5s !important"
      _hover={{
        boxShadow: "inset 10em 0 0 0 #4949cf, inset -10em 0 0 0 #4949cf",
        color: "#fff",
      }}
      isLoading={isLoading}
      onClick={handleLogOut}
    >
      Log out
    </Button>
  );
};
