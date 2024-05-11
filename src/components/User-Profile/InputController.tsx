import { Input, useColorMode } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { FC } from "react";
import { IUserInfoForm } from "./ProfileInfoBox";

interface IInputControllerProps {
  control: IUserInfoForm | any;
  name: string;
  inputType: string;
  placeholder: string;
}

export const InputController: FC<IInputControllerProps> = ({
  control,
  name,
  inputType,
  placeholder,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: {
          value: true,
          message: "This field is required",
        },
        maxLength: {
          value: 50,
          message: "Max length must be no longer 50 charachter",
        },
      }}
      render={({ field }) => {
        return (
          <Input
            required
            type={inputType}
            bg={colorMode === "light" ? "#fff" : "#41416b"}
            border={
              colorMode === "light" ? "#6d6d78 1px solid" : "#b9b9dc 1px solid"
            }
            placeholder={placeholder}
            _placeholder={{
              color: colorMode === "dark" ? "#baa9ce" : "#41416b",
            }}
            {...field}
            onChange={(e) => {
              field.onChange(
                e.target.value
                  .substring(0, 1)
                  .toUpperCase()
                  .concat(e.target.value.substring(1))
              );
            }}
          />
        );
      }}
    />
  );
};
