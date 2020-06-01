export default {
	mode: 'spa',
	head: {
		title: 'DiaDia',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1, maximum-scale=1'
			},
			{ name: 'apple-mobile-web-app-capable', content: 'yes' },
			{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
			{
				rel: 'stylesheet',
				type: 'image/x-icon',
				href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
			}
		]
	},
	loading: { color: '#fff' },
	css: [],
	plugins: [],
	buildModules: [],
	modules: [ 'bootstrap-vue/nuxt', '@nuxtjs/axios' ],
	axios: {},
	build: {
		extend(config, ctx) {}
	}
}
