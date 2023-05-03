import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import up from './assets/up.svg';
import close from './assets/close.svg';
import menu from './assets/menu.svg';

export const icons = { up, close, menu };

export type IconName = keyof typeof icons;

export interface ButtonIconProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon: IconName;
  appearance: 'primary' | 'white';
}
