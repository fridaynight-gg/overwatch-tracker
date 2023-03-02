# Welcome to Overwatch Tracker!

The goal here is to be able to enter your games as you play and eventually be able to do interesting analysis on said games to get sick insights on your MMR and performance over time.

### Improvements

- ~~make it so that you can see all matches scoped by user account created~~
- ~~make it so that the date and timestamp are auto added~~
- ~~make sure the date is smart about timezone or whatever (auto-add should fix this)~~
- filter heroes played selection by role and alphabetical order
- show match history in time order
- able to adjust rank
- add what game you're on in your competitive set if match is in comp, on the 5th Win, show field for new rank
- Make it so that you can see all wins and losses for the season

### Bugs

- ~~fix not being able to submit control point maps~~

## TODO

- [x] add field for if attack or defense was played first to the match model
- [x] add field to the form to set which side was played first that only shows up if the map is not a control or push map
- [x] add multiple heroes per player per match from the list of heroes
- [x] add multiple players per match from the list of players
- [x] display qeuries dynamic so it can handle the variable number of players and heroes played by each player
- [x] add authentication
- [ ] style the app
- [x] deploy to fly.io
- [ ] import match history
