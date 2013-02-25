$(document).ready(function(){
  // get from database
  $.ajax({
    url: 'backliftapp/teams',
    type: "GET",
    dataType: 'json',
    data: 

  })
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

    //Variables to initialize wins/losses/percent columns. Plan to update numbers down the road
    // var wins = 0;
    // var losses = 0;
    // var totalGames = 0;
    // var winPercent = ((+wins)/(+totalGames));
    // var winPercent = .000;
    
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


    var teamData = [];
    

    $('#addteam').click(function(){
      var team_array=[];
      $('.team_inputs').each(function(){
        team_array.push($(this).val());
      });//end each
      
      // data.push(team_array);
      // printTeam(teamData);
      clearForm();
      
      var data = {
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
      
      // teamData = JSON.stringify(data);
      // console.log(teamData);

    }); //end click 

    // Function to Print the team name. Doesn't work yet
    // function printTeam(teamData){
    //   $('#standings').append('<tr><td>' + data.name + '<td>' + '0' + '<td>' + teamData.losses + '<td>' + (((teamData.wins)/(teamData.totalGames)).toFixed(3)) + '</td></tr>');
    // };

// data.totalGames/winPercent.toFixed(3)

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