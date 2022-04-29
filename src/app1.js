import "./app1.css"
import $ from "jquery"
import Model from "./base/Model";
import View from "./base/View";

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
let view = null;

function initView(container){
    view = new View({
        data: m.data,
        el: container,
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
        render(data) {
            // 子元素数
            if (this.el.children.length !== 0) {
                this.el.empty(); // 清空
            }
            $(this.html.replace("{{n}}", data.n)).appendTo($(this.el));
        },
        eventBus: eventBus,
        events: {
            "click #add1": "add",
            "click #minus1": "minus",
            "click #mul2": "mul",
            "click #divide2": "divide",
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
    })
}

export default initView;