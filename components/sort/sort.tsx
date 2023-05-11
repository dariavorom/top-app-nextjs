import { SortEnum, SortProps } from './sort.props';
import classNames from 'classnames';

import SortIcon from './assets/sort.svg';

import styles from './sort.module.css';

export const Sort = ({ sort, setSort, className, ...props }: SortProps) => (
  <div className={classNames(styles.sort, className)} {...props}>
    <div id='sort' className={styles.sortName}>
      Сортировка
    </div>
    <button
      id='rating'
      onClick={() => setSort(SortEnum.Rating)}
      className={classNames(sort === SortEnum.Rating && styles.active)}
      aria-selected={sort === SortEnum.Rating}
      aria-labelledby='sort rating'
    >
      <SortIcon className={styles.sortIcon} />
      По рейтингу
    </button>
    <button
      id='price'
      onClick={() => setSort(SortEnum.Price)}
      className={classNames(sort === SortEnum.Price && styles.active)}
      aria-selected={sort === SortEnum.Price}
      aria-labelledby='sort price'
    >
      <SortIcon className={styles.sortIcon} />
      По цене
    </button>
  </div>
);
