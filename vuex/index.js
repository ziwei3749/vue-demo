// https://github.com/jinzhanye/diy-vuex/blob/master/src/vuex/index.js
class Store {
    constructor(options) {
        let { state, mutations } = options;
        this.state = state;
        this.mutations = mutations;
        resetStore(this); // 让store里的state变成响应式的
    }

    resetStore(store) {
        store._vm = new Vue({
            data : {
                state: this.state
            } 
        });
    }

    commit( type, payload ) {
        this.mutations[type].call(this.state,payload)
    }
}

function install(Vue) {
    Vue.mixin( {
        beforeCreate() {
            if ( this.$options.store ) {
                this.$store = this.$options.store
            } else {
                this.$store = this.$parent.store
            }
        }
    })
}

export default {
    Store,
    install
}
