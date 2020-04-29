$(document).on('ready turbolinks:load', function(){
    
  var voidLiked = `<i class="far fa-grin-beam fa-2x" style="color:#D5D3D3"></i>`;
  var liked = `<i class="fas fa-grin-beam fa-2x"></i>`;
  var disliked = `<i class="fas fa-angry fa-2x"></i>`;
  var voidDisliked = `<i class="far fa-angry fa-2x" style="color:#D5D3D3"></i>`;
  
  var campaign_id = $(location).attr('href').split("/").pop();
  var like_id = 0;

  getVote();
  
  $("#liked").click(function(){
    var vote;
    if($("#liked").html() == liked){
      vote = false;
      $("#liked").html('').prepend(voidLiked);
      $("#disliked").html('').prepend(disliked);  
    }else{
      vote = true;
      $("#liked").html('').prepend(liked);
      $("#disliked").html('').prepend(voidDisliked);
    }
    sendVote(vote);
  });

  $("#disliked").click(function(){
      var vote;
      if($("#disliked").html() == disliked){
          vote = true;
          $("#liked").html('').prepend(liked);
          $("#disliked").html('').prepend(voidDisliked);       
      }else{
          vote = false;
          $("#liked").html('').prepend(voidLiked);
          $("#disliked").html('').prepend(disliked);
      }
      sendVote(vote);
  });

  function getVote(){
    // get like kind from campaign_id
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": window.location.href.split("campaign")[0]+"like/"+campaign_id,
      "method": "GET",
      "headers": {
        "cache-control": "no-cache"
      }
    }
      
    $.ajax(settings).done(function (response) {
      if(response.length == 0){
        $( "#liked" ).append( voidLiked );
        $( "#disliked" ).append( voidDisliked );
      }else{
        like_id = response[0].id
        if(response[0].kind){
          $("#liked").html('').prepend(liked);
          $("#disliked").html('').prepend(voidDisliked);
        }else{
          $("#disliked").html('').prepend(disliked);
          $( "#liked" ).append( voidLiked );
        }
      }
    });
  }

  function sendVote(vote){
    if(like_id == 0){
      createVote(vote);
    }else{
      updateVote(vote);
    } 
  }

  function createVote(vote){
    var data = JSON.stringify({"like": {"kind": vote,"campaign_id": parseInt(campaign_id)} });
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": window.location.href.split("campaign")[0]+"like",
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      },
      "processData": false,
      "data": data
    }

    $.ajax(settings).done(function (response) {
      if(response.kind == vote){
        like_id = response.id
        alert("Vote added!");
      }else{
        alert("Something went wrong!");
      }
    });    
  }

  function updateVote(vote){
    var data = JSON.stringify({"like": {"kind": vote} });
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": window.location.href.split("campaign")[0]+"like/"+like_id,
      "method": "PUT",
      "headers": {
          "cache-control": "no-cache",
          "Content-Type": "application/json"
      },
      "processData": false,
      "data": data
    }

    $.ajax(settings).done(function (response) {
      if(response.kind == vote){
        like_id = response.id
        alert("Updated vote!");
      }else{
        alert("Something went wrong!");
      }
    });    
  }

});