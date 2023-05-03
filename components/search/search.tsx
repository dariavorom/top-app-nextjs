import { useState, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import { Input } from '../input/input';
import { Button } from '../button/button';

import { SearchProps } from './search.props';

import SearchIcon from './assets/search.svg';

import styles from './search.module.css';

export const Search = ({ className, ...props }: SearchProps) => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search
      }
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      goToSearch;
    }
  };

  return (
    <div className={classNames(className, styles.search)} {...props}>
      <Input
        placeholder='Поиск...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.input}
        onKeyDown={handleKeyDown}
      />
      <Button className={styles.button} onClick={goToSearch} appearance='primary'>
        <SearchIcon />
      </Button>
    </div>
  );
};
