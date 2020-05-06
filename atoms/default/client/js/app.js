// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"


checkReady();
const checkReadyInterval = setInterval(function () {
  if (checkReady()) {
    console.log('SPLIT VIEW ATOM STARTS');
    clearInterval(checkReadyInterval);
    createVisualPanel();
    syncVisualPanelScroll();
    customTypography();
  }
}, 10);

// --- 1 --- Initialise at the right time
function checkReady() {
  const intElAll = document.querySelectorAll('.element-interactive[data-canonical-url*="looping-video"]');
  if (intElAll.length > 0) {
    const intElLast = intElAll[intElAll.length - 1]
    return !(intElLast.querySelectorAll('a').length > 0);
  } else {
    return true;
  }
}


// --- 2 --- Build the visual panel

// Clones all .element-image
// into a a new element, .visual-panel
// and injects it next to the main text element
function createVisualPanel() {
  const articleVisualElAll = document.querySelectorAll('.element-image, .element-interactive, .element-atom--media');

  const visualPanelEl = document.createElement('div');
  const visualPanelInnerEl = document.createElement('div');

  visualPanelEl.classList.add('visual-panel');
  visualPanelInnerEl.classList.add('visual-panel__inner');
  visualPanelEl.appendChild(visualPanelInnerEl);

  articleVisualElAll.forEach(function (articleVisualEl) {
    const articleVisualElClone = articleVisualEl.cloneNode(true);
    visualPanelInnerEl.appendChild(articleVisualElClone);
  });

  const mainColEl = document.querySelector('.content__main .gs-container:not(.u-cf');
  mainColEl.insertBefore(visualPanelEl, mainColEl.firstChild);

  console.log('visual panel ready', visualPanelEl);
}


// --- 3 --- Sync the visual panel scroll
function syncVisualPanelScroll() {
  const visualPanelEl = document.querySelector('.visual-panel');
  const currentScroll = visualPanelEl.scrollTop;
  const targetScroll = calcScrollPosition();
  const difference = targetScroll - visualPanelEl.scrollTop;
  const step = difference * 0.67;

  const t = currentScroll + step;
  visualPanelEl.scrollTo({
    top: t
  });
  window.requestAnimationFrame(syncVisualPanelScroll);
}

// Helper functions for scroll sync
function calcScrollPosition() {
  const positionBracket = calcPositionBracket();
  const scrollY = window.scrollY;
  const r = ((scrollY - positionBracket.copy.prev) / (positionBracket.copy.next - positionBracket.copy.prev));

  const visualsScrollTarget = Math.round(positionBracket.visual.prev + ((positionBracket.visual.next - positionBracket.visual.prev) * r));

  return visualsScrollTarget;
}

function calcPositionBracket() {
  const elPositions = getElPositionArrays();
  const scrollY = window.scrollY;
  let i;
  for (i = 0; elPositions.copy.length > i; i++) {
    if (elPositions.copy[i] >= scrollY) {
      break;
    }
  }

  const positionBracket = ({
    copy: ({
      prev: (i > 0 ? elPositions.copy[i - 1] : 0),
      next: elPositions.copy[i]
    }),
    visual: ({
      prev: (i > 0 ? elPositions.visual[i - 1] : 0),
      next: elPositions.visual[i]
    }),
  });

  return positionBracket;
}

function getElPositionArrays() {
  const visualPanelEl = document.querySelector('.visual-panel__inner');
  const copyEl = document.querySelector('.content__main .gs-container:not(.u-cf) .content__main-column');

  const winScrollY = window.scrollY;
  const halfWindowHeight = window.innerHeight / 2;

  let offsetsCopy = [...copyEl.querySelectorAll('.element-image, .element-interactive, .element-atom--media')].map(function (visEl) {
    return Math.round(visEl.getBoundingClientRect().top + winScrollY - halfWindowHeight);
  });
  offsetsCopy = addStartAndEndMarkers(offsetsCopy);

  let offsetsVisual = [...visualPanelEl.querySelectorAll('.element-image, .element-interactive, .element-atom--media')].map(function (visEl) {
    return visEl.offsetTop - halfWindowHeight;
  });
  offsetsVisual = addStartAndEndMarkers(offsetsVisual, true);


  return ({ visual: offsetsVisual, copy: offsetsCopy });
}


function addStartAndEndMarkers(markers, bump) {
  markers.unshift(-1);
  markers.push(markers[markers.length - 1] + window.innerHeight);
  if (bump) {
    // bump the last image up by 1/5 of a screen
    markers[markers.length - 2] = (markers[markers.length - 2] + (window.innerHeight / 5));
  }
  return markers;
}

// --- 4 --- Article-specific tweaks
function customTypography() {
  document.querySelectorAll('h2 + h2').forEach(function (el) {
    const firstChar = el.innerText.charAt(0);
    if (firstChar == '‘') {
      el.classList.add('hanging-quote');
    }
  })
}
