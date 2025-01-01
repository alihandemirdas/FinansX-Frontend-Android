import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { useMemo } from 'react';

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme();

  return useMemo(() => ({
    colorScheme: colorScheme ?? 'dark',
    isDarkColorScheme: colorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
  }), [colorScheme, setColorScheme, toggleColorScheme]);
}
