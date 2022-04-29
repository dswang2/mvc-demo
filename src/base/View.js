import $ from "jquery"

class View {
    constructor(options) {
        Object.assign(this,options);
        debugger;
        this.el = $(this.el);
        this.render(this.data);
        this.autoBindEvents();
        this.eventBus.on("m.data.update", () => {
            this.render(this.data);
        });
    }

    autoBindEvents() {
        for (let key in this.events) {
            const value = this[this.events[key]]; // value是一个方法
            const keys = key.split(" ");
            this.el.on(keys[0], keys[1], value); // 绑定事件，但是没有重新渲染
        }
    }
}

export default View