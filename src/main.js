import {createApp} from 'vue';
import {router} from '@/router';

import App from '@/App.vue';

import 'lenis/dist/lenis.css';
import '@/assets/styles/base.scss';
import '@/assets/styles/global.scss';

createApp(App).use(router).mount('#root');
