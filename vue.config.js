
module.exports = {
    /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
     */
    // 项目部署的基础路径
    // 我们默认假设你的应用将会部署在域名的根部,
    // 例如 https://www.my-app.com/
    // 如果你的应用部署在一个子路径下，那么你需要在这里
    // 指定子路径。比如将你的应用部署在
    // https://www.foobar.com/my-app/
    // 那么将这个值改为 '/my-app/'
    publicPath: '/', //根路径, //process.env.NODE_ENV === 'production' ? '/my-vue/' : '/' 构建好的文件输出到哪里
  
    outputDir: "dist", // where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
    lintOnSave: true, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
    transpileDependencies: [
      /* string or regex */
    ], // 是否为生产环境构建生成sourceMap?
  
    productionSourceMap: false, // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
	    config.module.rule('pug')
	      .test(/\.pug$/)
	      .use('pug-html-loader')
	      .loader('pug-html-loader')
	      .end()
	},
    // configureWebpack: () => {}, // CSS 相关选项
    css: {
      // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
      // 也可以是传递给 extract-text-webpack-plugin 的选项对象
      extract: true, // 允许生成 CSS source maps?
      sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }
      loaderOptions: {}, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
      modules: false
    }, // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores
  
    parallel: require("os").cpus().length > 1, // PWA 插件相关配置 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  
    pwa: {
		themeColor:'transparent',
		msTileColor: 'transparent',
		manifestOptions:{
			name: "等一句晚安", //网站应用的全名
			short_name: "等一句晚安", //显示在主屏上的短名
			start_url: ".", // 启动网址
			display: "standalone",  // 启动画面
			theme_color: "#EC98B0", // #002140 （index.html文件中也要设置）主题颜色，强烈建议和ui主题颜色保持一致，看起来更有原生app的感觉
			background_color: "#EC98B0", // 启动背景颜色
			description: "祝你我前程似锦.",
			icons: [
				{
					"src": "./img/icons/favicon-1.png",
					"sizes": "64x64",
					"type": "image/png"
				},
				{
					"src": "./img/icons/favicon-2.png",
					"sizes": "120x120",
					"type": "image/png"
				},
				{
					"src": "./img/icons/favicon-3.png",
					"sizes": "144x144",
					"type": "image/png"
				},
				{
					"src": "./img/icons/favicon-4.png",
					"sizes": "152x152",
					"type": "image/png"
				},
				{
					"src": "./img/icons/favicon-5.png",
					"sizes": "192x192",
					"type": "image/png"
				},
				{
					"src": "./img/icons/favicon-6.png",
					"sizes": "384x384",
					"type": "image/png"
				},
				{
					"src": "./img/icons/favicon-7.png",
					"sizes": "512x512",
					"type": "image/png"
				}
			],
		},
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'black',
		iconPaths: {
		  favicon32: './favicon.ico',
		  favicon16: './favicon.ico',
		  appleTouchIcon: './favicon.ico',
		  maskIcon: './favicon.ico',
		  msTileImage: './favicon.ico'
		},
		
		
		workboxPluginMode: 'GenerateSW', // 也可以定义为‘InjectManifest’模式。但是需自己写SW.js文件进行配置
		    workboxOptions: {
		        importWorkboxFrom: 'cdn', //从''cdn"导入workbox,也可以‘local’
		        skipWaiting: true, // 安装完SW不等待直接接管网站
		        clientsClaim: true,
		        navigateFallback: '/index.html', 
		        exclude: [/\.(?:png|jpg|jpeg|svg)$/], //在预缓存中排除图片
		        // 定义运行时缓存
		        runtimeCaching: [
		            {
		                urlPattern: new RegExp('^https://cdn'),
		                handler: 'NetworkFirst',
		                options: {
		                    networkTimeoutSeconds: 20,
		                    cacheName: 'cdn-cache',
		                    cacheableResponse: {
		                        statuses: [200]
		                    }
		                }
		            }
		        ]
		    },
	}, // configure webpack-dev-server behavior
    devServer: {
      open: process.platform === "darwin",
      disableHostCheck: false,
      host: "0.0.0.0",
      port: 8088,
      https: false,
      hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
      proxy: {
    //     '/user':{
    //       target:'http://localhost:3000',
    //       changeOrigin: true, //允许跨域
		  // ws: true,
    //       pathRewrite: {
    //         '^/user': ''
    //       }
    //     },
	    [process.env.VUE_APP_USER_API]: {
	        target: process.env.VUE_API_DEV_USER,
	        changeOrigin: true,
	        pathRewrite: {
	          ['^' + process.env.VUE_APP_USER_API]: ''
	        }
	     },
		[process.env.VUE_APP_BASE_API]: {
	        target: process.env.VUE_API_DEV_TARGET,
	        changeOrigin: true,
	        pathRewrite: {
	          ['^' + process.env.VUE_APP_BASE_API]: ''
	        }
	     },
	     '/wxapi': {
	        target: 'https://wxapi.sh-datastone.com',
	        changeOrigin: true,
	        pathRewrite: {
	          '^/wxapi': ''
	        }
	     }
	
      } // string | Object
      // before: app => {}
    }, // 第三方插件配置
  
    pluginOptions: {
      // ...
    },
	
  };
  