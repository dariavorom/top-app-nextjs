import { AdvantagesProps } from './advantages.props';

import CheckIcon from './assets/check.svg';

import styles from './advantages.module.css';

export const Advantages = ({ advantages }: AdvantagesProps) => (
  <>
    {advantages.map((a) => (
      <div key={a._id} className={styles.advantage}>
        <CheckIcon />
        <div className={styles.title}>{a.title}</div>
        <hr className={styles.vline} />
        <div className={styles.description}>{a.description}</div>
      </div>
    ))}
  </>
);
