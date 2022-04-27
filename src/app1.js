import "./app1.css"
import $ from "jquery"

// 视图相关都放到 m
const m = {
    data: {
        n: parseInt(localStorage.getItem("n")) || 100
    }
}
// 数据相关都放到 v
const v = {
    el: undefined,
    html: `<section id="app1">
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
    update() {
        c.ui.output.text(m.data.n);
    },
    render() {
        if(v.el === undefined){
            v.el = $(v.html.replace("{{n}}",m.data.n)).appendTo($("body>.page"));
        }else {
            const  newEle = $(v.html.replace("{{n}}",m.data.n));
            v.el.replaceWith(newEle);
            v.el = newEle;
        }
    }
}
// 其他的都放到 c
const c = {
    ui: undefined, // 不能一开始就初始化ui，因为v.render()没执行之前，是找不到这些元素的
    init() {
        c.ui = {
            btnCal: $("#btnCal"),
            output: $("#number"),
        }
        c.bindEvents();
    },
    bindEvents() {
        c.ui.btnCal.on("click", (e) => {
            switch (e.target.id) {
                case "add1":
                    m.data.n += 1;
                    break
                case "minus1":
                    m.data.n -= 1;
                    break
                case "mul2":
                    m.data.n *= 2;
                    break
                case "divide2":
                    m.data.n /= 2;
                    break
            }
            localStorage.setItem("n", m.data.n);
            v.render();
        })
    }
}

v.render();
c.init();