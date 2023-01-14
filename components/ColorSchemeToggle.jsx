import { Switch, Group, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Group position="center" my={30}>
      <Switch
        checked={colorScheme === 'dark'}
		color="dark"
        onChange={() => toggleColorScheme()}
        size="lg"
        onLabel={<IconMoonStars color={theme.white} size={20} stroke={1.5} />}
        offLabel={<IconSun color={theme.colors.gray[6]} size={20} stroke={1.5} />}
      />
    </Group>
  );
}