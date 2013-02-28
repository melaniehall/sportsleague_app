$(document).ready(function(){
  // get from database
  //on load, populate table listTeams
  leagueData=[];

  listTeams = function(){
    $.ajax({
      url: '/backliftapp/teams',
      type: "GET",
      dataType: 'json',
      success: function(data) {
        leagueData = data;
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
        alert("errors")
      }
    })
  }



  
  saveTeam = function(team){
    $.ajax({
      url: '/backliftapp/teams',
      type: "POST",
      dataType: 'json',
      data: team,
      success: function(data) {
        leagueData.push(data);
        
        //Add to teams list table
        listTeams()
      }, 
      error: function(data){
        alert("errors");
      }
    })
  }//end saveTeam function


    //Empty Array for Storing Team Data
    // var teamList= [];
    
    //Object to store JSON data
    // var data = {
    //   name: $('#inputName').val(),
    //   mgrFirst: $('#inputFirst').val(),
    //   mgrLast: $('#inputLast').val(),
    //   phone: $('#phone').val(),
    //   zip: $('#zip').val(),
    //   sponsor: $('#sponsor').val(),
    //   wins: 0,
    //   losses: 0,
    //   totalGames: 0
    // };

    
    //Attempt to get these keys into my data Object
    // var Team= function(teamName, mgrFirst, mgrLast, phone, zip, sponsor){
    //   this.teamName= $('#inputName').val();
    //   this.mgrFirst= $('#inputFirst').val();
    //   this.mgrLast= $('#inputLast').val();
    //   this.phone= $('#phone').val();
    //   this.zip= $('#zip').val();
    //   this.sponsor= $('#sponsor').val();
    // };

    
    //LOOKED AT OBJECT CONSTRUCTOR
    // function dataObject(name, mgrFirst, mgrLast, phone, zip, sponsor, wins, losses, totalGames) {
    //   this.name = name;
    //   this.mgrFirst = mgrFirst;
    //   this.mgrLast = mgrLast;
    //   this.phone = phone;
    //   this.zip = zip;
    //   this.sponsor = sponsor;
    //   this.wins = wins;
    //   this.losses = losses;
    //   this.totalGames = totalGames;
    // }

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
      //Ajax post
      saveTeam(team);
      clearForm();   
    }); //end click 
    
    listTeams();


// *************Clear Form

    function clearForm(){
      $('.team_inputs').each(function(){
        $(this).val('');
      });//end each
    };//end clearForm





    }); //end ready