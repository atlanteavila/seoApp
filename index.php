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

        </div>
      </div>
      <div class="row" id="form">
        <div class="col-lg-12">
          <form class="seoAnalyzer" onsubmit="event.preventDefault(); seoApp.runAllFunctions();" method="post">
            <ul>
            <li><input type="text" name="url" value="http://" onchange="seoApp.setURL();" id="url"></li>
            <li><input type="text" name="keywords" value="" onchange="seoApp.setKeyWords();" id="keywords"><li>
            <li><input type="submit" name="submit" value="Submit" id="submit"> </li>
            <li><button type="button" onClick="seoApp.startOver()" id="startOver">Try Another Domain</button></li>
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
            <div class="left">
              <h3 id="titleResults-title"></h3>
              <p class="innerP" id="titleResults-p">google speed score </p>
            </div>
            <div class="innerS" id="titleResults-score"></div>
          </div>

        </div>

        <div class="col-lg-12 bodyResults">

          <div class="inner" id="bodyResults">
            <div class="left">
              <h3 id="bodyResults-title"></h3>
              <p class="innerP" id="bodyResults-p"></p>
            </div>
            <div class="innerS" id="bodyResults-score"></div>
          </div>

        </div>

        <div class="col-lg-12">

          <div class="inner" id="googleResults">
            <div class="left">
              <h3 id="googleResults-title"></h3>
              <p class="innerP" id="googleResults-p">google speed score </p>
            </div>
            <div class="innerS" id="googleResults-score"></div>
          </div>

        </div>

      </div>

    </div>

  </body>
  <script src="js/toolbelt.js" charset="utf-8"></script>
  <script src="js/app.js" charset="utf-8"></script>
</html>
