export function Dispatch() {
  const initEventName = "dispatch-init";
  return {
    init() {
      const innerHTML = HTMLElement.prototype.innerHTML;
      HTMLElement.prototype.innerHTML = function () {
        window.dispatchEvent(new CustomEvent(initEventName));
        innerHTML.apply(this, arguments);
      };

      window.addEventListener(initEventName, this.addListeners);
      window.dispatchEvent(new CustomEvent(initEventName));
      //   this.addListeners();
    //   const observer = new MutationObserver((mutationsList) => {
    //     for (const mutation of mutationsList) {
    //       if (mutation.type === "childList" || mutation.type === "subtree") {
    //         window.dispatchEvent(new CustomEvent(initEventName));
    //         //   this.addListeners();
    //       }
    //     }
    //   });
    //   observer.observe(document.body, { childList: true, subtree: false });
    },
    addListeners() {
      console.log("Setting up event listeners");
      document.querySelectorAll("[data-dispatch]").forEach((node) => {
        // node.replaceWith(node.cloneNode(true));
        const [type, name] = node.dataset.dispatch.split(":");
        let detail = {};
        if (node.dataset.dispatchDetail) {
          detail = JSON.parse(node.dataset.dispatchDetail);
        }
        function listener() {
          // TODO: Find a way to prevent default
          node.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));
        }
        node.removeEventListener(type, listener);
        node.addEventListener(type, listener);
        // node.removeAttribute("data-dispatch");
      });
    },
  };
}
