'use strict';

var moment = require('moment');

function load() {
  var url = location.pathname.substring(1).split('/');

  // Bounce if this isnt a pull request.
  if (url[2] !== 'issues') return;

  // Parse the issue contents for the first table in the comment body
  // and push the outcome into a `travel` array.
  var comment = document.querySelector('.timeline-comment-wrapper');
  if (!comment) return;

  var travelTimeline = comment.querySelector('.comment-body table');
  if (!travelTimeline) return; // Bounce if a table does not exist.

  // Sniff the table a little more to make sure this is a final travel ticket
  var travelHeader = travelTimeline.querySelectorAll('th');
  if (travelHeader.length < 5 && travelHeader[0].textContent.toLowerCase() !== 'name') return;

  // Add a new Column to the table with a headline
  var actionHeader = document.getElementById('travel-to-calendar-header');
  if (!actionHeader) {
    var travelTimeHeadline = travelTimeline.querySelector('thead tr');
    var th = document.createElement('th');
    th.textContent = 'Actions';
    th.id = 'travel-to-calendar-header';
    travelTimeHeadline.appendChild(th);
  }

  var travelTimelineRows = travelTimeline.querySelectorAll('tbody tr');
  Array.prototype.forEach.call(travelTimelineRows, function(row, i) {
    var travel = [];
    var contents = row.querySelectorAll('td');

    Array.prototype.forEach.call(contents, function(item) {
      travel.push(item.textContent);
    });

    var from = moment(travel[1], 'MM/DD/YY').format('YYYYMMDD');
    var to = moment(travel[2], 'MM/DD/YY').format('YYYYMMDD');

    // Compile the link based on results in the travel array.
    var href =  'https://calendar.google.com/calendar/render?';
        href += 'action=TEMPLATE';
        href += '&src=' + process.env.GOOGLE_CALENDAR_ID;
        href += '&text=' + encodeURIComponent(travel[0]) + ' in ' + encodeURIComponent(travel[3]);
        href += '&dates=' + from + 'T000000Z/' + to + 'T000000Z';
        href += '&details=' + encodeURIComponent(travel[4]);
        href += '&location=' + encodeURIComponent(travel[3]);

    var action = document.getElementById('travel-to-calendar-' + i);
    if (!action) {
      var saveToAction = document.createElement('a');
      saveToAction.id = 'travel-to-calendar-' + i;
      saveToAction.textContent = 'Add to calendar';
      saveToAction.className = 'btn btn-sm';
      saveToAction.target = '_blank';
      saveToAction.ref = 'nofollow';
      saveToAction.href = href;

      // Store a version so its not dupicated on refreshes
      action = saveToAction.firstChild;

      var td = document.createElement('td');
      td.appendChild(saveToAction);

      row.appendChild(td);
    }

  });
}

document.addEventListener('DOMSubtreeModified', load);
load();
