import { defineStore } from 'pinia';

export interface AppState {
    lang: string;
    token: string | null;
    userInfo: {
        id: string;
        name: string;
        [key: string]: any;
    } | null;
}

export const useAppStore = defineStore('app', {
    state: (): AppState => {
        return {
            lang: '',
            token: null,
            userInfo: null,
        };
    },
    getters: {
        userId(state) {
            return state.userInfo?.id || '';
        },
    },
    actions: {
        setLang(lang: string) {
            this.lang = lang;
        },
        setToken(token: string) {
            this.token = token;
        },
        setUserInfo(userInfo: AppState['userInfo']) {
            this.userInfo = userInfo;
        },
    },
});
