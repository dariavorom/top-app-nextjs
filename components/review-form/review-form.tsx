import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';
import axios, { AxiosError } from 'axios';

import { Rating } from '../rating/rating';
import { Input } from '../input/input';
import { Textarea } from '../textarea/textarea';
import { Button } from '../button/button';
import { ReviewFormProps } from './review-form.props';
import { IReviewForm, IReviewSentRsponse } from './review-form.interface';
import { API } from '../../helpers/api';

import CloseIcon from './assets/close.svg';

import styles from './review-form.module.css';

export const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFormProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IReviewForm>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentRsponse>(API.review.createDemo, {
        ...formData,
        productId,
      });

      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что-то пошло не так');
      }
    } catch (error) {
      setError((error as AxiosError).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classNames(styles.reviewForm, className)} {...props}>
        <Input
          {...register('name', { required: { value: true, message: 'Заполните имя' } })}
          error={errors.name}
          placeholder='Имя'
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={Boolean(errors.name?.message)}
        />
        <Input
          {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
          error={errors.title}
          placeholder='Заголовок отзыва'
          className={styles.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={Boolean(errors.title?.message)}
        />
        <div className={styles.rating}>
          <span>Оценка</span>
          <Controller
            control={control}
            rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
            name='rating'
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                setRating={field.onChange}
                error={errors.rating}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', { required: { value: true, message: 'Заполните описание' } })}
          placeholder='Текст отзыва'
          error={errors.description}
          className={styles.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label='текст отзыва'
          aria-invalid={Boolean(errors.description?.message)}
        />
        <div className={styles.submit}>
          <Button appearance='primary' tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()}>
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={classNames(styles.alert, styles.success)} role='alert'>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв опубликован.</div>
          <button
            className={styles.closeIcon}
            onClick={() => setIsSuccess(false)}
            aria-label='закрыть оповещение'
          >
            <CloseIcon />
          </button>
        </div>
      )}
      {error && (
        <div className={classNames(styles.alert, styles.error)} role='alert'>
          Что-то пошло не так, попробуйте обновить страницу
          <button
            className={styles.closeIcon}
            onClick={() => setError('')}
            aria-label='закрыть оповещение'
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};
