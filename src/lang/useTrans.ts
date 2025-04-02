import { useLocalizedStringFormatter } from 'react-aria';
import cs from './cs';
import en from './en';

export function useTrans() {
  return useLocalizedStringFormatter({
    cs: cs,
    en: en,
  });
}
