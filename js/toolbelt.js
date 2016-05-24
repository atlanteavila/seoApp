var toolbelt = {};

toolbelt.getGoogleSpeedJson = function(url){
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  document.getElementById('loading').innerHTML = 'Loading Google Page Speed Data.'
  document.getElementById('loading').style.display = 'block';
  var data;
  request.onload = function(){
    if(request.status >= 200 && request.status < 400){
      //success
      data = JSON.parse(request.responseText);
      toolbelt.googleSpeedData = data;
      document.getElementById('loading').style.display = 'none'
      document.getElementById('googleSpeed').style.display = 'block'      
      document.getElementById('speed').innerHTML = toolbelt.googleSpeedData.ruleGroups.SPEED.score;
      return data;
    }else{
      //we reached our target, but encountered an error;
      console.log("there was an error!");
    }
  };

  request.onerror = function(){
    //there was a connection error of some sort.
  };
  request.send();
}
