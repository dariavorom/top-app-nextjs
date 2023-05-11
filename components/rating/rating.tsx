import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from 'react';
import classNames from 'classnames';

import { RatingProps } from './rating.props';

import StarIcon from './assets/star.svg';

import styles from './rating.module.css';

export const Rating = forwardRef(
  (
    { isEditable = false, rating, setRating, error, tabIndex, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }
      if (!rating && i === 0) {
        return tabIndex ?? 0;
      }
      if (rating === i + 1) {
        return tabIndex ?? 0;
      }
      return -1;
    };

    const constractRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((r: JSX.Element, i: number) => (
        <span
          className={classNames(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable,
          })}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => onClick(i + 1)}
          tabIndex={computeFocus(rating, i)}
          onKeyDown={handleKey}
          ref={(ref) => ratingArrayRef.current?.push(ref)}
          role={isEditable ? 'slider' : ''}
          aria-valuenow={rating}
          aria-valuemax={5}
          aria-valuemi={1}
          aria-label={isEditable ? 'укажите рейтинг' : `рейтинг ${rating}`}
          aria-invalid={Boolean(error?.message)}
        >
          <StarIcon />
        </span>
      ));

      setRatingArray(updatedArray);
    };

    const changeDisplay = (i: number) => {
      if (!isEditable) {
        return;
      }
      constractRating(i);
    };

    const onClick = (i: number) => {
      if (!isEditable || !setRating) {
        return;
      }
      setRating?.(i);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (!isEditable || !setRating) {
        return;
      }
      if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
        if (!rating) {
          setRating(1);
        } else {
          e.preventDefault();
          setRating(rating < 5 ? rating + 1 : 5);
        }
        ratingArrayRef.current[rating]?.focus();
      }
      if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
        e.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
        ratingArrayRef.current[rating - 2]?.focus();
      }
    };

    useEffect(() => {
      constractRating(rating);
    }, [rating, tabIndex]);

    return (
      <div
        ref={ref}
        {...props}
        className={classNames(styles.ratingWrapper, {
          [styles.error]: error,
        })}
      >
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && (
          <span role='alert' className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  },
);
