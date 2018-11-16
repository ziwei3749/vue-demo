class Watch {
    constructor() {
        Dep.target = this;
    }

    update() {
        console.log("更新视图");
    }
}
