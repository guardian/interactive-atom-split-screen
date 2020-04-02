// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"

// to-do instead of set timeout
// implement checkExists-type thing
// setTimeout(function () {
// }, 1000);

checkReady();
const checkReadyInterval = setInterval(function () {
  if (checkReady()) {
    clearInterval(checkReadyInterval);
    createVisualPanel();
    syncVisualPanelScroll();
  }
}, 10);


function checkReady() {
  let intElAll = document.querySelectorAll('.element-interactive[data-canonical-url*="looping-video"]');
  const intElLast = intElAll[intElAll.length - 1]
  return !(intElLast.querySelectorAll('a').length > 0);
}


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

function calcTargetY() {
  const visualPanelEl = document.querySelector('.visual-panel__inner');
  const copyEl = document.querySelector('.content__main .gs-container:not(.u-cf)');
  const contentHeight = ({
    visual: (visualPanelEl.offsetHeight + window.innerHeight / 2),
    copy: (copyEl.offsetHeight)
  });
  const r = (contentHeight.visual / contentHeight.copy);
  const targetY = ((window.scrollY - (window.innerHeight / 4)) * r);
  return targetY;

}

