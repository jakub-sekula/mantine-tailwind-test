import { Text, Paper } from '@mantine/core';

export default function PaperComponent({className}) {

  return (
    <Paper shadow="xs" p="md" className={className}>
      <Text>Paper is the most basic ui component</Text>
      <Text>
        Use it to create cards, dropdowns, modals and other components that require background
        with shadow
      </Text>
    </Paper>
  );
}