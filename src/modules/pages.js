import newElem from "./dom.js";
import tunaImg from "../assets/tuna2.png";

const homePage = newElem({
  tag: "img",
  id: "tuna-img",
  attributes: [
    ["src", tunaImg],
    ["alt", "A tuna dish."],
  ],
});

const menuPage = newElem({
  tag: "ul",
  children: [
    {
      tag: "li",
      text: "Tuna dish",
    },
    {
      tag: "li",
      text: "Salmon dish",
    },
  ],
});

const contactPage = newElem({
  tag: "p",
  text: "Coming soon",
});

const notFoundPage = newElem({
  tag: "p",
  text: "404 not found."
});

const getPage = (name, reset=false) => {
  switch (name) {
    case "home":
      return homePage;
    case "menu":
      return menuPage;
    case "contact":
      return contactPage;
  }
  return notFoundPage;
};


export { getPage };