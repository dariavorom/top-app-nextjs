import axios from 'axios';
import { GetStaticProps } from 'next';
import { useState } from 'react';

import { Button, Htag, Input, Paragraph, Tag, Textarea } from '../components';
import { Rating } from '../components/rating/rating';
import { API } from '../helpers/api';
import { MenuItem } from '../interfaces/menu.interface';
import { withLayout } from '../layout/layout';

function Home({ menu, firstCategory }: HomeProps) {
  const [rating, setRating] = useState(4);
  return (
    <>
      <Htag tag='h1'>Title</Htag>
      <Button appearance='primary' arrow='right'>
        Кнопка
      </Button>
      <Button appearance='ghost' arrow='down'>
        Кнопка
      </Button>
      <Paragraph size='s'>njucneubceu</Paragraph>
      <Paragraph size='l'>njucneubceu</Paragraph>
      <Paragraph>njucneubceu</Paragraph>
      <Tag size='m' color='grey'>
        nuev
      </Tag>
      <Rating rating={rating} setRating={setRating} isEditable={true} />
      <Input placeholder='nhjbc' />
      <Textarea />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: 0,
  });

  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
