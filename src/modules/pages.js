import domalt from "domalt";
import { recipes } from "./recipes";
import tunaImg from "../assets/tuna2.png";

const pages = {
  home: domalt.newElem({
    tag: "img",
    id: "tuna-img",
    attributes: [
      ["src", tunaImg],
      ["alt", "A tuna dish."],
    ],
  }),
  menu: domalt.newElemList(recipes),
  contact: domalt.newElem({
    tag: "p",
    content: "Coming soon."
  }),
  notFound: domalt.newElem({
    tag: "h2",
    content: "404 not found."
  })
}

const getPage = (pageName) => {
  if (pages.hasOwnProperty(pageName)) {
    return pages[pageName];
  } 
  return pages.notFound;
}

export { getPage };