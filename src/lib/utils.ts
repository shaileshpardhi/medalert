export const cn = (...classes: Array<string | boolean | undefined>) =>
  classes.filter(Boolean).join(' ');

export const accentText =
  'bg-accent bg-clip-text text-transparent';
