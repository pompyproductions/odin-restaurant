import "./sass/styles.scss";
import tunaImg from "./assets/tuna2.png";
import newElem from "./modules/dom.js";

const domContent = document.getElementById("content");

domContent.append(
    newElem({
        tag: "header",
        children: [{
          tag: "h1",
          text: "POM-PESC"
        }]
    }),
    newElem({
        tag: "main",
        children: [{
          tag: "img",
          id: "tuna-img",
          attributes: [
            ["src", tunaImg],
            ["alt", "A tuna dish."]
          ]
        }]
    }),
    newElem({
        tag: "footer",
        children: [{
          tag: "p",
          text: "Made with \u2665 by Pompy Productions. All rights reserved."
        }]
    })
);