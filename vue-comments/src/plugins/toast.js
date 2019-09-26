/**
 * 
 */
export default {

    install(Vue, options) {

        let opt = {
            duration: 3000
        };

        Vue.prototype.$tosat = (tips) => {

            let toastTpl = Vue.extend({
                // 创建构造器，定义toast模板 
                template: `<div class="toast"> ${tips} </div>`
            })
            // 创建实例，挂载到文档以后的地方 
            let tpl = new toastTpl().$mount().$el;
            // 把创建的实例添加到body中 
            document.body.appendChild(tpl);
            // 延迟3000ms后移除toast模板 
            setTimeout(() => {
                document.body.removeChild(tpl)
            }, opt.duration);

        }
    }

}