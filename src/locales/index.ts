import { createI18n } from 'vue-i18n';
import type { I18n, I18nOptions } from 'vue-i18n';
import Storage from 'store';
import moment from 'moment';

// default lang
import enUS from './lang/en-US';
import zhCN from './lang/zh-CN';

// Vue.use(VueI18n)

// export const defaultLang = Storage.get('lang') ?? 'zh-CN';

// moment.updateLocale(zhCN.momentName,zhCN.momentLocale);

const messages = {
    en_US: {
        ...enUS,
    },
    zh_CN: {
        ...zhCN,
    },
};

export const defaultLang = ((lang) => (lang in messages ? lang : 'zh_CN'))(
    Storage.get('lang'),
);

export type Lang = keyof typeof messages;

const i18n = createI18n({
    legacy: false,
    silentTranslationWarn: true,
    locale: defaultLang,
    fallbackLocale: defaultLang,
    messages,
});

const loadedLanguages = [defaultLang];

function setI18nLanguage(lang: keyof typeof messages) {
    i18n.global.locale.value = lang;
    // request.headers['Accept-Language'] = lang
    document.querySelector('html')?.setAttribute('lang', lang);
    return lang;
}

export function loadLanguageAsync(lang: keyof typeof messages = defaultLang) {
    return new Promise((resolve) => {
        // 缓存语言设置
        Storage.set('lang', lang);
        if (i18n.global.locale.value !== lang) {
            if (!loadedLanguages.includes(lang)) {
                return import(
                    /* webpackChunkName: "lang-[request]" */ `./lang/${lang}.ts`
                ).then((msg) => {
                    const locale = msg.default;
                    i18n.global.setLocaleMessage(lang, locale);
                    loadedLanguages.push(lang);
                    moment.updateLocale(locale.momentName, locale.momentLocale);
                    return setI18nLanguage(lang);
                });
            }
            return resolve(setI18nLanguage(lang));
        }
        return resolve(lang);
    });
}

export function i18nRender(key: string, args?: object) {
    // vue-i18n 9.2.2版本导致ts错误，暂时屏蔽规则
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return i18n.global.t(`${key}`, args);
}

export const t = i18nRender;

export default i18n;
