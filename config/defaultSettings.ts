import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'dark',
  primaryColor: '#6666CC',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  title: '网上书籍分析及推荐系统',
  pwa: false,
  logo: '',
  iconfontUrl: '',
  splitMenus: true,
};

export default Settings;
