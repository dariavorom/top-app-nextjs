import axios from 'axios';
import { GetStaticProps } from 'next';

import { API } from '../helpers/api';
import { MenuItem } from '../interfaces/menu.interface';
import { withLayout } from '../layout/layout';

function Home() {
  return <>Главная</>;
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
