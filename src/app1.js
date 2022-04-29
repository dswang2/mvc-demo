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
// 其他的都放到 v c
const view = {
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
    ui: undefined, // 不能一开始就初始化ui，因为c.render()没执行之前，是找不到这些元素的
    init(container) {
        view.el = $(container);
        view.render(m.data.n);
        view.autoBindEvents();
        eventBus.on("m.data.update", () => {
            view.render(m.data.n);
        })
    },
    render(n) {
        // 子元素数
        if (view.el.children.length !== 0) {
            view.el.empty(); // 清空
        }
        $(view.html.replace("{{n}}", n)).appendTo($(view.el));
    },
    events: {
        "click #add1": "add",
        "click #minus1": "minus",
        "click #mul2": "mul",
        "click #divide2": "divide",
    },
    autoBindEvents() {
        for (let key in view.events) {
            const value = view[view.events[key]]; // value是一个方法
            const keys = key.split(" ");
            view.el.on(keys[0], keys[1], value); // 绑定事件，但是没有重新渲染
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

export default view;