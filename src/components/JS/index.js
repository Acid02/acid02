import Vue from 'vue'
import MessageBox from './MessageBox/index.vue'

export const messageBox = (function(ss){
	let defaultes = { //默认值
		title:'Tips',
		content:'Xinxin is the most beautiful！💗',
		cancel:'No',
		ok:'Yes',
		handleCancel: null,
		handleOK: null,
	};
	
	return function( opts ){
		
		for(let attr in opts){
			defaultes[attr] = opts[attr]
		}
		
		let MyComponent = Vue.extend(MessageBox);
		
		let vm = new MyComponent({
			el:document.createElement('div'),
			data:{
				title: defaultes.title,
				content: defaultes.content,
				cancel: defaultes.cancel,
				ok: defaultes.ok
			},
			methods:{
				handleCancel(){
					defaultes.handleCancel && defaultes.handleCancel.call(this);
					document.body.removeChild( vm.$el )
				},
				handleOK(){
					defaultes.handleOK && defaultes.handleOK.call(this);
					document.body.removeChild( vm.$el )
				}
				
			}
		});
		
		document.body.appendChild( vm.$el )
		
	};
	
})();