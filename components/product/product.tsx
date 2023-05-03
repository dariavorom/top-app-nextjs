import { ForwardedRef, Fragment, forwardRef, useRef, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { Card } from '../card/card';
import { Rating } from '../rating/rating';
import { Tag } from '../tag/tag';
import { Button } from '../button/button';
import { Divider } from '../divider/divider';
import { Review } from '../review/review';
import { ReviewForm } from '../review-form/review-form';

import { declOfNum, priceRu } from '../../helpers/helpers';
import { ProductProps } from './product.props';

import styles from './product.module.css';

export const Product = motion(
  forwardRef(
    ({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>) => {
      const [isReviewOpened, setIsReviewOpened] = useState(false);
      const reviewRef = useRef<HTMLDivElement>(null);

      const variants = {
        visible: {
          opacity: 1,
          height: 'auto',
        },
        hidden: {
          opacity: 0,
          height: 0,
        },
      };

      const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      };

      return (
        <div className={className} {...props} ref={ref}>
          <Card className={styles.product}>
            <div className={styles.logo}>
              <Image
                src={`${process.env.NEXT_PUBLIC_DOMAIN}${product.image}`}
                alt={product.title}
                width='70'
                height='70'
                unoptimized={true}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              {priceRu(product.price)}{' '}
              {product.oldPrice && (
                <Tag color='green'>{priceRu(product.price - product.oldPrice)}</Tag>
              )}
            </div>
            <div className={styles.credit}>
              {priceRu(product.credit)}/<span className={styles.month}>мес</span>
            </div>
            <div className={styles.rating}>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((category) => (
                <Tag key={category} color='ghost' className={styles.tag}>
                  {category}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle}>цена</div>
            <div className={styles.creditTitle}>кредит</div>
            <div className={styles.rateTitle}>
              <a href='#ref' onClick={scrollToReview}>
                {`${product.reviewCount} ${declOfNum(product.reviewCount, [
                  'отзыв',
                  'отзыва',
                  'отзывов',
                ])}`}
              </a>
            </div>
            <Divider className={styles.hr} />
            <div className={styles.description}>{product.description}</div>
            <div className={styles.feature}>
              {product.characteristics.map((char) => (
                <div className={styles.characteristics} key={char.name}>
                  <span className={styles.characteristicName}>{char.name}</span>
                  <span className={styles.characteristicDots} />
                  <span className={styles.characteristicValue}>{char.value}</span>
                </div>
              ))}
            </div>
            <div className={styles.advBlock}>
              {product.advantages && (
                <div className={styles.advantages}>
                  <div className={styles.advTitle}>Преимущества</div>
                  <div>{product.advantages}</div>
                </div>
              )}
              {product.disadvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.advTitle}>Недостатки</div>
                  <div>{product.disadvantages}</div>
                </div>
              )}
            </div>
            <Divider className={classNames(styles.hr, styles.hr2)} />
            <div className={styles.actions}>
              <Button appearance='primary'>Узнать подробнее</Button>
              <Button
                onClick={() => setIsReviewOpened(!isReviewOpened)}
                appearance='ghost'
                arrow={isReviewOpened ? 'down' : 'right'}
                className={styles.reviewButton}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>
          <motion.div
            animate={isReviewOpened ? 'visible' : 'hidden'}
            variants={variants}
            initial='hidden'
          >
            <Card color='blue' className={styles.reviews} ref={reviewRef}>
              {product.reviews.map((review) => (
                <Fragment key={review._id}>
                  <Review review={review} />
                  <Divider />
                </Fragment>
              ))}
              <ReviewForm productId={product._id} />
            </Card>
          </motion.div>
        </div>
      );
    },
  ),
);
