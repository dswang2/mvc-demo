import $ from "jquery"
import "./app2.css"
import Model from "./base/Model";
import View from "./base/View";

// 视图相关都放到 m
const m = new Model({
    data: {
        index: parseInt(localStorage.getItem("app2.key")) || 0
    },
    update(data) {
        Object.assign(m.data, data);
        m.trigger("m.data.update");
        localStorage.setItem("app2.key", m.data.index);
    }
})
// 其他的都放到 v c
let view = null;
function initView(el){
    view = new View({
        data: m.data,
        el: el,
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
        render(data) {
            if (this.el.children.length !== 0) {
                this.el.empty(); // 清空
            }
            $(this.html(data.index)).appendTo($(this.el));
        },
        events: {
            "click .tab-bar>li": "switch",
        },
        switch(e) {
            m.update({index: parseInt(e.currentTarget.dataset.index)});
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
