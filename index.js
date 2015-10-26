'use strict';

redraw();
document.addEventListener('DOMSubtreeModified', redraw);

function redraw() {
  var url = location.pathname.substring(1).split('/');

  // Bounce if this isnt a pull request.
  if (url[2] !== 'issues') return;

  // TODO Parse the contents of the body to find the
  // formated HTML table.

  // Bounce `.gh-header-actions` links do not exist.
  var actions = document.querySelector('.gh-header-actions');
  if (!actions) return;

  var action = document.getElementById('travel-to-calendar');
  if (!action) {
    var saveToAction = document.createElement('button');
    saveToAction.id = 'travel-to-calendar';
    saveToAction.textContent = 'Save to calendar';
    saveToAction.className = 'btn btn-sm';
    action = saveToAction.firstChild;
    actions.appendChild(saveToAction);
  }
}
