class VueRouter {
    constructor( Vue, options ) {
        // 初始化监听hash事件
        this.init();
        // 得到routesMap
        this.routesMap = {};
        this.getRoutesMap(options);

        // 让当前的route变成响应式的
        this.app = new Vue( {
            data: {
                currentRoute: "#/"
            }
        });
        
        // 注册全局组件router-link和router-view
        this.initComponents(Vue);
    }

    init() {
        window.addEventListener("load", this.onHashChange, false);
        window.addEventListener(
            "hashchange",
            this.onHashChange,
            false
        );
    }

    initComponents(Vue) {
        Vue.component("router-link", {
            props: {
                to: {
                    type: String
                }
            },
            template: `<a :href="to"><slot></slot></a>`
        });

        let _this = this;
        Vue.component("router-view", {
            render(h) {
                console.log("_this.app.currentRoute", _this.app.currentRoute);
                let component = _this.routesMap[_this.app.currentRoute];
                return h(component);
            }
        });
    }

    getRoutesMap(options) {
        options.routes.forEach(route => {
            this.routesMap[route.path] = route.component;
        });
    }

    getHash() {
        return window.location.hash.slice(1) || "/";
    }

    onHashChange() {
        console.log('this',this)
        this.app.currentRoute = this.getHash();
    }
}

// class VueRouter {
//     constructor (Vue, options) {
//       this.$options = options;
//       this.routeMap = {};
//       this.app = new Vue({
//         data: {
//           current: '#/'
//         }
//       });

//       this.init();
//       this.createRouteMap(this.$options);
//       this.initComponent(Vue);
//     }

//     // 绑定事件
//     init () {
//       window.addEventListener('load', this.onHashChange.bind(this), false);
//       window.addEventListener('hashchange', this.onHashChange.bind(this), false);
//     }

//     // 路由映射表
//     createRouteMap (options) {
//       options.routes.forEach(item => {
//         this.routeMap[item.path] = item.component;
//       });
//     }

//     // 注册组件
//     initComponent (Vue) {
//       Vue.component('router-link', {
//         props: {
//           to: String
//         },
//         template: '<a :href="to"><slot></slot></a>'
//       });

//       const _this = this;
//       Vue.component('router-view', {
//           render( h ) {
//           var component = _this.routeMap[_this.app.current];
//           return h(component);
//         }
//       });
//     }

//     // 获取当前 hash 串
//     getHash () {
//       return window.location.hash.slice(1) || '/';
//     }

//     // 设置当前路径
//     onHashChange () {
//       this.app.current = this.getHash();
//     }
//   }
