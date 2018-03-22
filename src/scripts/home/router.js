import Index from './index.vue';
import Notfound from './404.vue';

export default [
	{
		path: '/home/index',
		component: Index
	}, {
		path: '*',
		component: Notfound
	}
];