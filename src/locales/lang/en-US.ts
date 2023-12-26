import antdEnUS from 'ant-design-vue/es/locale/en_US';
import momentEU from 'moment/dist/locale/eu';
import global from './en-US/global';
import menu from './en-US/menu';
import setting from './en-US/setting';
import home from './en-US/home';
import about from './en-US/about';
import navBar from './en-US/navBar';


const components = {
    antLocale: antdEnUS,
    momentName: 'eu',
    momentLocale: momentEU,
};

export default {
    ...components,
    ...global,
    ...menu,
    ...setting,
    ...home,
    ...about,
    ...navBar,
};
