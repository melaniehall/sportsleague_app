$(document).ready(function(){
  
  //global var to store team data
  leagueData = [];
  // get from database
  //on load, populate table listTeams

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
        table.append('<tr><td><a>' + data[i].name + '</a><p class="moreinfo">Manager: '+ data[i].mgrFirst + ' '+ data[i].mgrLast + '  |  Phone: '+ data[i].phone + '<br/> Sponsored by: ' + data[i].sponsor + '</p></td><td>' + data[i].wins + '</td><td>' + data[i].losses + '</td><td>' + (data[i].wins)/(data[i].totalGames) + '</td></tr>')};
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



  

  //function to run when team is added by .click
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

  //disable button once 8 team max is reached
  function disableBtn(listTeams){
    if (listTeams.length < 4) {
      $('#addBtn').html('<a href="#myModal" role="button" class="btn btn-warning" data-toggle="modal">Sign Up Today! We need more teams start the season.</a> <br><br>')
    } else if (listTeams.length === 8) {
      $('#addBtn').html('<a class="btn btn-danger disabled">Our league is at full capacity</a><br><br>')
    } else {
      $('#addBtn').html('<a href="#myModal" role="button" class="btn" data-toggle="modal">Add Your Team</a><br><br>')
    }
  };//end disableBtn


  // Add a Team Form Click
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
    "totalGames": 0
    };
    //Ajax post request
    saveTeam(team);
    clearForm();
    

    
  }); //end click 
    
<<<<<<< HEAD
  //Repopulate team list in table after click
  listTeams();

function populateSchedule (d) {
  if (d.length === 4) {
    var s = sched4
  } else if (d.length < 7) {
    var s = sched6
  } else {
    var s = sched8
  }

//iterate over our leagueData object //d-leagueData s-schedule w-weeks g-games 
for (w = 0 ; w < s.length ; w++)
  $('#scheduleTable')



}



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

  //clear Form function
  function clearForm(){
    $('.team_inputs').each(function(){
      $(this).val('');
    });//end each
  };//end clearForm



}); //end ready

