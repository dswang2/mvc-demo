import "./app1.css"
import $ from "jquery"

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