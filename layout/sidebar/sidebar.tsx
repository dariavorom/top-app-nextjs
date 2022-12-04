import classNames from 'classnames';

import { SidebarProps } from './sidebar.props';

import styles from './sidebar.module.css';

export const Sidebar = ({ ...props }: SidebarProps) => {
  return <div {...props}>Sidebar</div>;
};
