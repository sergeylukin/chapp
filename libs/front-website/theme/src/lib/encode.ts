// eslint-disable-next-line
// @ts-nocheck
const symbols = /[\r\n"%#()<>?[\\\]^`{|}]/g;

function addNameSpace(data) {
  if (data.indexOf('http://www.w3.org/2000/svg') < 0) {
    data = data.replace(/<svg/g, "<svg xmlns='http://www.w3.org/2000/svg'");
  }

  return data;
}

function encodeSVG(data) {
  // Use single quotes instead of double to avoid encoding.
  if (data.indexOf('"') >= 0) {
    data = data.replace(/"/g, "'");
  }

  data = data.replace(/>\s{1,}</g, '><');
  data = data.replace(/\s{2,}/g, ' ');

  return data.replace(symbols, encodeURIComponent);
}

export const encode = function (svg, fill) {
  if (fill) {
    svg = svg.replace(/<svg/g, `<svg fill="${fill}"`);
  }
  const namespaced = addNameSpace(svg);
  const dimensionsRemoved = namespaced
    .replace(/height="\w*" /g, '')
    .replace(/width="\w*" /g, '')
    .replace(/height='\w*' /g, '')
    .replace(/width='\w*' /g, '');
  const encoded = encodeSVG(dimensionsRemoved);

  const header = 'data:image/svg+xml,';
  const dataUrl = header + encoded;

  return `url("${dataUrl}")`;
};
