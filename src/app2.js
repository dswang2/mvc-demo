import $ from "jquery"
import "./app2.css"
import Model from "./base/Model";

const eventBus = $(window);
console.log(eventBus);
// 视图相关都放到 m
const m = new Model({
    data: {
        index: parseInt(localStorage.getItem("app2.key")) || 0
    },
    update(data) {
        Object.assign(m.data, data);
        eventBus.trigger("m.data.update");
    }
})
// 数据相关都放到 v
const v = {
    el: undefined,
    html(index) {
        return `<section id="app2">
        <ol class="tab-bar">
            <li class="${index === 0 ? 'selected' : ''}" data-index="0">tab1</li>
            <li class="${index === 1 ? 'selected' : ''}" data-index="1">tab2</li>
        </ol>
        <ol class="tab-content">
            <li class="${index === 0 ? 'active' : ''}" >content1</li>
            <li class="${index === 1 ? 'active' : ''}" >content2</li>
        </ol>
    </section>`
    },
    init(container) {
        v.el = $(container);
    },
    render(index) {
        if (v.el.children.length !== 0) {
            v.el.empty(); // 清空
        }
        $(v.html(index)).appendTo($(v.el));
    }
}
// 其他的都放到 c
const c = {
    ui: undefined, // 不能一开始就初始化ui，因为v.render()没执行之前，是找不到这些元素的
    init(container) {
        v.init(container);
        v.render(m.data.index);
        c.autoBindEvents();
        eventBus.on("m.data.update", () => {
            v.render(m.data.index);
        })
    },
    events: {
        "click .tab-bar>li": "switch",
    },
    autoBindEvents() {
        for (let key in c.events) {
            const value = c[c.events[key]]; // value是一个方法
            const keys = key.split(" ");
            v.el.on(keys[0], keys[1], value); // 绑定事件，但是没有重新渲染
        }
    },
    switch(e) {
        m.update({index: parseInt(e.currentTarget.dataset.index)});
    },
}

export default c;

