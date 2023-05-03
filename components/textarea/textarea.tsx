import { ForwardedRef, forwardRef } from 'react';
import classNames from 'classnames';

import { TextareaProps } from './textarea.props';

import styles from './textarea.module.css';

export const Textarea = forwardRef(
  ({ error, className, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => (
    <div className={classNames(styles.textareaWrapper, className)}>
      <textarea
        className={classNames(styles.textarea, {
          [styles.error]: error,
        })}
        ref={ref}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  ),
);
