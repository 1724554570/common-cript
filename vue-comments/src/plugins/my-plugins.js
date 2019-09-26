export default {
    install(Vue, options) {
        Vue.$data = { firstName: '大漠', lastName: 'W3cplus' };
        
        console.log(`${Vue.$data.firstName}_${Vue.$data.lastName}`);

        Vue.directive('hello', {
            // 只调用一次，指令第一次绑定到元素时调用 
            bind: function (el) {
                console.log('触发bind钩子函数！')
            },
            // 被绑定元素插入父节点时调用 
            inserted: function (el) {
                console.log('触发inserted钩子函数！')
            },
            // 所在组件的`VNode`更新时调用，但是可能发生在其子元素的`VNode`更新之前 
            update: function (el) {
                console.log('触发update钩子函数！')
            },
            // 所在组件的`VNode`及其子元素的`VNode`全部更新时调用 
            componentUpdated: function (el) {
                console.log('触发componentUpdated钩子函数！')
            },
            // 只调用一次，指令与元素解绑时调用 
            unbind: function (el) {
                console.log('触发unbind钩子函数！')
            }
        })

    }

}