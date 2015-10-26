'use strict';

var moment = require('moment');

function load() {
  var url = location.pathname.substring(1).split('/');

  // Bounce if this isnt a pull request.
  if (url[2] !== 'issues') return;

  // Bounce `.gh-header-actions` links do not exist.
  var actions = document.querySelector('.gh-header-actions');
  if (!actions) return;

  // Parse the issue contents for the first table in the comment body
  // and push the outcome into a `travel` array.
  var travel = [];
  var comment = document.querySelector('.timeline-comment-wrapper');
  var travelTimeline = comment.querySelector('.comment-body table');
  if (!travelTimeline) return; // Bounce if a table does not exist.
  var travelTimelineContents = travelTimeline.querySelectorAll('tbody td');
  Array.prototype.forEach.call(travelTimelineContents, function(el) {
    travel.push(el.textContent);
  });

  var from = moment(travel[1]).format('YYYYMMDD');
  var to = moment(travel[2]).format('YYYYMMDD');

  // Compile the link based on results in the travel array.
  var href =  'https://calendar.google.com/calendar/render?';
      href += 'action=TEMPLATE';
      href += '&src=' + process.env.GOOGLE_CALENDAR_ID;
      href += '&text=' + encodeURIComponent(travel[0]) + ' in ' + encodeURIComponent(travel[3]);
      href += '&dates=' + from + '/' + to;
      href += '&details=' + encodeURIComponent(travel[4]);
      href += '&location=' + encodeURIComponent(travel[3]);

  var action = document.getElementById('travel-to-calendar');
  if (!action) {
    var saveToAction = document.createElement('a');
    saveToAction.id = 'travel-to-calendar';
    saveToAction.textContent = 'Add to calendar';
    saveToAction.className = 'btn btn-sm';
    saveToAction.target = '_blank';
    saveToAction.ref = 'nofollow';
    saveToAction.href = href;

    action = saveToAction.firstChild;
    actions.appendChild(saveToAction);
  }
}

document.addEventListener('DOMSubtreeModified', load);
load();
