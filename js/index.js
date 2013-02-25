$(document).ready(function(){
  // get from database
  //on load, populate table listTEams
  listTeams = function(){
    $.ajax({
      url: '/backliftapp/teams',
      type: "GET",
      dataType: 'json',
      success: function(data) {
        //Add to teams list table
        var table = $('#standings')
        table.html("")
        //loop (team)
          for(var i=0; i< data.length; i++){
        table.append('<tr><td>' + data[i].name + '</td><td>' + data[i].wins + '</td><td>' + data[i].losses + '</td><td>' + (data[i].wins)/(data[i].totalGames) + '</td></tr>')};
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


    function clearForm(){
      $('.team_inputs').each(function(){
        $(this).val('');
      });//end each
    };//end clearForm

    // $("#addteam").click(function(){
    //   var firstName= $("#inputFirst").val();
    //   $("table").append("<tr><td>" + firstName + "</td></tr>");
    //   $("#myModal").modal('hide');
    //   console.log("hello")
    // });

// Trying Serialize
// var teamList= [];
// $("#addteam").click(function(){
//   var team= $(":input").serializeArray();

//   jQuery.each(team, function(key, value){
//     alert(key.value + ": " + value.value);
//     // $("table").append("<tr><td>"+obj.value.value+"</td></tr>");
//   })
// $("#myModal").modal('hide');





// var Team= function(teamName, mgrFirst, mgrLast, phone, zip, sponsor){
//   this.teamName= teamName;
//   this.mgrFirst= mgrFirst;
//   this.mgrLast= mgrLast;
//   this.phone= phone;
//   this.zip= zip;
//   this.sponsor= sponsor;

// };



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




    }); //end ready