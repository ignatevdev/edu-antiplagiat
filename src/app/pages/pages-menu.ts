import { NbMenuItem } from '@nebular/theme';

import { catalogsOptions } from './catalogs/utils/constants';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Источники',
    icon: 'file-text',
    link: '/pages/sources',
  },
  {
    title: 'Справочники',
    icon: 'book',
    link: '/pages/catalogs',
    children: catalogsOptions.map(({ title, key }) => ({
      title,
      link: `/pages/catalogs/${key}`,
    })),
  },
  {
    title: 'Пользователи',
    icon: 'people',
    link: '/pages/users',
  },
  {
    title: 'API Токены',
    icon: 'link-2',
    link: '/pages/tokens',
  },
  // {
  //   title: "Проверка совпадения",
  //   icon: "book",
  //   link: "/pages/matching",
  // },
];
