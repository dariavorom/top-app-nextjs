import { ForwardedRef, forwardRef } from 'react';
import classNames from 'classnames';

import { InputProps } from './input.props';

import styles from './input.module.css';

export const Input = forwardRef(
  ({ error, className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => (
    <div className={styles.inputWrapper}>
      <input
        className={classNames(className, styles.input, {
          [styles.error]: error,
        })}
        ref={ref}
        {...props}
      />
      {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
    </div>
  ),
);
