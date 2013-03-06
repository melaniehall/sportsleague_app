sportsleague_app
================

Instructions:

On load, you'll find an empty league.  Here are the steps to setup your league:

1) You'll notice the alert button in the sidebar which directs you to add more teams before you can begin the season.
2) Add at least 4 teams, up to a maximum of 8.
3) When you've reached 4 teams, the 'Begin Season' button will appear.  Click 'Begin Season'.
4) Once the 'Begin Season' button is clicked, the Schedules/Scores tab is populated with the schedule for the league that you've just setup.
5) Click on the Schedule/Scores tab. (If the number of teams in your league is odd, then one team will have a BYE per week)
6) To input each game's scores, click on the 'Update Scores' button.
7) From here, you can input scores for each game separately.  
8) Input a score for a game, and click 'Submit' to capture that game's scores.
9) When you are finished submitting your scores, click the 'Done Updating' button in the sidebar.  This will repopulate the schedule page with the updated scores that you entered.
10) Click on the 'Standings' tab to view the results from the captured scores.

Things that work from Phase 1:
-Bootstrap design
-min of 4/max of 8 teams
-adding teams (collect team info)
-save team object to server
-reveal team info upon clicking the individual team name in Standings table

Things that don't work from Phase 1:
-form validation

Things that work from Phase 2:
-utilized pre-defined schedule based on number of teams
-capturing scores
-updated standings with win/loss/percentage

Things that don't work from Phase 2:
-sorting standings
-our win/loss/% logic has a bug that doesn't always update certain wins/losses in the standings table.
