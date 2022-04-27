import "./app3.css"
import $ from "jquery"
import { YESORNO } from "./com";

const html = `<section id="app3">
        <div id="book"></div>
    </section>`;
const $element = $(html);
$element.appendTo($("body>.page"));

const key = "app3.active";
const $book = $("#app3 > #book");


const active = localStorage.getItem(key) === YESORNO.YES;
$book.toggleClass("active",active);

$book.on("click",(e)=>{
    $book.toggleClass("active");
    localStorage.setItem(key,$book.hasClass("active") ? YESORNO.YES : YESORNO.NO);
})