import { ForwardedRef, forwardRef } from 'react';
import classNames from 'classnames';

import { CardProps } from './card.props';

import styles from './card.module.css';

export const Card = forwardRef(
  ({ color = 'white', children, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>) => {
    const cardClassName = classNames(styles.card, props.className, {
      [styles.blue]: color === 'blue',
    });

    return (
      <div ref={ref} {...props} className={cardClassName}>
        {children}
      </div>
    );
  },
);
