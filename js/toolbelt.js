var toolbelt = {};
toolbelt.each = function(coll, callback) {
  if (Array.isArray(coll)){
    for(var i = 0; i < coll.length; i++){
      callback(coll[i], i);
    }
  } else if (typeof coll === 'object') {
    for (var key in coll) {
      callback(coll[key], key);
    }
  }
}


toolbelt.filter = function (coll, callback) {
  var acc = [];
  toolbelt.each(coll, function(val){
    if ( callback(val) ) {
      acc.push(val);
    }
  });
  return acc;
}

toolbelt.map = function(coll, callback){
  var acc = [];
  toolbelt.each(coll, function(element, index){
    acc.push(callback(element));
  });
  return acc;
}

toolbelt.reduce = function(coll, callback, startVal){
  startVal = startVal || 0;
  toolbelt.each(coll, function(element, index){
    startVal = callback(startVal, element);
  });
  return startVal;
}

toolbelt.getData = function(url, dataSet, func){
  var request = new XMLHttpRequest();

  request.open('POST', url, true);

  request.onload = function() {
    if (request.readyState == 4 && request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.responseText);
      seoApp[dataSet] = data;

      func(data)

    } else {
      // We reached our target server, but it returned an error
      alert("The target server was reached but there was an error returned.")
    }
}
request.onerror = function() {
  // There was a connection error of some sort
  alert('There was a connection error. try again later.')
};

request.send();
}
