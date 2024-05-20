import {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useRef,
  useState,
} from "react";
import {
  Text,
  Link,
  Button,
  Flex,
  Checkbox,
  Textarea,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import { PhotoViewerModal } from "../PhotoViewerModal";
import { UserAvatar } from "../User-Profile/UserAvatar";
import { Link as RouterLink } from "react-router-dom";
import { MainContext } from "@/pages/Layout";
import { IDatabaseContext } from "./Product";
import { getUID } from "@/utils/getUID";
import { IComment, TCommentLikes } from "@/types/productComments";
import { IUserInfo } from "@/hooks/realtimeDataBase";

interface IAddCommentProps extends IDatabaseContext {
  postId: string | undefined;
  setData: (
    docRef: string,
    data: IComment | IUserInfo | TCommentLikes,
    method: string
  ) => void;
}

export const AddComment: FC<IAddCommentProps> = ({ postId, setData }) => {
  const [authUsershowPhoto, setAuthUsershowPhoto] = useState(false);
  const { currentUser, databaseUser, authUser, colorMode } =
    useContext(MainContext);
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");

  const [comment, setComment] = useState({
    value: "",
    errorMessage: "",
    isChecked: false,
  });

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment?.isChecked) {
      const commentFields = {
        id: getUID(),
        postId: postId,
        user: {
          id: authUser?.uid,
          username: authUser?.displayName || currentUser?.first_name,
          gender: currentUser?.gender,
        },
        body: comment?.value,
        created_time: Date.now(),
        likes: [null],
      };
      setData(`users/${authUser?.uid}/comments`, commentFields, "push");
      setComment({ ...comment, value: "", isChecked: false });
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment({ ...comment, value: e.target.value });
  };
  const handleSetComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment({ ...comment, isChecked: e.target.checked });
  };

  return (
    <Flex
      mt="30px"
      padding={{
        base: "10px 10px",
        isLargerThan450: "10px 15px",
        md: "15px 60px",
      }}
      justifyContent="center"
      alignItems="center"
      gap={{ base: "15px", isLargerThan600: "30px" }}
      bg={colorMode === "light" ? "#f6f6f8" : "#4f4f82"}
    >
      {isLargerThan450 && (
        <>
          <UserAvatar
            currentUser={currentUser}
            databaseUserAvatar={databaseUser?.user_avatar}
            isRealUser={true}
            minWidth="80px"
            height="80px"
            borderRadius="50%"
            setAuthUsershowPhoto={setAuthUsershowPhoto}
          />
          {authUsershowPhoto && (
            <PhotoViewerModal
              photoUrl={authUser?.photoURL || databaseUser?.user_avatar}
              setAuthUsershowPhoto={setAuthUsershowPhoto}
            />
          )}
        </>
      )}

      <form
        style={{ maxWidth: "800px", width: "100%" }}
        onSubmit={handleSumbit}
      >
        <Textarea
          required
          maxLength={150}
          value={comment?.value}
          onChange={handleInputChange}
          minHeight="20px"
          width="100%"
          fontSize={{ base: "0.9rem", isLargerThan600: "1rem" }}
          placeholder="Add a comment..."
          bg={colorMode === "light" ? "#dbdbe9" : "#414159"}
        />
        <Flex
          mt="10px"
          justifyContent="space-between"
          alignItems="center"
          gap="20px"
        >
          <Flex
            flexDirection={{ base: "column", isLargerThan650: "row" }}
            alignItems="center"
            gap={{ base: "0", isLargerThan650: "20px" }}
            fontSize={{ base: "0.8rem", isLargerThan360: "0.9rem" }}
          >
            <Checkbox
              required
              borderColor="blue.400"
              isChecked={comment?.isChecked === true ? true : false}
              colorScheme="green"
              onChange={handleSetComment}
            >
              I agree with license
            </Checkbox>

            <Text>
              Posting as{" "}
              <Text as="span" fontWeight="600">
                {currentUser?.first_name}
              </Text>{" "}
              <Link
                as={RouterLink}
                to={`/dashboard/${authUser?.uid}`}
                color={colorMode === "light" ? "#2854d7" : "#a2aaea"}
                fontWeight="500"
              >
                (change)
              </Link>
            </Text>
          </Flex>
          <Button type="submit" size="sm" colorScheme="cyan">
            Comment
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
