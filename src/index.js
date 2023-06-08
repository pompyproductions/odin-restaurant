import "./sass/styles.scss";
import domalt from "domalt";
import { getPage } from "./modules/pages.js";

const entryPoint = document.getElementById("entry");

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
  // domalt.newElemNav(),
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

const pageNav = document.querySelector("nav.page-nav");
const pageContent = document.getElementById("content");
domalt.retrieve("content").replaceChildren(getPage("home"));
