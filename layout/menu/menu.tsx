import { useContext } from 'react';
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
      height: 'auto'
    },
    hidden: { opacity: 0, height: 0 },
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu?.(
      menu.map((m) => {
        if (m._id.secondCategory === secondCategory) {
          m.isOpened = !m.isOpened;
        }

        return m;
      }),
    );
  };

  const buildFirstLevel = () =>
    firstLevelMenu.map((menu) => (
      <div key={menu.route}>
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
      </div>
    ));

  const buildSecondLevel = (menuItemRoute: string) => (
    <div className={styles.secondBlock}>
      {menu.map((m) => {
        if (m.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])) {
          m.isOpened = true;
        }

        return (
          <div key={m._id.secondCategory}>
            <div
              className={styles.secondLevel}
              onClick={() => openSecondLevel(m._id.secondCategory)}
            >
              {m._id.secondCategory}
            </div>
            <motion.div
              layout
              variants={variants}
              initial={m.isOpened ? 'visible' : 'hidden'}
              animate={m.isOpened ? 'visible' : 'hidden'}
              className={classNames(styles.secondLevelBlock)}
            >
              {buildThirdLevel(m.pages, menuItemRoute)}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
  const buildThirdLevel = (pages: PageItem[], route: string) => (
    <>
      {pages.map((page) => (
        <motion.div key={page._id} variants={variantsChildren}>
          <Link
            href={`/${route}/${page.alias}`}
            className={classNames(
              styles.thirdLevel,
              `/${route}/${page.alias}` === router.asPath && styles.thirdLevelActive,
            )}
          >
            {page.category}
          </Link>
        </motion.div>
      ))}
    </>
  );

  return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
