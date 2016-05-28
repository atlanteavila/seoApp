var seoApp = {};
var getId = document.getElementById.bind(document);

// have to create the object for the bodyCount to be undefined until the script finishes loading and replaces it.
seoApp.siteData = {};
seoApp.siteData.result = {};
seoApp.siteData.result.bodyCount = undefined;
//  set site score
seoApp.siteScore = 0;
//  gt matrix - page ranking tool

seoApp.setURL = function () {
  seoApp.WORKING_URL = document.getElementsByName('url')[0].value;
}
seoApp.setKeyWords = function () {
  seoApp.KEYWORDS = document.getElementsByName('keywords')[0].value;
}

// create a "constructor" function to update elements within the html document
// to be used inside other functions.
seoApp.createResults = function (title, paragraph, score, element) {
  getId(element).style.display = 'block';
  getId(element + '-title').innerHTML = title;
  getId(element + '-p').innerHTML = paragraph;
  getId(element + '-score').innerHTML = score;
  return 1;
}

seoApp.getSpeedSuggestions = function(){
  var suggest = seoApp.googleSpeedData.formattedResults.ruleResults;
  var list = toolbelt.filter(suggest, function(val) {
    return val.ruleImpact > 0
  });

  toolbelt.each(list, function(element, index){
    getId('googleResults').innerHTML = getId('googleResults').innerHTML + "-" + list[index].localizedRuleName + "<br>";
  })
}

seoApp.googleSpeed = function() {
  if (seoApp.googleSpeedData.ruleGroups.SPEED.score >= 75 && seoApp.googleSpeedData.ruleGroups.SPEED.score < 80) {

    seoApp.siteScore += 5;
    seoApp.createResults("Your load score is good but could improve!", "It seems like  you have a good score but could improve. Try some of these suggestions from google:", 5, "googleResults");
    seoApp.getSpeedSuggestions();
    getId("googleResults-score").style.background = 'orange';

  } else if (seoApp.googleSpeedData.ruleGroups.SPEED.score < 75) {

    seoApp.siteScore += 0;
    seoApp.createResults("Your Google load score is below 75 and needs to improve", "It seems like  you have a fairly low score that could improve. Try some of these suggestions from google:", 0, "googleResults");
    seoApp.getSpeedSuggestions();
    getId("googleResults-score").style.background = 'red';

  } else {

    seoApp.siteScore += 10;
    seoApp.createResults("Your load score is awesome!", "It seems like  you have a great speed score from google!", 10, "googleResults");
    getId("googleResults-score").style.background = 'green';

  }

  // invoke findTitle function here.
  seoApp.findTitle();
  // invoke moz-data function here.
  seoApp.getMozData();
}

seoApp.findTitle = function () {

  var element = "titleResults"
  var title = seoApp.googleSpeedData.title.toLowerCase();
  var keywords = seoApp.KEYWORDS.toLowerCase();
  var search = title.search(keywords);

  if (search !== -1) {
    seoApp.siteScore += 10;
    seoApp.createResults("Your keyword was found within the title tags", "Great job! This is a great way to increase your chances of obtaining your SERP goals!", 10, element);
    getId(element + '-score').style.background = 'green';
  }else{
    seoApp.siteScore += 0;
    seoApp.createResults("Your keyword was NOT found within the title tags", "Please try adding " + seoApp.KEYWORDS + "within your title tags." , 0, element);
  }
}

seoApp.bodyCount = function() {
  console.log("running bodyCount");
  var setData = seoApp.siteData.result.bodyCount;
  document.getElementById('loading').style.display = 'block';
  for (var i = 0; i < 10; i++) {
    setTimeout(function () {
      if(setData !== undefined){
        document.getElementById('loading').style.display = 'none'
        i =  11
        if (setData > 5) {
          seoApp.siteScore += 10;
          seoApp.createResults("Your keyword/keyphrase is found within your body", "We see that your keyword/keyphrase appears " + setData +" time(s). Please make sure that it\'s spread throughout the page in a consistent and constant manner.", 10, "bodyResults" );
              getId('bodyResults-score').style.background = "green";
        }else if (setData < 4) {
          seoApp.siteScore += 5;
          seoApp.createResults("Your keyword/keyphrase is found but not enough consistency", "We see that your keyword/keyphrase appears " + setData +" time(s). Please make sure that it\'s spread throughout the page in a consistent and constant manner and try adding it at least a couple more times.", 5, "bodyResults" );
          getId('bodyResults-score').style.background = "orange";
        }else{
          seoApp.createResults("Your keyword/keyphrase is NOT found within your body", "We see that your keyword/keyphrase appears " + setData +" time(s). Please make sure that it\'s spread throughout the page in a consistent and constant manner. Try to place it at least 5 or more times.", 0, "bodyResults" );
              getId('bodyResults-score').style.background = "red"
        }
      }else {
        document.getElementById('loading').style.display = 'none';
        seoApp.createResults("We weren't able to get the body content. ", "Please contact your developer to allow us to scrape the data.", 0, "bodyResults" );
      }
    }, 6000);
  }
}

seoApp.getGoogleSpeedJson = function () {

  var API_KEY = 'AIzaSyDIAAI-RORQI_gs8udnOv_Y2gdjQ4AkGXU';

  var URL = seoApp.WORKING_URL;

  var request = new XMLHttpRequest()

  // build our get string.
  request.open('GET', 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=' + URL + '&key=' + API_KEY, true)

  //  document.getElementById('loading').innerHTML = 'Loading Google Page Speed Data.'
  document.getElementById('loading').style.display = 'block'
  var data;
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // success
      data = JSON.parse(request.responseText);
      seoApp.googleSpeedData = data;
      // hide the loader div.
      document.getElementById('loading').style.display = 'none';

      // invoke functions to execute for other areas of the evaluator.
      seoApp.googleSpeed();

      //  return the data to ensure it gets added to seoApp.
    } else {
      // we reached our target, but encountered an error
      console.log('there was an error!')
    }
  }

  request.onerror = function () {
    // there was a connection error of some sort.
    console.log("There was a connection error of some sort.")
  }
  request.send()
}

//allow users to start a new search.
seoApp.startOver = function(){
  window.parent.location = window.parent.location.href;
  seoApp.siteScore = 0;
}

//connect to custom php script to collect json data as to how many times the keyword has appeared in the content.
seoApp.getSiteData = function(){
  var URL = seoApp.WORKING_URL
  var KEYWORDS = seoApp.KEYWORDS
  toolbelt.getData('serve/app.php?url='+ URL + "&keywords=" + KEYWORDS, 'siteData', seoApp.bodyCount);
};

seoApp.getMozData = function(){
  var URL = seoApp.WORKING_URL;

  // an array that will be passed in to the url to get the moz-data you want to receive back. This parameter is added to a total so that the moz API can return relevant data. See the url metrix: https://moz.com/help/guides/moz-api/mozscape/api-reference/url-metrics
  var COLS = [32, 2048, 16384, 34359738368, 68719476736];

  // use reduce to add every element in the array to a final total.
  COLS = toolbelt.reduce(COLS, function(start, number){
    return start + number;
  }, 0);

  console.log(COLS); 2

  toolbelt.getData('serve/moz-data.php?url=' + URL + '&cols=' + COLS, 'mozData');
}



seoApp.runAllFunctions = function(){
  getId('submit').disabled = "true";
  getId("url").disabled = true;
  getId("keywords").disabled = true;
  getId('startOver').style.display = 'block';
  seoApp.getGoogleSpeedJson();
  seoApp.getSiteData();
}
