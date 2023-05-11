import { useEffect } from 'react';
import { useAnimation, motion } from 'framer-motion';

import { ButtonIcon } from '..';
import { useScrollY } from '../../hooks/useScrollY';

import styles from './up-button.module.css';


export const UpButton = () => {
  const controls = useAnimation();
  const y = useScrollY();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    controls.start({ opacity: y / document.body.scrollHeight });
  }, [y, controls]);

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0 }}
      className={styles.upButton}
    >
      <ButtonIcon onClick={scrollToTop} appearance='primary' icon='up' aria-label='наверх' />
    </motion.div>
  );
};
