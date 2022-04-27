import "./app1.css"
import $ from "jquery"
// 初始化HTML
const html = `<section id="app1">
        <div class="wrapper">
            <div class="output">
                <span id="number">1</span>
            </div>
            <div id="btnCal" class="actions">
                <button id="add1">+1</button>
                <button id="minus1">-1</button>
                <button id="mul2">*2</button>
                <button id="divide2">÷2</button>
            </div>
        </div>
    </section>`;
const $element = $(html);
$element.appendTo($("body>.page"));
// 重要元素
const $btnCal = $("#btnCal");
const $output = $("#number");
// 初始化数据
const n = localStorage.getItem("n") || 100;
// 渲染数据
$output.text(n);
// 绑定事件
$btnCal.on("click",(e)=>{
   let n = parseInt($output.text());
   switch (e.target.id){
      case "add1":
         n += 1;
         break
      case "minus1":
         n -= 1;
         break
      case "mul2":
         n *= 2;
         break
      case "divide2":
         n /= 2;
         break
   }
   $output.text(n);
   localStorage.setItem("n",$output.text());
})