$(document).ready(function(){
  
//******************* global var to store team data ****************************************

  leagueData = [];
  var homeTeam, awayTeam, week, game;


//******************* on load, populate table listTeams from Database **********************


  listTeams = function(){
    $.ajax({
      url: '/backliftapp/teams',
      type: "GET",
      dataType: 'json',
      success: function(data) {
        leagueData = data;


        disableBtn(data);
        //Add to teams list table

        var table = $('#standingsTable')
        table.html("")

        //loop (team)
        for(var i=0; i< data.length; i++){

          table.append('<tr><td><a>' + data[i].name + '</a><p class="moreinfo">Manager: '+ data[i].mgrFirst + ' '+ data[i].mgrLast + '  |  Phone: '+ data[i].phone + '<br/> Sponsored by: ' + data[i].sponsor + '</p></td><td>' + data[i].wins + '</td><td>' + data[i].losses + '</td><td>' + ((+data[i].wins)/(+data[i].totalGames)).toFixed(3) + '</td></tr>')

        };//end for loop

        $(".moreinfo").hide()
        $("td a").click(function(){
          $(this).next(".moreinfo").toggle();
        });
      },

      error: function(data){
        alert("Error, please try submitting your team again.")
      }
    })
  }

//******************** function to run when team is added by click *************************

  saveTeam = function(team){
    $.ajax({
      url: '/backliftapp/teams',
      type: "POST",
      dataType: 'json',
      data: team,
      success: function(data) {
        leagueData.push(data);

        //Add to teams list table
        listTeams();
        disableBtn(data);
      }, 
      error: function(data){
        alert("errors");
      }
    })
  }//end saveTeam function

//******************* disable button once 8 team max is reached ***************************

  function disableBtn(listTeams){
    if (listTeams.length < 4) {

      $('#addBtn').html('<a href="#myModal" role="button" class="btn btn-warning" data-toggle="modal">Sign Up Today! We need more teams start the season.</a> <br><br>')
      $('#beginSeason').hide();
    }

    else if (listTeams.length === 8) {

      $('#addBtn').html('<a class="btn btn-danger disabled">Our league is at full capacity</a><br><br>')
    }

    else {

      $('#addBtn').html('<a href="#myModal" role="button" class="btn" data-toggle="modal">Add Your Team</a><br><br>')
      $('#beginSeason').show();
    }
  };//end disableBtn

//******************** Add a Team Form Click **********************************************

  $('#addteam').click(function(){

    var team = {
      "name": $('#inputName').val(),
      "mgrFirst": $('#inputFirst').val(),
      "mgrLast": $('#inputLast').val(),
      "phone": $('#phone').val(),
      "zip": $('#zip').val(),
      "sponsor": $('#sponsor').val(),
      "wins": 0,
      "losses": 0,
      "totalGames": 0,
      "week1": 0,
      "week2": 0,
      "week3": 0,
      "week4": 0,
      "week5": 0,
      "week6": 0,
      "week7": 0
    };
    //Ajax post request
    saveTeam(team);
    clearForm();
    

    
  }); //end click 
    
//****************** Repopulate team list in table after click ****************************

  listTeams();

//****************** Begin Season Click / Populate Schedule *******************************

$('#beginSeason').click(function(){

  //remove Add Team button
  $("#addBtn").remove();

  //Ajax GET to populate schedule
  $.ajax({
      url: '/backliftapp/teams',
      type: "GET",
      dataType: 'json',
      success: function(data) {
      leagueData = data;
      populateSchedule(data);
     } 
  });//end Ajax

});//end Begin Season click

  // defined s variable for schedule
  var s;

    //pre-defined schedules
    var sched4 = [ 
    [ [1, 4], [2, 3] ],
    [ [1, 3], [2, 4] ],
    [ [1, 2], [3, 4] ]
    ];

    var sched6 = [ 
    [ [1, 6], [2, 5], [3, 4] ],
    [ [1, 5], [4, 6], [2, 3] ],
    [ [1, 4], [3, 5], [2, 6] ],
    [ [1, 3], [2, 4], [5, 6] ],
    [ [1, 2], [3, 6], [4, 5] ],
    ];

    var sched8 = [
    [ [1, 8], [2, 7], [3, 6], [4, 5] ],
    [ [1, 7], [6, 8], [2, 5], [3, 4] ],
    [ [1, 6], [5, 7], [4, 8], [2, 3] ],
    [ [1, 5], [4, 6], [3, 7], [2, 8] ],
    [ [1, 4], [3, 5], [2, 6], [7, 8] ],
    [ [1, 3], [2, 4], [5, 8], [6, 7] ],
    [ [1, 2], [3, 8], [4, 7], [5, 6] ],
    ];

function populateSchedule (d) {

      // Remove Begin Season Button / Add Update Scores Button
      $('#beginSeason').remove();
      $('.sidebar-nav').append('<a href="#updatescore" class="btn" id="updatescore">Update Scores</a>');

      // Determine the schedule based on amount of teams playing
      if (d.length === 4) {
        s = sched4;
      }

      else if (d.length === 5 || d.length === 6) {
        s = sched6;
      }

      else{
        s = sched8;
      }

      //d-leagueData s-schedule w-weeks g-games 
      for (w = 0 ; w < s.length ; w++) {
        if (d.length%2 === 0){
              $('#scheduleTable').append("<tbody id='week" + w + "'class='tablehead'><tr><th>Week " + [w + 1] + "</th><th>Score" + "</th></tr></tbody>");
              
              for (g = 0 ; g < s[w].length; g++) {
                awayTeam = d[s[w][g][0]-1]
                homeTeam = d[s[w][g][1]-1]

                if (w === 0) {
                  awayScore = awayTeam.week1;
                  homeScore = homeTeam.week1;
                }

                else if (w === 1) {
                  awayScore = awayTeam.week2;
                  homeScore = homeTeam.week2;
                }

                else if (w === 2) {
                  awayScore = awayTeam.week3;
                  homeScore = homeTeam.week3;
                }

                else if (w === 3) {
                  awayScore = awayTeam.week4;
                  homeScore = homeTeam.week4;
                }

                else if (w === 4) {
                  awayScore = awayTeam.week5;
                  homeScore = homeTeam.week5;
                }

                else if (w === 5) {
                  awayScore = awayTeam.week6;
                  homeScore = homeTeam.week6;
                }

                else if (w === 6) {
                  awayScore = awayTeam.week7;
                  homeScore = homeTeam.week7;
                };

                // fill variables with values from the leagueData[].teamName (for both teams)
                $("#week" + w).append("<tr><td>" + awayTeam.name + " vs. " + homeTeam.name + "</td><td class='score' data-week=" + w + " data-game= " + g + ">"+ awayScore + "-" + homeScore + "</td></tr>")

            }//end games loop

      } //end if statement for EVEN NUMBERS


        else {  // BYE week team determined
          var teamwithBye = d[s[w][0][1]-2].name
          $('#scheduleTable').append("<tbody id='week" + w + "'class='tablehead'><tr><th>Week " + [w + 1] + "<br/>" +teamwithBye + " have a Bye</th><th>Score" + "</th></tr></tbody>")

          for (g = 1 ; g < s[w].length; g++) {

            awayTeam = d[s[w][g][0]-2];
            homeTeam = d[s[w][g][1]-2];
          
            if (w === 0) {
                  awayScore = awayTeam.week1;
                  homeScore = homeTeam.week1;
                }

            else if (w === 1) {
              awayScore = awayTeam.week2;
              homeScore = homeTeam.week2;
            }

            else if (w === 2) {
              awayScore = awayTeam.week3;
              homeScore = homeTeam.week3;
            }

            else if (w === 3) {
              awayScore = awayTeam.week4;
              homeScore = homeTeam.week4;
            }

            else if (w === 4) {
              awayScore = awayTeam.week5;
              homeScore = homeTeam.week5;
            }

            else if (w === 5) {
              awayScore = awayTeam.week6;
              homeScore = homeTeam.week6;
            }

            else if (w === 6) {
              awayScore = awayTeam.week7;
              homeScore = homeTeam.week7;
            };

            // fill variables with values from the leagueData[].teamName (for both teams)    
            $("#week" + w).append("<tr><td>" + awayTeam.name + " vs. " + homeTeam.name + "</td><td class='score' data-week=" + w + " data-game= " + g + ">"+ awayScore + "-" + homeScore + "</td></tr>")

          }//end games loop

        } // end ELSE loop for BYE WEEKS 

      }// end FOR week loop

      // Click Event for Update Scores Button
      $('#updatescore').click(function(){

        // Replace Update Scores Button with the alerted Done Updating button
        $('#updatescore').replaceWith('<a href="#doneupdating" class="btn btn-danger" id="doneupdating">Done Updating</a>')

        // Inject input boxes and a submit button for scores
        $('.score').html("<input type='text' class='away' id='input1' size='1' />" + "-" + "<input class='home' type='text' id='input2' size= '1' />" + "<a class='submit btn btn-danger'>Submit</a>");

            // Submit Button for each game's input pairs
            $('.submit').click(function(){

                // create a unique week+game for each submit button
                week = $(this).parent().attr("data-week");
                game = $(this).parent().attr("data-game");
                
                // even team schedule
                if (leagueData.length % 2 === 0) {
                    awayTeam = leagueData[s[week][game][0]-1];
                    homeTeam = leagueData[s[week][game][1]-1];
                }

                else { // odd team schedule
                    awayTeam = leagueData[s[week][game][0]-2];
                    homeTeam = leagueData[s[week][game][1]-2];
                };

                // set score variables for the inputs associated with the submit button
                awayScore = $(this).prevAll("input[class='away']").val();
                homeScore = $(this).prevAll("input[class='home']").val();



                // call function to send all game data to server
                recordScore(homeTeam, awayTeam, homeScore, awayScore, week);

                //pair the week with the score + team
                if (week === 0) {
                  awayScore = awayTeam.week1;
                  homeScore = homeTeam.week1;
                }

                else if (week === 1) {
                  awayScore = awayTeam.week2;
                  homeScore = homeTeam.week2;
                }

                else if (week === 2) {
                  awayScore = awayTeam.week3;
                  homeScore = homeTeam.week3;
                }

                else if (week === 3) {
                  awayScore = awayTeam.week4;
                  homeScore = homeTeam.week4;
                }

                else if (week === 4) {
                  awayScore = awayTeam.week5;
                  homeScore = homeTeam.week5;
                }

                else if (week === 5) {
                  awayScore = awayTeam.week6;
                  homeScore = homeTeam.week6;
                }

                else if (week === 6) {
                  awayScore = awayTeam.week7;
                  homeScore = homeTeam.week7;
                }; 

                // Copied Final Scores into schedule table

                $(this).parent().html(awayScore + " - " + homeScore);

                // Adding Wins + Losses + WinPercentage to Standings Table

                //if away team wins, increment their wins and the home team's losses on the server
                if ( +awayScore > +homeScore) {

                var wins = +awayTeam.wins + 1 ;
                var losses = +homeTeam.losses + 1 ;
                var awaytotalGames = +awayTeam.totalGames + 1 ;
                var hometotalGames = +homeTeam.totalGames + 1 ;

                //add to away team on server
                $.ajax({
                  url: '/backliftapp/teams/' + awayTeam.id + '',
                  type: "PUT",
                  dataType: "JSON", 
                  data: {
                    wins: wins,
                    totalGames: awaytotalGames},
                  success: function(data){
                    listTeams();
                    console.log(data);
                  }
                });//end PUT

                //add to home team on server
                $.ajax({
                  url: '/backliftapp/teams/' + homeTeam.id + '',
                  type: "PUT",
                  dataType: "JSON", 
                  data: {
                    losses: losses,
                    totalGames: hometotalGames},
                  success: function(data){
                    listTeams();
                    console.log(data);
                  }
                });// end PUT

                }

                //if home team wins, increment their wins and the away team's losses on the server
                else if ( +homeScore > +awayScore ) {
                  var wins = +homeTeam.wins + 1 ;
                  var losses = +awayTeam.losses + 1 ;
                  var hometotalGames = +homeTeam.totalGames + 1 ;
                  var awaytotalGames = +awayTeam.totalGames + 1 ;

                //add to home team on server
                $.ajax({
                  url: '/backliftapp/teams/' + homeTeam.id + '',
                  type: "PUT",
                  dataType: "JSON", 
                  data: {
                    wins: wins,
                    totalGames: hometotalGames},
                  success: function(data){
                    listTeams();
                    
                    console.log(data);
                  }
                });//end PUT

                //add to away team on server
                $.ajax({
                  url: '/backliftapp/teams/' + awayTeam.id + '',
                  type: "PUT",
                  dataType: "JSON", 
                  data: {
                    losses: losses,
                    totalGames: awaytotalGames},
                  success: function(data){
                    listTeams();
                    
                    console.log(data);
                  }
                });// end PUT
              }//end Else


        }); //end Submit CLick    
        

          // Click event for Done Updating Button
          $('#doneupdating').click(function(){
            $("#scheduleTable").html("");
              $.ajax({
                  url: '/backliftapp/teams',
                  type: "GET",
                  dataType: 'json',
                  success: function(data) {
                  leagueData = data;
                  populateSchedule(data);
                 } 
              });//end Ajax

              $(this).remove();
          });// end Done Updating Click

    }); //end UpdateScore Click

}// end populate


//**************** Storing scores to the team object, based on which week the game is played **********************
function recordScore(homeTeam, awayTeam, homeScore, awayScore, week){

  //enusre that week variable is a number
  week = Number(week);

  //week indexed starting at 0
  if (week === 0) {
    $.ajax({
      url: '/backliftapp/teams/' + homeTeam.id + '',
      type: "PUT",
      dataType: "JSON", 
      data: {
        week1: homeScore},
      success: function(data){
        console.log(data);
      }
    });

    $.ajax({
      url: '/backliftapp/teams/' + awayTeam.id + '',
      type: "PUT",
      dataType: "JSON", 
      data: {
        week1: awayScore},
      success: function(data){
        console.log(data);
      }
    });
  }//end week 1

  else if (week === 1) {
    $.ajax({
      url: '/backliftapp/teams/' + homeTeam.id + '',
      type: "PUT",
      dataType: "JSON", 
      data: {
        week2: homeScore},
      success: function(data){
        // alert(homeScore);
        console.log(data);
      }
      });

    $.ajax({
      url: '/backliftapp/teams/' + awayTeam.id + '',
      type: "PUT",
      dataType: "JSON", 
      data: {
        week2: awayScore},
      success: function(data){
        // alert(awayScore);
        console.log(data);
      }
      });
  }//end week 2

  else if (week === 2) {
      $.ajax({
      url: '/backliftapp/teams/' + homeTeam.id + '',
      type: "PUT",
      dataType: "JSON", 
      data: {
        week3: homeScore},
      success: function(data){
        // alert(homeScore);
        console.log(data);
      }
      });

    $.ajax({
      url: '/backliftapp/teams/' + awayTeam.id + '',
      type: "PUT",
      dataType: "JSON", 
      data: {
        week3: awayScore},
      success: function(data){
        // alert(awayScore);
        console.log(data);
      }
      });
  }//end week 3

  else if (week === 3) {
    $.ajax({
      url: '/backliftapp/teams/' + homeTeam.id + '',
      type: "PUT",
      dataType: "JSON", 
      data: {
        week4: homeScore},
      success: function(data){
        // alert(homeScore);
        console.log(data);
      }
    });

    $.ajax({
      url: '/backliftapp/teams/' + awayTeam.id + '',
      type: "PUT",
      dataType: "JSON", 
      data: {
        week4: awayScore},
      success: function(data){
        // alert(awayScore);
        console.log(data);
      }
    });
  }//end week 4

  else if (week === 4) {
    $.ajax({
      url: '/backliftapp/teams/' + homeTeam.id + '',
      type: "PUT",
      dataType: "JSON", 
      data: {
        week5: homeScore},
      success: function(data){
        // alert(homeScore);
        console.log(data);
      }
    });

    $.ajax({
      url: '/backliftapp/teams/' + awayTeam.id + '',
      type: "PUT",
      dataType: "JSON", 
      data: {
        week5: awayScore},
      success: function(data){
        // alert(awayScore);
        console.log(data);
      }
    });
  }//end week 5

  else if (week === 5) {
    $.ajax({
      url: '/backliftapp/teams/' + homeTeam.id + '',
      type: "PUT",
      dataType: "JSON", 
      data: {
        week6: homeScore},
      success: function(data){
        // alert(homeScore);
        console.log(data);
      }
    });

    $.ajax({
      url: '/backliftapp/teams/' + awayTeam.id + '',
      type: "PUT",
      dataType: "JSON", 
      data: {
        week6: awayScore},
      success: function(data){
        // alert(awayScore);
        console.log(data);
      }
    });
  }//end week 6

  else if (week === 6) {
    $.ajax({
      url: '/backliftapp/teams/' + homeTeam.id + '',
      type: "PUT",
      dataType: "JSON", 
      data: {
        week7: homeScore},
      success: function(data){
        console.log(data);
      }
    });

    $.ajax({
      url: '/backliftapp/teams/' + awayTeam.id + '',
      type: "PUT",
      dataType: "JSON", 
      data: {
        week7: awayScore},
      success: function(data){
        console.log(data);
      }
    });
  }//end week 7
  
  else {
    alert("error!");
  }

};// end recordScore Function

//**************** Clear Form Function for Modal *****************************************************

  function clearForm(){
    $('.team_inputs').each(function(){
      $(this).val('');
    });//end each
  };//end clearForm

//**************** Delete Entries Manually *****************************************************

//If you need to remove a team from the collection, input this code into the console. Replace [index#] with the team's index
// $.get("/backliftapp/teams", function(data) {  $.ajax({type:"delete", url:"/backliftapp/teams/"+data[index#]._id}); } );

//If you need to reomve the entire team collection, input this code into the console.
// $.get("/backliftapp/teams", function(data) { for (var i=0; i<data.length; i++) { $.ajax({type:"delete", url:"/backliftapp/teams/"+data[i]._id}); }}); 

//**************** THE END *****************************************************************
}); //end ready

