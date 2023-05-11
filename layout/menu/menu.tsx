import { useContext, KeyboardEvent, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { AppContext } from '../../context/app.context';
import { firstLevelMenu } from '../../helpers/helpers';
import { PageItem } from '../../interfaces/menu.interface';

import styles from './menu.module.css';

export const Menu = () => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const router = useRouter();
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    hidden: { marginBottom: 0 },
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 'auto',
    },
    hidden: { opacity: 0, height: 0 },
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu?.(
      menu.map((m) => {
        if (m._id.secondCategory === secondCategory) {
          setAnnounce(m.isOpened ? 'closed' : 'opened');
          m.isOpened = !m.isOpened;
        }

        return m;
      }),
    );
  };

  const openSecondLevelKey = (event: KeyboardEvent<HTMLButtonElement>, secondCategory: string) => {
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = () => (
    <ul className={styles.firstLevelList}>
      {firstLevelMenu.map((menu) => (
        <li key={menu.route} aria-expanded={menu.id === firstCategory}>
          <Link href={`/${menu.route}`}>
            <span
              className={classNames(
                styles.firstLevel,
                menu.id === firstCategory && styles.firstLevelActive,
              )}
            >
              {menu.icon}
              <span>{menu.name}</span>
            </span>
          </Link>

          {menu.id === firstCategory && buildSecondLevel(menu.route)}
        </li>
      ))}
    </ul>
  );
  const buildSecondLevel = (menuItemRoute: string) => (
    <ul className={styles.secondBlock}>
      {menu.map((m) => {
        if (m.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])) {
          m.isOpened = true;
        }

        return (
          <li key={m._id.secondCategory}>
            <button
              onKeyDown={(event) => openSecondLevelKey(event, m._id.secondCategory)}
              className={styles.secondLevel}
              onClick={() => openSecondLevel(m._id.secondCategory)}
              aria-expanded={m.isOpened}
            >
              {m._id.secondCategory}
            </button>
            <motion.ul
              layout
              variants={variants}
              initial={m.isOpened ? 'visible' : 'hidden'}
              animate={m.isOpened ? 'visible' : 'hidden'}
              className={classNames(styles.secondLevelBlock)}
            >
              {buildThirdLevel(m.pages, menuItemRoute, m.isOpened ?? false)}
            </motion.ul>
          </li>
        );
      })}
    </ul>
  );
  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => (
    <>
      {pages.map((page) => (
        <motion.li key={page._id} variants={variantsChildren}>
          <Link
            href={`/${route}/${page.alias}`}
            className={classNames(
              styles.thirdLevel,
              `/${route}/${page.alias}` === router.asPath && styles.thirdLevelActive,
            )}
            tabIndex={isOpened ? 0 : -1}
            aria-current={`/${route}/${page.alias}` === router.asPath ? 'page' : false}
          >
            {page.category}
          </Link>
        </motion.li>
      ))}
    </>
  );

  return (
    <nav role='navigation' className={styles.menu}>
      {announce && (
        <span role='log' className='hidden'>
          {announce === 'opened' ? 'Развернуто' : 'Свернуто'}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  );
};
