import { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";

interface IDateTimeDisplayProps {
  value: number;
  type: string;
  isDanger: boolean;
  hasColonSymbol: boolean;
  isValueSeconds?: boolean;
}
export const ShowCounter: FC<Record<string, number>> = ({
  days,
  hours,
  minutes,
  seconds,
}) => {
  return (
    <Flex>
      <DateTimeDisplay
        value={days}
        type={"days"}
        isDanger={days <= 3}
        hasColonSymbol={false}
      />

      <DateTimeDisplay
        value={hours}
        type={""}
        isDanger={false}
        hasColonSymbol={true}
      />
      <DateTimeDisplay
        value={minutes}
        type={""}
        isDanger={false}
        hasColonSymbol={true}
      />
      <DateTimeDisplay
        value={seconds}
        type={""}
        isDanger={false}
        hasColonSymbol={false}
        isValueSeconds={true}
      />
    </Flex>
  );
};

const DateTimeDisplay: FC<IDateTimeDisplayProps> = ({
  value,
  type,
  isDanger,
  hasColonSymbol,
  isValueSeconds,
}) => {
  return (
    <Flex
      marginRight={hasColonSymbol ? "0" : "4px"}
      alignItems="center"
      color={isDanger ? "#9a4b4b" : "black"}
    >
      <Text fontSize={{ base: "0.8rem", isLargerThan360: "0.9rem" }}>
        {hasColonSymbol ? `${value}:` : value}
      </Text>
      <Text
        fontSize={{ base: "0.8rem", isLargerThan360: "0.9rem" }}
        ml={type === "days" ? "3px" : "0"}
        as="span"
      >
        {isValueSeconds ? `${type}s` : type}
      </Text>
    </Flex>
  );
};
