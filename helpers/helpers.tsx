import { FirstLevelMenuItem } from '../interfaces/menu.interface';

import { TopLevelCategory } from '../interfaces/page.interface';

import CoursesIcon from '../layout/menu/assets/courses.svg';
import ServicesIcon from '../layout/menu/assets/services.svg';
import ProductsIcon from '../layout/menu/assets/products.svg';
import BooksIcon from '../layout/menu/assets/books.svg';

export const firstLevelMenu: FirstLevelMenuItem[] = [
  { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
  { route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services },
  { route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books },
  { route: 'products', name: 'Продукты', icon: <ProductsIcon />, id: TopLevelCategory.Products },
];

export const priceRu = (price: number): string => // разбивка числа на тысячные (добавить пробел через каждые три цифры)
  price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/, ' ')
    .concat(' ₽');
