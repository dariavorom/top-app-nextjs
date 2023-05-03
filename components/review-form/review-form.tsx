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

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
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
        />
        <Input
          {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
          error={errors.title}
          placeholder='Заголовок отзыва'
          className={styles.title}
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
        />
        <div className={styles.submit}>
          <Button appearance='primary'>Отправить</Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={classNames(styles.alert, styles.success)}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв опубликован.</div>
          <CloseIcon className={styles.closeIcon} onClick={() => setIsSuccess(false)} />
        </div>
      )}
      {error && (
        <div className={classNames(styles.alert, styles.error)}>
          Что-то пошло не так, попробуйте обновить страницу
          <CloseIcon className={styles.closeIcon} onClick={() => setError('')} />
        </div>
      )}
    </form>
  );
};
