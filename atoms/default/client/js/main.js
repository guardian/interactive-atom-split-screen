addHeaderImage();
function addHeaderImage() {
  const headerEl = document.querySelector('header.content__head--interactive, .article .article__header');
  const headerFigureEl = document.querySelector('.element-image.element--immersive, .element-image.element--showcase');
  if (headerFigureEl) {
    const headerFigureSrc = headerFigureEl.querySelector('img').getAttribute('src');
    const srcHigh = higherResImg(headerFigureSrc);
    headerEl.style.backgroundImage = `url(${srcHigh})`;
    headerFigureEl.parentNode.removeChild(headerFigureEl);
    if (headerFigureEl.classList.contains('element--immersive')) {
      headerEl.classList.add('showcase-alt')
    }
  } else {
    let standfirst = document.querySelector('.content__standfirst p');
    if (standfirst) {
      standfirst.innerText = 'Pssst, add an immersive/showcase image at the top of the article, so it can be used as a header photo! Immersive for white text, showcase for black';
    }
  }

}

function higherResImg(srcLow) {
  let srcArray = srcLow.split('/')
  srcArray.pop();
  srcArray.push('2000.jpg');
  let srcHigh = srcArray.join('/')
  return srcHigh;
}


var el = document.createElement('script');
el.src = '<%= atomPath %>/app.js';
document.body.appendChild(el);


setTimeout(() => {
  if (window.resize) {
    const html = document.querySelector('html')
    const body = document.querySelector('body')

    html.style.overflow = 'hidden'
    html.style.margin = '0px'
    html.style.padding = '0px'

    body.style.overflow = 'hidden'
    body.style.margin = '0px'
    body.style.padding = '0px'

    window.resize()
  }
}, 100)

