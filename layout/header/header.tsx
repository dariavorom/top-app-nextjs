import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import { ButtonIcon } from '../../components';
import { Sidebar } from '../sidebar/sidebar';

import { HeaderProps } from './header.props';

import Logo from '../assets/logo.svg';

import styles from './header.module.css';

export const Header = ({ className, ...props }: HeaderProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const router = useRouter();

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: 0,
      x: '100%',
    },
  };

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

  return (
    <header className={classNames(className, styles.header)} {...props}>
      <Logo />
      <ButtonIcon appearance='white' icon='menu' onClick={() => setIsOpened(true)} />
      <motion.div
        variants={variants}
        initial='closed'
        animate={isOpened ? 'opened' : 'closed'}
        className={styles.mobileMenu}
      >
        <Sidebar />
        <ButtonIcon
          className={styles.menuClose}
          appearance='white'
          icon='close'
          onClick={() => setIsOpened(false)}
        />
      </motion.div>
    </header>
  );
};
