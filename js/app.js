var seoApp = {};

seoApp.setURL = function(){
  seoApp.WORKING_URL = document.getElementsByName("url")[0].value
}

seoApp.getGoogleSpeedJson = function(){
  var API_KEY = 'AIzaSyDIAAI-RORQI_gs8udnOv_Y2gdjQ4AkGXU';
  var URL = seoApp.WORKING_URL;
  var request = new XMLHttpRequest();
  request.open('GET', 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url='+ URL +'&key=' + API_KEY, true);
  document.getElementById('loading').innerHTML = 'Loading Google Page Speed Data.'
  document.getElementById('loading').style.display = 'block';
  var data;
  request.onload = function(){
    if(request.status >= 200 && request.status < 400){
      //success
      data = JSON.parse(request.responseText);
      seoApp.googleSpeedData = data;
      document.getElementById('loading').style.display = 'none'
      document.getElementById('googleSpeed').style.display = 'block'
      document.getElementById('speed').innerHTML = seoApp.googleSpeedData.ruleGroups.SPEED.score;
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
