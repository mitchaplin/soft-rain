import { SimpleGrid, Title } from "@mantine/core";

interface ErrorTextProps {
  message: string;
}
export const ErrorText = (props: ErrorTextProps) => {
  return (
    <SimpleGrid cols={4}>
      <Title>{props.message}</Title>
    </SimpleGrid>
  );
};
