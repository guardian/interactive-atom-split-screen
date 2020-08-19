console.log('this explodez');

const isFrame = (window.self !== window.top);
if (isFrame) {

  injectStyles();
} else {
  console.log('no explosion needed');
}


function injectStyles() {
  const styleElAll = document.querySelectorAll('style');
  styleElAll.forEach((el) => {
    if (el.innerText.indexOf('.visual-panel') > 0) {
      // correct article-styles element
      const atomEl = parent.document.querySelector("[data-atom-id='interactives/2019/10/test/default'], [data-atom-id='interactives/2020/04/split-screen-layout/default']");
      atomEl.appendChild(el);
    }
  });
}
