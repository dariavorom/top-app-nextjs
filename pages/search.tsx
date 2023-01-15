import axios from 'axios';
import { GetStaticProps } from 'next';

import { MenuItem } from '../interfaces/menu.interface';
import { withLayout } from '../layout/layout';

function Search({ menu, firstCategory }: SearchProps) {
  return <>search</>;
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    {
      firstCategory: 0,
    },
  );

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
