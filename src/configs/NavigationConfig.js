import { 
  DashboardOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [
  {
  key: 'home',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'home',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'apps-clients',
      path: `${APP_PREFIX_PATH}/clients`,
      title: 'Клиенты',
      icon: UserOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'apps-clients-list',
          path: `${APP_PREFIX_PATH}/clients/user-list`,
          title: 'Список клиентов',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'apps-clients-party',
          path: `${APP_PREFIX_PATH}/clients/party`,
          title: 'Группы клиентов',
          icon: '',
          breadcrumb: true,
          submenu: []
        }
      ]
    },
  ]
},
]


const navigationConfig = [
  ...dashBoardNavTree,
]

export default navigationConfig;
