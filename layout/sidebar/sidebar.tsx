import classNames from 'classnames';

import { SidebarProps } from './sidebar.props';
import { Menu } from '../menu/menu';

import Logo from '../assets/logo.svg';

import styles from './sidebar.module.css';

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div className={classNames(className, styles.sidebar)} {...props}>
      <Logo className={styles.logo} />
      <div>Поиск</div>
      <Menu />
    </div>
  );
};
