import antd from "ant-design-vue/es/locale/zh_CN";
import momentCN from "moment/dist/locale/zh-cn";
import global from "./zh-CN/global";
import menu from "./zh-CN/menu";
import setting from "./zh-CN/setting";
import home from './zh-CN/home'
import about from './zh-CN/about';
import navBar from "./zh-CN/navBar";


const components = {
    antLocale: antd,
    momentName: "zh-cn",
    momentLocale: momentCN,
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
