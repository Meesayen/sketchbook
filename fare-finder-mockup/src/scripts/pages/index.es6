import { toArray } from '../core/utils.es6';
import store from '../core/store.es6';
import tpl from '../core/tpl.es6';

import Orchestrator from '../core/orchestrator.es6';

var o = new Orchestrator();
o.run();

var handleArrows = key => {
  var s = document.querySelector('.popup .item.selected');
  switch(key) {
    case 37:
      if (s !== s.parentNode.querySelector('.item')) {
        s.classList.remove('selected');
        s.previousSibling.classList.add('selected');
      }
      break;
    case 38:
      break;
    case 39:
      var children = s.parentNode.querySelectorAll('.item');
      if (s !== children[children.length - 1]) {
        s.classList.remove('selected');
        s.nextSibling.classList.add('selected');
      }
      break;
    case 40:
      break;
  }
};

var filter = (text, items) => {
  var frag = document.createDocumentFragment();
  items.filter(i => {
    return i.name.toUpperCase().indexOf(text.toUpperCase()) === 0 ||
        i.code.toUpperCase().indexOf(text.toUpperCase()) === 0 ||
        i.country.toUpperCase().indexOf(text.toUpperCase()) === 0;
  }).forEach(i => {
    frag.appendChild(tpl.renderSync('destination-item', i));
  });
  return frag;
};

var handleInput = (i, h, data, e) => {
  if (e.which > 36 && e.which < 41) {
    console.log(e.which);
    e.preventDefault();
    handleArrows(e.which);
    return;
  }
  setTimeout(() => {
    h.textContent = i.value;
    var frag = filter(i.value, data.bestDestinations);
    var c = document.querySelector('.popup .content');
    c.innerHTML = '';
    c.appendChild(frag);
    c.firstChild.classList.add('selected');
  }, 0);
};

var btns = toArray(document.querySelectorAll('.button'));
btns.forEach(b => {
  b.__ctrl__.on('click', data => {
    var id = data.id;
    store.get(id).then(data => {
      tpl.render(`${id}-popup`, data).then(frag => {
        var p = document.querySelector('.popup');
        p.appendChild(frag);
        p.style.display = 'block';

        setTimeout(() => {
          p.classList.add('show');
          var pp = p.firstChild;
          pp.classList.add('open');
          setTimeout(() => {
            var i = pp.querySelector('input');
            var h = pp.querySelector('.hint');
            pp.classList.add('reveal');
            i.focus();
            i.addEventListener('keydown', handleInput.bind(this, i, h, data));
            pp.querySelector('.item').classList.add('selected');
            toArray(pp.querySelector('.content').childNodes).forEach(n => {
              if (n.nodeName === '#text') {
                n.parentNode.removeChild(n);
              }
            });
          }, 200);
        }, 0);
      }, err => {
        console.log(err);
      });
    });
  });
});
