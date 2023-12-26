import './index.less';

import { Menu, Dropdown } from 'ant-design-vue';
import { i18nRender } from '@/locales';
import { GlobalOutlined } from '@ant-design/icons-vue';
import { useAppStore } from '@/store/app';

const locales = ['zh-CN', 'en-US'];
const languageLabels = {
    'zh-CN': '简体中文',
    // 'zh-TW': '繁体中文',
    'en-US': 'English',
    // 'pt-BR': 'Português'
};
// eslint-disable-next-line
const languageIcons = {
    'zh-CN': '🇨🇳',
    // 'zh-TW': '🇭🇰',
    'en-US': '🇺🇸',
    // 'pt-BR': '🇧🇷'
};

const SelectLang = {
    props: {
        prefixCls: {
            type: String,
            default: 'ant-pro-drop-down',
        },
    },
    name: 'SelectLang',
    render() {
        const app = useAppStore();
        const { prefixCls } = this;
        const changeLang = ({ key }) => {
            app.setLang(key);
        };
        const langMenu = (
            <Menu
                class={['menu', 'ant-pro-header-menu']}
                selectedKeys={[app.lang]}
                onClick={changeLang}
            >
                {locales.map((locale) => (
                    <Menu.Item key={locale}>
                        <span
                            role='img'
                            aria-label={languageLabels[locale]}
                            style='margin-right:8px;'
                        >
                            {languageIcons[locale]}
                        </span>{' '}
                        {languageLabels[locale]}
                    </Menu.Item>
                ))}
            </Menu>
        );
        return (
            <Dropdown overlay={langMenu} placement='bottomRight'>
                <span class={prefixCls}>
                    <GlobalOutlined
                        title={i18nRender('navBar.lang')}
                    ></GlobalOutlined>
                </span>
            </Dropdown>
        );
    },
};

export default SelectLang;
