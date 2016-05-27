<?php

$url = $_GET["url"];
$string = $_GET["keywords"];


  libxml_use_internal_errors(true); //Prevents Warnings, remove if desired
  $content = file_get_contents($url);
  $explodedContent = explode("<title>", $content);
  $explodedExplodedContent = explode("</title>", $explodedContent[1]);

  $explodedBody = explode("<body>", $content);
  $explodedExplodedBody = explode("</body>", $explodedBody[0]);

  echo "{ \"result\": ". "{ ";
  echo "\"titleCount\": " . substr_count($explodedExplodedContent[0], $string) . ", "; // title of that page.
  echo "\"bodyCount\": " . substr_count(strip_tags($explodedExplodedBody[0]), $string);
  echo " } }";
?>
