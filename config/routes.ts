export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
          {
            name:'register',
            path: '/user/register',
            component: './User/login/register',
          }
        ],

      },
    ],
  },
  {
    path: '/book',
    layout: false,
    component: './OilField/layouts/OilLayout',
    routes: [
      {
        path: '/book',
        redirect: '/book/main',
      },
      {
        path: '/book/main',
        name: 'book',
        icon: 'Book',
        component: './System/BookManagement',
      },
      {
        path: '/book/system',
        name: 'system',
        icon: 'Team',
        component: './System/UserManagement',
      },
      {
        path: '/book/log',
        name: 'log',
        icon: 'FileSearch',
        component: './System/UserLog',
      },
    ],
  },
  {
    path: '/home',
    name: 'home',
    icon: 'Bank',
    component: './Home/Home',
  },
  {
    path: '/',
    redirect: '/user/login',
  },
  {
    component: './404',
  },
];
