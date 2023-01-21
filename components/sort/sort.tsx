import { SortEnum, SortProps } from './sort.props';
import classNames from 'classnames';

import SortIcon from './assets/sort.svg';

import styles from './sort.module.css';

export const Sort = ({ sort, setSort, className, ...props }: SortProps) => {
  return (
    <div className={classNames(styles.sort, className)} {...props}>
      <span
        onClick={() => setSort(SortEnum.Rating)}
        className={classNames(sort === SortEnum.Rating && styles.active)}
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </span>
      <span
        onClick={() => setSort(SortEnum.Price)}
        className={classNames(sort === SortEnum.Price && styles.active)}
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </span>
    </div>
  );
};
