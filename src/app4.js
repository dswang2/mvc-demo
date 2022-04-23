import "./app4.css"
import $ from "jquery"

const $circle = $("#app4 > #circle");
$circle.on("mouseenter", (e) => {
    $circle.addClass("active")
}).on("mouseleave", (e) => {
    $circle.removeClass("active");
})