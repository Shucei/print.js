
import { isDOM, isInBody, extend } from './utils/index'
class Print {
  constructor({ dom, options, callback, watermark }) {
    if (!(this instanceof Print)) return new Print(dom, options);
    this._onCallback = callback;
    this.watermark = watermark || '';
    this.options = options.length > 0 ? extend([".no-print"], options) : [".no-print"];
    if (typeof dom === "string") {
      this.dom = document.querySelector(dom);
    } else {
      this.dom = isDOM(dom) ? dom : dom.$el;
    }
    this.startPrint = this.startPrint.bind(this);
  }
  init () {
    const content = this.getStyle() + this.getHtml();
    this.writeIframe(content);
  }


  getStyle () {
    const styles = document.querySelectorAll("style,link");
    let str = Array.from(styles)
      .map((style) => style.outerHTML)
      .join("");
    str += `<style>${this.options.join(",")} {display:none;}</style>`;
    return str;
  }

  getHtml () {
    const inputs = document.querySelectorAll("input");
    const textareas = document.querySelectorAll("textarea");
    const selects = document.querySelectorAll("select");

    for (var k = 0; k < inputs.length; k++) {
      if (inputs[k].type == "checkbox" || inputs[k].type == "radio") {
        if (inputs[k].checked == true) {
          inputs[k].setAttribute("checked", "checked"); 
        } else {
          inputs[k].removeAttribute("checked");
        }
      } else if (inputs[k].type == "text") {
        inputs[k].setAttribute("value", inputs[k].value);
      } else {
        inputs[k].setAttribute("value", inputs[k].value);
      }
    }

    for (var k2 = 0; k2 < textareas.length; k2++) {
      if (textareas[k2].type == "textarea") {
        textareas[k2].innerHTML = textareas[k2].value;
      }
    }

    for (var k3 = 0; k3 < selects.length; k3++) {
      if (selects[k3].type == "select-one") {
        var child = selects[k3].children;
        for (var i in child) {
          if (child[i].tagName == "OPTION") {
            if (child[i].selected == true) {
              child[i].setAttribute("selected", "selected");
            } else {
              child[i].removeAttribute("selected");
            }
          }
        }
      }
    }
    let outerHTML = this.wrapperRefDom(this.dom).outerHTML;
    // 添加水印
    if (this.watermark) {
      outerHTML = `<div>${outerHTML}<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-35deg); color: rgba(200, 200, 200, 0.2); font-size: 100px;">${this.watermark}</div></div>`;
    }
    return outerHTML;
    
  }

  wrapperRefDom (refDom) {
    let prevDom = null;
    let currDom = refDom;

    if (!isInBody(currDom)) return currDom;

    while (currDom) {
      if (prevDom) {
        let element = currDom.cloneNode(false);
        element.appendChild(prevDom);
        prevDom = element;
      } else {
        prevDom = currDom.cloneNode(true);
      }
      currDom = currDom.parentElement;
    }

    return prevDom;
  }

  writeIframe (content) {
    let w,
      doc,
      iframe = document.createElement("iframe"),
      f = document.body.appendChild(iframe);
    iframe.id = "myIframe";
    iframe.setAttribute("style", "position:absolute;width:0;height:0;top:-10px;left:-10px;");
    w = f.contentWindow || f.contentDocument; // 获取 iframe 的 window 对象
    doc = f.contentDocument || f.contentWindow.document; // 获取 iframe 的 document 对象
    doc.open(); // 这里必须打开文档，否则写入会失败
    doc.write(content);
    doc.close(); // 这里必须关闭文档，否则 iframe 会一直在加载中
    let _this = this;
    iframe.onload = function () {
      _this.toPrint(w);
      setTimeout(function () {
        document.body.removeChild(iframe);
        // 调用打印完成回调
        if (_this._onCallback && typeof _this._onCallback === "function") {
          _this._onCallback('success');
        }
      }, 100);
    };
  }

  toPrint (frameWindow) {
    try {
      setTimeout(function () {
        frameWindow.focus();
        try {
          if (!frameWindow.document.execCommand("print", false, null)) {
            frameWindow.print();
          }
        } catch (e) {
          frameWindow.print();
        }
        frameWindow.close();
      }, 10);
    } catch (err) {
      // 调用打印完成回调
      if (this._onCallback && typeof this._onCallback === "function") {
        this._onCallback('err');
      }
    }
  }

  startPrint () {
    this.init();
  }
}
export default Print;
