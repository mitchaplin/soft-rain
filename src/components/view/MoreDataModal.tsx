import { Button, Modal, Text } from "@mantine/core";
import { useState } from "react";

interface MoreDataModalProps {
  data: any;
}
export const MoreDataModal = ({ data }: MoreDataModalProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="24 hour">
        <Text>{data?.temp_f}</Text>
      </Modal>

      <Button onClick={() => setOpened(true)}>
        {`${data?.data?.location?.localtime.split(" ")[0]}`} Forecast
      </Button>
    </>
  );
};
