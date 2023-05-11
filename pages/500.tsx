import { Htag } from '../components';
import { withLayout } from '../layout/layout';

function Error500() {
  return <Htag tag='h1'>Ошибка 500</Htag>;
}

export default withLayout(Error500);
