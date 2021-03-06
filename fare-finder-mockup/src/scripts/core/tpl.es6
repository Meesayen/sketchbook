/* global R */
/* global dust */

var
  doc = document,
  tmpDiv = doc.createElement('div');


export var renderString = (key, data) => {
  return new Promise((resolve, reject) => {
    if (window['dust']) {
      dust.render(key, data || {}, (err, tpl) => {
        if (err) {
          reject(err);
        } else {
          resolve(tpl);
        }
      });
    } else {
      resolve(R.templates[key](data || {}));
    }
  });
};

export var renderStringSync = (key, data) => {
  if (window['dust']) {
    console.warn('You must use the asynchronous method `renderString` to take' +
        ' advantage of Dust templates.');
    return '';
  }
  return R.templates[key](data || {});
};


export var render = (key, data, multi) => {
  var
    frag = doc.createDocumentFragment(),
    el;
  return new Promise((resolve, reject) => {
    new Promise((resolve, reject) => {
      renderString(key, data).then(resolve, reject);
    }).then(tpl => {
      tmpDiv.innerHTML = tpl;
      while ((el = tmpDiv.firstChild)) {
        frag.appendChild(el);
      }
      resolve(multi ? frag : (frag.firstChild || document.createElement('div')));
    }, err => {
      reject(err);
    });
  });
};

export var renderSync = (key, data, multi) => {
  var
    frag = doc.createDocumentFragment(),
    el;
  tmpDiv.innerHTML = renderStringSync(key, data);
  while ((el = tmpDiv.firstChild)) {
    frag.appendChild(el);
  }
  return multi ? frag : (frag.firstChild || document.createElement('div'));
};

export var get = (key) => {
  return R.templates[key];
};

export var renderContent = (key, data) => {
  return new Promise((resolve, reject) => {
    var contentFrag = document.createDocumentFragment();
    render(key, data).then(frag => {
      var el;
      while ((el = frag.firstChild)) {
        contentFrag.appendChild(el);
      }
      resolve(contentFrag);
    }).catch(reject);
  });
};
export var renderContentSync = (key, data) => {
  var
    frag = renderSync(key, data),
    contentFrag = document.createDocumentFragment(),
    el;
  while ((el = frag.firstChild)) {
    contentFrag.appendChild(el);
  }
  return contentFrag;
};

// Little trick until es6-module-transpiler would support the new syntax:
// import { * as moduleName } from './moduleName';
export default {
  render: render,
  renderSync: renderSync,
  renderString: renderString,
  renderStringSync: renderStringSync,
  renderContent: renderContent,
  renderContentSync: renderContentSync,
  get: get
};
