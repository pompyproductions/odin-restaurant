function newElem(obj) {
  if (!Object.hasOwn(obj, "tag")) return false;

  const elem = document.createElement(obj.tag);

  for (let prop in obj) {
    const val = obj[prop];
    switch (prop) {
      case "id":
        elem.id = val;
      case "class":
        elem.classList.add(val.split(" "));
        break;
      case "text":
        elem.textContent = val;
        break;
      case "attributes":
        for (let attr of val) {
          elem.setAttribute(attr[0], attr[1])
        }
        break;
      case "children":
        for (let node of val) {
          elem.appendChild(newElem(node));
        }
        break;
    }
  }
  return elem;
}

export default newElem;