import { Htag } from '../components';
import { withLayout } from '../layout/layout';

export function Error404() {
  return <Htag tag='h1'>Ошибка 404</Htag>;
}

export default withLayout(Error404);
