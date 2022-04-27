import "./app1.css"
import $ from "jquery"

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

const $btnCal = $("#btnCal");
const $output = $("#number");

$output.text(localStorage.getItem("n") || 100);

// 事件捕获
$btnCal.on("click",(e)=>{
   console.log(e.currentTarget); // 父控件
   console.log(e.target); // 子控件，具体点击的子控件
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