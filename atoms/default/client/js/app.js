// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"

import { image } from "d3";


createVisualPanel();
function createVisualPanel() {
  let articleVisualElAll = document.querySelectorAll('.element-image');
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
