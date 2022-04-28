import "./app1.css"
import $ from "jquery"
import Model from "./base/Model";
import View from "./base/View";

const eventBus = $(window);
// 视图相关都放到 m
const m = new Model({
    data: {
        n: parseInt(localStorage.getItem("n") || "100"),
    },
    update(data) {
        Object.assign(m.data, data);
        eventBus.trigger("m.data.update");
        localStorage.setItem("n", m.data.n);
    }
});
// 数据相关都放到 v
// 其他的都放到 c
const c = {
    v: null,
    ui: undefined, // 不能一开始就初始化ui，因为v.render()没执行之前，是找不到这些元素的
    initView(){
        c.v = new View({
                el: c.container,
                html: `<div class="wrapper">
                        <div class="output">
                            <span id="number">{{n}}</span>
                        </div>
                        <div id="btnCal" class="actions">
                            <button id="add1">+1</button>
                            <button id="minus1">-1</button>
                            <button id="mul2">*2</button>
                            <button id="divide2">÷2</button>
                        </div>
                    </div>`,
                render(n) {
                    // 子元素数
                    if (c.v.el.children.length !== 0) {
                        c.v.el.empty(); // 清空
                    }
                    $(c.v.html.replace("{{n}}", n)).appendTo($(c.v.el));
                }
            })
    },
    init(container) {
        c.container = container;
        c.initView();
        c.v.render(m.data.n);
        c.autoBindEvents();
        eventBus.on("m.data.update", () => {
            c.v.render(m.data.n);
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
            c.v.el.on(keys[0], keys[1], value); // 绑定事件，但是没有重新渲染
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