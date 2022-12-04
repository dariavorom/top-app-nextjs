import classNames from 'classnames';

import { HeaderProps } from './header.props';

import styles from './header.module.css';

export const Header = ({ ...props }: HeaderProps) => {
  return <div {...props}>Header</div>;
};
