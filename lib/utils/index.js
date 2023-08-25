
export const extend = (obj, obj2) => {
  return obj.concat(obj2);
}

export const isInBody = (node) => {
  return node === document.body ? false : document.body.contains(node);
}

export const isDOM = (dom) => {
  console.log(dom);
  return typeof HTMLElement === "object"
    ? (dom) => {
      return dom instanceof HTMLElement;
    }
    : (dom) => {
      return (
        dom && typeof dom === "object" && dom.nodeType === 1 && typeof dom.nodeName === "string"
      );
    };
}
