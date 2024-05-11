import { Box, Spinner, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { useRemoveStorage } from "@/hooks/useStorage";
import { MainContext } from "@/pages/Layout";
import { EditAvatarBox } from "./EditAvatarBox";
import { ProfileInfoBox } from "./ProfileInfoBox";
import { UserActivites } from "./UserActivitesBox";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Profile() {
  const { authUser, currentUser } = useContext(MainContext);
  useDocumentTitle(
    currentUser
      ? `${currentUser?.first_name} ${currentUser?.last_name} | RoHa`
      : "Your dashboard | RoHa"
  );
  const { isRemoveLoading } = useRemoveStorage(authUser?.uid);

  return (
    <Box
      maxW="1200px"
      margin="30px auto"
      padding={{ base: "0 10px", isLargerThan440: "0 15px" }}
    >
      {isRemoveLoading && (
        <Box
          width="100vw"
          height="100vh"
          bg="#00000085"
          position="fixed"
          top="0"
          left="0"
          zIndex="9998"
        >
          <Spinner
            size="xl"
            color="#fff"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            zIndex="9999"
          />
        </Box>
      )}
      <EditAvatarBox />
      <Flex justifyContent="center" gap="30px" width="100%" mt="80px">
        <ProfileInfoBox />
        <UserActivites />
      </Flex>
    </Box>
  );
}
