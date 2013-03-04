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
    } else if (listTeams.length === 8) {
      $('#addBtn').html('<a class="btn btn-danger disabled">Our league is at full capacity</a><br><br>')
    } else {
      $('#addBtn').html('<a href="#myModal" role="button" class="btn" data-toggle="modal">Add Your Team</a><br><br>')
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
    };
    //Ajax post request
    saveTeam(team);
    clearForm();
    

    
  }); //end click 
    
//****************** Repopulate team list in table after click ****************************

  listTeams();

//****************** Begin Season Click / Populate Schedule *******************************

$('#beginSeason').click(function(){
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

  var s;

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
 

      if (d.length === 4) {
        s = sched4;
      } else if (d.length === 5 || d.length === 6) {
        s = sched6;
      } else{
        s = sched8;
      }

      //d-leagueData s-schedule w-weeks g-games 
      for (w = 0 ; w < s.length ; w++) {
        if (d.length%2 === 0){
              $('#scheduleTable').append("<tbody id='week" + w + "'class='tablehead'><tr><th>Week " + [w + 1] + "</th><th>Score" + "</th><th class='enterscore hidden-btn'>Update</th></tr></tbody>");
              
              for (g = 0 ; g < s[w].length; g++) {
                awayTeam = d[s[w][g][0]-1].name 
                homeTeam = d[s[w][g][1]-1].name
                awayScore = 0;
                homeScore = 0;

                $("#week" + w).append("<tr><td>" + awayTeam + " vs. " + homeTeam + "</td><td data-week=" + w + " data-game= " + g + ">"+ awayScore + "-" + homeScore + "</td><td class='enterscore  hidden-btn'><a class='btn enterscore-btn'>Enter Score</a></td></tr>")
                

                // fill variables with values from the leagueArray[].teamName (for both teams)
                // starting values for scores

              }//end games loop



        } //end if statement for EVEN NUMBERS


 else{
      var teamwithBye = d[s[w][0][1]-2].name
      $('#scheduleTable').append("<tbody id='week" + w + "'class='tablehead'><tr><th>Week " + [w + 1] + "<br/>" +teamwithBye + " have a Bye</th><th>Score" + "</th><th class='enterscore hidden-btn'>Update</th></tr></tbody>")

      for (g = 1 ; g < s[w].length; g++) {

      awayTeam = d[s[w][g][0]-2].name 
      homeTeam = d[s[w][g][1]-2].name
      awayScore = 0;
      homeScore = 0;     
      $("#week" + w).append("<tr><td>" + awayTeam + " vs. " + homeTeam + "</td><td data-week=" + w + " data-game= " + g + ">"+ awayScore + "-" + homeScore + "</td><td class='enterscore  hidden-btn'><a class='btn enterscore-btn'>Enter Score</a></td></tr>")



    }//end games loop


} // end ELSE loop for BYE WEEKS 

  }// end week loop

}// end populate

//****************** Update Scores Click ****************************

$('#updatescore').click(function(){

$('.enterscore').removeClass('hidden-btn');
$('#updatescore').hide()
$('.enterscore a').addClass('btn-danger')
$('#schedule p').append('<br/><a id="doneupdating" class="btn btn-danger">Done Updating</a>');


    $('.enterscore').click(function(){
        week = $(this).prev().attr("data-week");
        game = $(this).prev().attr("data-game");
        awayTeam = leagueData[s[week][game][0]-2]; 
        homeTeam = leagueData[s[week][game][1]-2];
        awayScore = $("input1").val();
        homeScore = $("input2").val();

        $(this).prev().html("<input type='text' id='input1' size='1' />" + " - " + "<input type='text' id='input2' size= '1' />");

        $(this).contents().remove()
        $(this).append('<a id="doneupdating-submit" class="submit btn btn-danger">Submit</a>');
        $(this).removeClass('enterscore')
    
      // $(this).prev().html("<input id="$()" type='text'></input");
        $('.submit').click(function(){
          $(this).removeClass('btn-danger');
          $(this).remove();
          // $(this).prev().removeClass('.enterscore');
          // alert($('#input1').val());
          alert(week + "," + game + "," + awayTeam.name);

          

          recordScore(homeTeam, awayTeam, homeScore, awayScore, week)  
        }); //end Submit Click

          //Done Updating On Click
                    // $('#doneupdating-submit').click(function(){
                    // alert('Hello')
                    // // $('.enterscore').show();
                    // // $('#doneupdating').hide();
                    // // $('updateScores').show();
                    // };

          }); //end Enter Score Click




  // $.ajax({
  //     url: '/backliftapp/teams',
  //     type: "POST",
  //     dataType: 'json',
  //     success: function(data) {
  //     scoreData = data;
  //     updateScores(data);
  //    } 
  // });//end Ajax



}); //end Begin Season click

//**************** Clear Form Function *****************************************************
function recordScore(homeTeam, awayTeam, homeScore, awayScore, week){

$.ajax({
  url: '/backliftapp/teams/' + homeTeam.id + '',
  type: "PUT",
  dataType: "JSON", 
  data: {
    week1score: homeScore
  },
  success: function(data){
    alert('success');
  }
});



};

//**************** Clear Form Function *****************************************************

  function clearForm(){
    $('.team_inputs').each(function(){
      $(this).val('');
    });//end each
  };//end clearForm

//**************** Delete One Entry at a Time *****************************************************

// $.get("/backliftapp/teams", function(data) {  $.ajax({type:"delete", url:"/backliftapp/teams/"+data[index#]._id}); } );

//**************** THE END *****************************************************************
}); //end ready

