import Vue from 'vue';
// @ts-ignore
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: window.matchMedia('(prefers-color-scheme: dark)').matches,
        themes: {
            light: {
                primary: '#009844',
                accent: '#4BB2FF',
                secondary: '#424242',
                danger: '#FF794E',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC633',
            },
        },
    },
});
