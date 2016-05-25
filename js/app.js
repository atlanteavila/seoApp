var seoApp = {}
//  set site score
seoApp.siteScore = 0
//  gt matrix - page ranking tool

seoApp.setURL = function () {
  seoApp.WORKING_URL = document.getElementsByName('url')[0].value
}
seoApp.setKeyWords = function () {
  seoApp.KEYWORDS = document.getElementsByName('keywords')[0].value
}

seoApp.findTitle = function () {
  var title = seoApp.googleSpeedData.title
  console.log(title)
  var keywords = seoApp.KEYWORDS

  document.getElementById('titleResults').style.display = 'block'
  if (keywords.match(title) !== null) {
    document.getElementById('titleResults').innerHTML = '<h3>Your keyword is found in your title tag!</h3><p id="keyWordsP"> Great job, this is a great step towards your SERP goals!</p>'
    // add five to the site SEO score.
    seoApp.siteScore += 5
    // display the points to the user.
    document.getElementById('keyWordsP').insertAdjacentHTML('beforeBegin', seoApp.siteScore)
  } else if (keywords.match(title) === null) {
    document.getElementById('titleResults').innerHTML = '<h3>Your keyword is NOT found in your title tag!</h3><p id="keyWordsP"> Please try adding "' + seoApp.KEYWORDS + '" to your title tags. </p>'
    document.getElementById('keyWordsP').insertAdjacentHTML('beforeBegin', 'site score: ' + seoApp.siteScore)
  }
}

seoApp.getGoogleSpeedJson = function () {
  var API_KEY = 'AIzaSyDIAAI-RORQI_gs8udnOv_Y2gdjQ4AkGXU'
  var URL = seoApp.WORKING_URL
  var request = new XMLHttpRequest()
  request.open('GET', 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=' + URL + '&key=' + API_KEY, true)
  //  document.getElementById('loading').innerHTML = 'Loading Google Page Speed Data.'
  document.getElementById('loading').style.display = 'block'
  var data
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // success
      data = JSON.parse(request.responseText)
      seoApp.googleSpeedData = data
      document.getElementById('loading').style.display = 'none'
      document.getElementById('googleSpeed').style.display = 'block'
      if (seoApp.googleSpeedData.ruleGroups.SPEED.score >= 75 && seoApp.googleSpeedData.ruleGroups.SPEED.score < 80) {
        document.getElementById('p').insertAdjacentHTML('beforeBegin', '<div class="left"> <h3>Your load score is good but could improve!. Try the following suggestions from google:</h3></div>')
        document.getElementById('p').style.background = 'orange'
        document.getElementById('speed').innerHTML = seoApp.googleSpeedData.ruleGroups.SPEED.score
      } else if (seoApp.googleSpeedData.ruleGroups.SPEED.score < 75) {
        document.getElementById('p').insertAdjacentHTML('beforeBegin', '<div class="left"> <h3>Your load score is low.</h3> <p>Try the following suggestions from google:</p></div>')
        document.getElementById('p').style.background = 'red'
        document.getElementById('speed').innerHTML = seoApp.googleSpeedData.ruleGroups.SPEED.score
      } else {
        document.getElementById('p').insertAdjacentHTML('beforeBegin', '<div class="left"> <h3>Your load score is awesome!</h3><p>There are no suggestions from google!</p></div>')
        document.getElementById('p').style.background = 'green'
        document.getElementById('speed').innerHTML = seoApp.googleSpeedData.ruleGroups.SPEED.score
      }
      // invoke findTitle here.
      seoApp.findTitle()
      //  return the data to ensure it gets added to seoApp.
    } else {
      // we reached our target, but encountered an error
      console.log('there was an error!')
    }
  }

  request.onerror = function () {
    // there was a connection error of some sort.
  }
  request.send()
}
