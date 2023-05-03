import axios from 'axios';
import { GetStaticProps } from 'next';

import { API } from '../helpers/api';
import { MenuItem } from '../interfaces/menu.interface';
import { withLayout } from '../layout/layout';

function Search({ menu, firstCategory }: SearchProps) {
  return <>search</>;
}

export default withLayout(Search);

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

interface SearchProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
