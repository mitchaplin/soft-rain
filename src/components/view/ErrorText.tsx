import { Title } from "@mantine/core";

interface ErrorTextProps {
  message: string;
}
export const ErrorText = (props: ErrorTextProps) => {
  return <Title>{props.message}</Title>;
};
