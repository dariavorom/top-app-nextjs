import { TagProps } from './tag.props';
import classNames from 'classnames';

import styles from './tag.module.css';

export const Tag = ({
  size = 's',
  children,
  color = 'ghost',
  href,
  className,
  ...props
}: TagProps) => {
  const tagClassName = classNames(styles.tag, className, {
    [styles.s]: size === 's',
    [styles.m]: size === 'm',
    [styles.ghost]: color === 'ghost',
    [styles.red]: color === 'red',
    [styles.grey]: color === 'grey',
    [styles.green]: color === 'green',
    [styles.primary]: color === 'primary',
  });

  return (
    <div className={tagClassName} {...props}>
      {href ? <a href={href}>{children}</a> : children}
    </div>
  );
};
