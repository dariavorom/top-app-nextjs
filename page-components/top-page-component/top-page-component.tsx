import { useEffect, useReducer } from 'react';
import { useReducedMotion } from 'framer-motion';

import { TopPageComponentProps } from './top-page-component.props';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { Advantages, HhData, Htag, Product, Sort, Tag } from '../../components';
import { SortEnum } from '../../components/sort/sort.props';
import { sortReducer } from './sort.reducer';

import styles from './top-page-component.module.css';

export const TopPageComponent = ({ firstCategory, page, products }: TopPageComponentProps) => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, {
    products,
    sort: SortEnum.Rating,
  });
  const shouldReduceMotion = useReducedMotion();

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  useEffect(() => {
    dispatchSort({ type: 'reset', initialState: products });
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag='h1'>{page.title}</Htag>
        {products && (
          <Tag aria-label={`${products.length} элементов`} color='grey' size='m'>
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div role='list'>
        {sortedProducts &&
          sortedProducts.map((p) => (
            <Product
              role='list-item'
              layout={shouldReduceMotion ? false : true}
              key={p._id}
              product={p}
            />
          ))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag='h2'>Вакансии - {page.category}</Htag>
        <Tag color='red' size='m'>
          hh.ru
        </Tag>
      </div>
      {firstCategory === TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
      {page.advantages && page.advantages.length > 0 && (
        <div>
          <Htag tag='h2'>Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </div>
      )}
      {page.seoText && (
        <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />
      )}
      <Htag tag='h2'>Получаемые навыки</Htag>
      {page.tags.map((t) => (
        <Tag key={t} color='primary'>
          {t}
        </Tag>
      ))}
    </div>
  );
};
