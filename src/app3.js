import "./app3.css"
import $ from "jquery"

const $book = $("#app3 > #book");

$book.on("click",(e)=>{
    $book.toggleClass("active");
})