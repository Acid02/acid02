export default  {
    routes:[
        {
            path: '/',
            name: 'Home',
            component: ()=> import('@/views/Home'),
			meta:{
				title:'沙小光的成长笔记'
			},
			children:[
				{
					path:'',
					name:'Tags',
					component: ()=> import('@/components/Tags'),
					meta:{
						title:'沙小光的成长笔记'
					},
				},
				{
					path:'Classify',//分类
					name:'Classify',
					component: ()=> import('@/components/Classify'),
					meta:{
						title:'分类'
					},
				},
				{
		        	path:'/Classify/:name',
		        	name:'Classifylist',
		        	component: ()=> import('@/components/Tags'),
					props: true,
		        	meta:{
		        		BreadName:'分类',
		        		BreadUrl:'Classify'
		        	}
		        },
				{
					path:'Label',//标签
					name:'Label',
					component: ()=> import('@/components/Label'),
					meta:{
						title:'标签'
					},
				},
				{
					path:'/Label/:name',
					name:'Labellist',
					component: ()=> import('@/components/Tags'),
					props: true,
					meta:{
						BreadName:'标签',
						BreadUrl:'Label'
					}
				}
			],
        },
		{
			path:'/details/:parent/:id',
			name:'details',
			component: ()=> import('@/views/details'),
			props: true,
		},
        {
            path:'*',
			name:'NotFound',
            component: ()=> import('@/components/NotFound')
        }
    ],
    mode:"history",
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