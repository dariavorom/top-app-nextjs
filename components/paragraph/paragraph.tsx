import { ParagraphProps } from './paragraph.props';
import classNames from 'classnames';

import styles from './paragraph.module.css';

export const Paragraph = ({ size = 'm', children, ...props }: ParagraphProps) => {
    const paragraphClassName = classNames(styles.p, {
        [styles.s]: size === 's',
        [styles.m]: size === 'm',
        [styles.l]: size === 'l',
    });
    
  return <p className={paragraphClassName} {...props}>{children}</p>;
};
