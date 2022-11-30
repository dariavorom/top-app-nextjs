import { ButtonProps } from './button.props';
import classNames from 'classnames';

import Arrow from './assets/arrow.svg';

import styles from './button.module.css';

export const Button = ({
  appearance,
  children,
  arrow = 'none',
  className,
  ...props
}: ButtonProps) => {
  const buttonClassName = classNames(styles.button, className, {
    [styles.primary]: appearance === 'primary',
    [styles.ghost]: appearance === 'ghost',
  });
  const arrowClassName = classNames(styles.arrow, {
    [styles.down]: arrow === 'down',
    [styles.right]: arrow === 'right',
  });

  return (
    <button className={buttonClassName} {...props}>
      {children}
      {arrow !== 'none' && <span className={arrowClassName}><Arrow /></span>}
    </button>
  );
};
