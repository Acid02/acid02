import friend from '@/views/friend'
export default  {
    routes:[
        {
            path: '/',
            // name: 'Home',
            component: ()=> import('@/views/Home'),
			meta:{
				title:'等一句晚安',
				keepAlive: true 
			},
			children:[
				{
					path:'/',
					name:'Tags',
					component: ()=> import('@/components/Tags'),
					meta:{
						title:'等一句晚安',
						keepAlive: true 
					},
				},
				{
					path:'Classify',//分类
					name:'Classify',
					component: ()=> import('@/components/Classify'),
					meta:{
						title:'分类',
						keepAlive: true 
					},
				},
				{
		        	path:'/Classify/:name',
		        	name:'Classifylist',
		        	component: ()=> import('@/components/Tags'),
					props: true,
		        	meta:{
		        		BreadName:'分类',
		        		BreadUrl:'Classify',
						keepAlive: true 
		        	}
		        },
				{
					path:'Label',//标签
					name:'Label',
					component: ()=> import('@/components/Label'),
					meta:{
						title:'标签',
						keepAlive: true 
					},
				},
				{
					path:'/Label/:name',
					name:'Labellist',
					component: ()=> import('@/components/Tags'),
					props: true,
					meta:{
						BreadName:'标签',
						BreadUrl:'Label',
						keepAlive: true 
					}
				}
			],
        },
		{
			path:'/details/:parent/:id',
			name:'details',
			component: ()=> import('@/views/details'),
			props: true,
			meta:{
				keepAlive: false 
			}
		},
		{
			path:'/socket',
			name:'socket',
			component: ()=> import('@/views/socket'),
			meta:{
				keepAlive: true 
			}
		},
		{
			path:'/friend',
			name:'friend',
			component: friend,
			meta:{
				keepAlive: false 
			}
		},
        {
            path:'*',
			name:'NotFound',
            component: ()=> import('@/components/NotFound'),
			meta:{
				keepAlive: true 
			}
        }
    ],
    mode:"history", //在此处加入以下内容
	// scrollBehavior (to, from, savedPosition) {
	// 	console.log(to,from,savedPosition)
	// 	//详情页回到顶部
	//     if (savedPosition || to.name !=='details') {
	//       return savedPosition
	//     } else {
	//       return { x: 0, y: 0 }
	//     }
	//   },
    // fallback:false   //强行history路由
}