Travel to Calendar
---

A Chrome extension that adds travel tickets to Google Calendar from GitHub.

---

### Usage

"Travel to Calendar" works by reading the contents of a GitHub issue that
contains a markdown table that looks something like this:

    | Name | Start (MM/DD/YY) | End (MM/DD/YY) | Destination | Purpose of Travel|
    |---|---|---|---|---|
    | Some name | 11/15/15 | 11/20/15 | Washington, DC | Directions Sprint |


and creates a __Add tp Calendar__ link you can use to quickly add this table
of information into a Google Calendar event.

### Setup instructions

##### 1. Edit [`manifest.json`](https://github.com/mapbox/travel-to-calendar/blob/master/manifest.json)

Under _Matches_, enter the GitHub repo you want the "Add to calendar" feature.

##### 2. Specify the Calendar ID

Create an exectutable file called `env.sh` in the root of this project with the following content:

    export GOOGLE_CALENDAR_ID="XXXXXX" # The Calendar travel tickets should be added to

##### 3. Build the script

Create a `bundle.js` file by running:

    npm run build

##### 4. Create the Chrome extension

Details on getting started are here: https://developer.chrome.com/extensions/getstarted
