import "./sass/styles.scss";
import domalt from "domalt";
import { getPage } from "./modules/pages.js";

const entryPoint = document.getElementById("entry");
const navElems = ["home", "menu", "contact", "test"].map((pageName) => {
  return {
    tag: "a",
    content: pageName,
    listeners: [
      ["click", () => switchPage(pageName)]
    ]
  }
});

entryPoint.append(
  domalt.newElem({
    tag: "header",
    children: [
      {
        tag: "h1",
        content: "POM-PESC",
      },
    ],
  }),
  domalt.newElem({
    tag: "nav",
    children: navElems
  }),
  domalt.newElem({
    tag: "main",
    saveAs: "content",
  }),
  domalt.newElem({
    tag: "footer",
    children: [
      {
        tag: "p",
        content: "Made with \u2665 by Pompy Productions. All rights reserved.",
      },
    ],
  })
);

const switchPage = (pageName) => {
  domalt.retrieve("content").replaceChildren(getPage(pageName));
}

switchPage("home");
