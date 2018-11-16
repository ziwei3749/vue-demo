function observe( data ) {
    function walk(data) {
        Object.keys( data ).forEach( item => {
            if ( typeof data[item] === 'object' ) {
                walk(data[item])
            } else {
                defineReactive(data,item,data[item])
            }
        })    
    }
    walk(data)
}


function defineReactive( obj, key, val ) {
    let dep = new Dep()
    Object.defineProperty( obj, key, {
        get: () => {
            console.log( '触发了getter' )
            dep.addSub(Dep.target)
            return val
        },

        set: ( newVal ) => {
            console.log('触发了setter')
            if ( val === newVal ) return
            dep.notify()
            val = newVal
        }
    })
}


