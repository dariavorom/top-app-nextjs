import classNames from 'classnames';

import { ButtonIconProps, icons } from './button-icon.props';

import styles from './button-icon.module.css';

export const ButtonIcon = ({ appearance, icon, className, ...props }: ButtonIconProps) => {
  const IconComp = icons[icon];
  const buttonClassName = classNames(styles.button, className, {
    [styles.primary]: appearance === 'primary',
    [styles.white]: appearance === 'white',
  });

  return (
    <button className={buttonClassName} {...props}>
      <IconComp />
    </button>
  );
};
