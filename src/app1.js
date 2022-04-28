import "./app1.css"
import $ from "jquery"
import Model from "./base/Model";

const eventBus = $(window);
// 视图相关都放到 m
const m = new Model({
    data: {
        n: parseInt(localStorage.getItem("n")) || 100
    },
    update(data) {
        Object.assign(m.data, data);
        eventBus.trigger("m.data.update");
        localStorage.setItem("n", m.data.n);
    }
});
// 数据相关都放到 v
const v = {
    el: undefined,
    html: `<div>
        <div class="wrapper">
            <div class="output">
                <span id="number">{{n}}</span>
            </div>
            <div id="btnCal" class="actions">
                <button id="add1">+1</button>
                <button id="minus1">-1</button>
                <button id="mul2">*2</button>
                <button id="divide2">÷2</button>
            </div>
        </div>
    </section>`,
    init(container) {
        v.el = $(container);
    },
    render(n) {
        // 子元素数
        if (v.el.children.length !== 0) {
            v.el.empty(); // 清空
        }
        $(v.html.replace("{{n}}", n)).appendTo($(v.el));
    }
}
// 其他的都放到 c
const c = {
    ui: undefined, // 不能一开始就初始化ui，因为v.render()没执行之前，是找不到这些元素的
    init(container) {
        v.init(container);
        v.render(m.data.n);
        c.autoBindEvents();
        eventBus.on("m.data.update", () => {
            v.render(m.data.n);
        })
    },
    events: {
        "click #add1": "add",
        "click #minus1": "minus",
        "click #mul2": "mul",
        "click #divide2": "divide",
    },
    autoBindEvents() {
        for (let key in c.events) {
            const value = c[c.events[key]]; // value是一个方法
            const keys = key.split(" ");
            v.el.on(keys[0], keys[1], value); // 绑定事件，但是没有重新渲染
        }
    },
    add() {
        m.update({n: m.data.n + 1});
    },
    minus() {
        m.update({n: m.data.n - 1});
    },
    mul() {
        m.update({n: m.data.n * 2});
    },
    divide() {
        m.update({n: m.data.n / 2});
    },
}

export default c;