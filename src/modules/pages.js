import domalt from "domalt";
import tunaImg from "../assets/tuna2.png";

const pageParent = document.getElementById("content");

const pages = {
  home: domalt.newElem({
    tag: "img",
    id: "tuna-img",
    attributes: [
      ["src", tunaImg],
      ["alt", "A tuna dish."],
    ],
  }),
  menu: domalt.newElemList([
    "Tuna pasta",
    "Salmon chirashi",
    "Canned sardine salad"
  ]),
  contact: domalt.newElem({
    tag: "p",
    content: "Coming soon."
  }),
  notFound: domalt.newElem({
    tag: "h2",
    content: "404 not found."
  })
}

const switchPage = (pageName) => {
  if (pages.hasOwn(pageName)) {
    pageParent.replaceChildren(pages[pageName]);
  } else {
    pageParent.replaceChildren(pages.notFound);
  }
}

export { switchPage };