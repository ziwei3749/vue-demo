class Dep{
    constructor() {
        this.subs = []
    }

    addSub() {
        this.subs.push(Dep.target)
    }

    notify() {
        this.subs.forEach( watcher => {
            watcher.update()
        })
    }
}

Dep.target = null