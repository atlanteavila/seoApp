<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>SEO Analyzer || Atlante Avila</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="css/main.css" media="screen" charset="utf-8">
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 header">
          <h1>SEO Analyzer Tool | Atlante Avila</h1>
        </div>
      </div>
      <div class="row" id="form">
        <div class="col-lg-12">
          <form class="seoAnalyzer" onsubmit="event.preventDefault(); seoApp.getGoogleSpeedJson();" method="post">
            <ul>
            <li><input type="text" name="url" value="http://" onchange="seoApp.setURL();"></li>
            <li><input type="text" name="keywords" value="" onchange="seoApp.setKeyWords();"><li>
            <li><input type="submit" name="submit" value="Submit"> </li>
            </ul>

          </form>
        </div>
      </div>
      <div class="loading" id="loading" style="display: none;">
        <img src="images/22.gif" alt="loading..." />
      </div>
      <div class="row">
        <div class="col-lg-12 titleResults">
          <div class="inner" id="titleResults">
            <div class="googleSuggestions">

            </div>
            <p id="titleResults"><span id="titlePoints"></span></p>
          </div>
        </div>
        <div class="col-lg-12" id="googleSpeed">
          <div class="inner">
            <p id="p"><span id="speed"></span> google speed score </p>
          </div>
        </div>
      </div>
    </div>

  </body>
  <script src="js/toolbelt.js" charset="utf-8"></script>
  <script src="js/app.js" charset="utf-8"></script>
</html>
