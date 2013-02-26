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
        var table = $('#standings')
        table.html("")
        //loop (team)
          for(var i=0; i< data.length; i++){
        table.append('<tr><td>' + data[i].name + '</td><td>' + data[i].wins + '</td><td>' + data[i].losses + '</td><td>' + (data[i].wins)/(data[i].totalGames) + '</td></tr>')};
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
    
  //Repopulate team list in table after click
  listTeams();

  //clear Form function
  function clearForm(){
    $('.team_inputs').each(function(){
      $(this).val('');
    });//end each
  };//end clearForm



}); //end ready
   
// Trying Serialize
// var teamList= [];
// $("#addteam").click(function(){
//   var team= $(":input").serializeArray();

//   jQuery.each(team, function(key, value){
//     alert(key.value + ": " + value.value);
//     // $("table").append("<tr><td>"+obj.value.value+"</td></tr>");
//   })
// $("#myModal").modal('hide');





// $("#addteam").click(function(){
// var participant= new Team ($("#inputName").val(), $("#inputFirst").val(), $("#inputLast").val(), $("#phone").val(), $("#zip").val(), $("#sponsor").val());
//   console.log(participant);

//   $("#myModal").modal('hide');
   
//   teamList.push(participant);

//   $("table").empty();
  
//   jQuery.each(teamList, function(index, value){
//     $("table").append("<tr><td>" + value.teamName + "</td><td> 0 </td> <td> 0 </td> <td>.000</td> </tr>" );
//     $("table").append("<p>" + value.mgrFirst + " " + value.mgrLast + "<br/>" + value.phone +"<br/>" + value.sponsor + "</p>");
//   }); //end jQuery.each  

//   console.log(teamList);

//   $("#form")[0].reset(); 

//  }); //end click