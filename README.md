Travel to Calendar
---

A Chrome extension that adds travel tickets to Google Calendar from GitHub.

### Usage

    |Start (MM/DD/YY)| End (MM/DD/YY) | Destination | Purpose of Travel|
    |---|---|---|---|
    | 11/15/15 | 11/20/15 | Washington, DC | Directions Sprint |


### Setup instructions

#### 1. Edit `manifest.json`

Under _Matches_, enter the GitHub repo you want the "Add to calendar" feature.

#### 2. Create a new Google project

To start, you'll need to create a new project from the [Google Developers Console](https://console.developers.google.com/project/). Add _API key_ & _client ID_ credentials after creating a project by selecting, __Add credentials__.

With these credentials create an exectutable file called `env.sh` in the root 
of this project add add the following lines.

    export GOOGLE_CLIENT_ID="XXXXXX"
    export GOOGLE_API="XXXXXX"
    export GOOGLE_CALENDAR_ID="XXXXXX" # The Calendar travel tickets should be inserted

#### 3. Build the script

Create a `bundle.js` file by running:

    npm run build
