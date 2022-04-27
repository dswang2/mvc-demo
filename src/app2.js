import $ from "jquery"
import "./app2.css"

const html = `<section id="app2">
        <ol class="tab-bar">
            <li>tab1</li>
            <li>tab2</li>
        </ol>
        <ol class="tab-content">
            <li>content1</li>
            <li>content2</li>
        </ol>
    </section>`;
const $element = $(html);
$element.appendTo($("body>.page"));

const $tabBar = $("#app2 .tab-bar");
const $tabContent = $("#app2 .tab-content");
const key = "app2.key";
const index = localStorage.getItem(key) || 0;

$tabBar.on("click", "li", (e) => {
    const $li = $(e.currentTarget);
    $li.addClass("selected")
        .siblings()
        .removeClass("selected");
    const index = $li.index();
    $tabContent.children().eq(index)
        .addClass("active")
        .siblings()
        .removeClass("active");
    localStorage.setItem(key, index);
})

$tabBar.children().eq(index).trigger("click");