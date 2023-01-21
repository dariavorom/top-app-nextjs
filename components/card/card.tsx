import { CardProps } from './card.props';
import classNames from 'classnames';

import styles from './card.module.css';

export const Card = ({ color = 'white', children, ...props }: CardProps) => {
    const cardClassName = classNames(styles.card, props.className, {
        [styles.blue]: color === 'blue',
    });
    
  return <div {...props} className={cardClassName} >{children}</div>;
};
