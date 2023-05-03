import classNames from 'classnames';

import { ParagraphProps } from './divider.props';

import styles from './divider.module.css';

export const Divider = ({ className, ...props }: ParagraphProps) => (
  <hr className={classNames(className, styles.hr)} {...props} />
);
