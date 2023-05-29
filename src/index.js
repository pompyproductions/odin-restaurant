import "./sass/styles.scss";
import domTools from "./modules/dom";
import { getPage } from "./modules/pages"

const entryPoint = document.getElementById("entry");

function switchPage(page) {
  pageContent.replaceChildren(getPage(page))
}

entryPoint.append(
    domTools.newElem({
        tag: "header",
        children: [{
          tag: "h1",
          text: "POM-PESC"
        }],
        uid: true
    }),
    domTools.newElemNav([{

    }]),
    domTools.newElem({
        tag: "main",
        id: "content",
        uid: true
    }),
    domTools.newElem({
        tag: "footer",
        children: [{
          tag: "p",
          text: "Made with \u2665 by Pompy Productions. All rights reserved."
        }],
        uid: true
    })
);

const pageNav = document.querySelector("nav.page-nav");
const pageContent = document.getElementById("content");
switchPage("home");