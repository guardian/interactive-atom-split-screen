// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"

// to-do instead of set timeout
// implement checkExists-type thing
setTimeout(function () {
  createVisualPanel();
  syncVisualPanelScroll();

}, 1000);

// Clones all .element-image
// into a a new element, .visual-panel
// and injects it next to the main text element
function createVisualPanel() {
  let articleVisualElAll = document.querySelectorAll('.element-image, .element-interactive');
  let visualPanelEl = document.createElement('div');
  let visualPanelInnerEl = document.createElement('div');

  visualPanelEl.classList.add('visual-panel');
  visualPanelInnerEl.classList.add('visual-panel__inner');
  visualPanelEl.appendChild(visualPanelInnerEl);

  articleVisualElAll.forEach(function (articleVisualEl) {
    const articleVisualElClone = articleVisualEl.cloneNode(true);
    visualPanelInnerEl.appendChild(articleVisualElClone);
  });

  const mainColEl = document.querySelector('.content__main .gs-container:not(.u-cf');
  mainColEl.insertBefore(visualPanelEl, mainColEl.firstChild);

}


// keep .visual-panel scroll
// in sync with window's
function syncVisualPanelScroll() {
  const visualPanelEl = document.querySelector('.visual-panel');
  window.addEventListener('scroll', function () {
    const visualPanelTargetY = calcTargetY('visual');
    visualPanelEl.scrollTo({
      top: visualPanelTargetY
    })
  });
}

function calcTargetY(el) {
  const visualPanelEl = document.querySelector('.visual-panel');
  const contentHeight = ({
    visual: (document.querySelector('.visual-panel__inner').offsetHeight + window.innerHeight / 2),
    copy: (document.querySelector('.content__main .gs-container:not(.u-cf)').offsetHeight)
  });
  const r = (contentHeight.visual / contentHeight.copy);
  const targetY = ((window.scrollY - (window.innerHeight / 4)) * r);
  return targetY;

}

// Once we scroll past the header
// enable free scrolling in the visual panel
function unlockVisualPanel() {
  const visualPanelEl = document.querySelector('.visual-panel');
  console.log(visualPanelEl);
  window.addEventListener('scroll', function (e) {
    if (window.scrollY >= window.innerHeight) {
      console.log('scrolled past 00vh');
    }

  })
}
