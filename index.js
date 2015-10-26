'use strict';

var GoogleApi = require('google-client-wrapper');
var g = new GoogleApi({
  apiKey: process.env.GOOGLE_API,
  calendar: process.env.GOOGLE_CALENDAR_ID,
  scope: 'https://www.googleapis.com/auth/calendar',
  client: process.env.GOOGLE_CLIENT_ID
});

function load() {
  var url = location.pathname.substring(1).split('/');

  // Bounce if this isnt a pull request.
  if (url[2] !== 'issues') return;

  // Bounce `.gh-header-actions` links do not exist.
  var actions = document.querySelector('.gh-header-actions');
  if (!actions) return;

  require('google-client-api')().then(function(gapi) {
    gapi.client.setApiKey(process.env.GOOGLE_APIKEY);

    // Parse the issue contents for the first table in the comment body
    // and push the outcome into a `travel` array.
    var travel = [];
    var comment = document.querySelector('.timeline-comment-wrapper');
    var travelTimeline = comment.querySelector('.comment-body table');

    // Bounce if a table does not exist.
    if (!travelTimeline) return;

    var travelTimelineContents = travelTimeline.querySelectorAll('tbody td');

    Array.prototype.forEach.call(travelTimelineContents, function(el) {
      travel.push(el.textContent);
    });

    var calendarEntry = {
      summary: '[' + travel[2] + '] ' + travel[3],
      start: { date: travel[0] },
      end: { date: travel[1] }
    };

    var action = document.getElementById('travel-to-calendar');
    if (!action) {
      var saveToAction = document.createElement('button');
      saveToAction.id = 'travel-to-calendar';
      saveToAction.textContent = 'Save to calendar';
      saveToAction.className = 'btn btn-sm';
      saveToAction.onClick = saveToCalendar();
      action = saveToAction.firstChild;
      actions.appendChild(saveToAction);
    }

    function saveToCalendar() {
      // Create a new Google cal event.
      g.calendarInsert(calendarEntry, function(err, res) {
        if (err) return window.alert(err);
        console.log('RES', res);
        return window.alert('Added to Calendar!');
      });
    }

  });
}

document.addEventListener('DOMSubtreeModified', load);
load();
