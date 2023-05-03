import { ReviewProps } from './review.props';
import classNames from 'classnames';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { Rating } from '../rating/rating';

import UserIcon from './assets/user.svg';

import styles from './review.module.css';

export const Review = ({ review, className, ...props }: ReviewProps) => {
  const { name, title, description, createdAt, rating } = review;
  
  return (
    <div className={classNames(styles.review, className)} {...props}>
      <UserIcon className={styles.user} />
      <div className={styles.title}>
        <span className={styles.name}>{name}:</span>&nbsp;&nbsp;
        <span>{title}</span>
      </div>
      <div className={styles.date}>
        {format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}
      </div>
      <div className={styles.rating}>
        <Rating rating={Number(rating)} />
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};
