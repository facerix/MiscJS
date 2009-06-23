// Generates a tag cloud
// (c) 2009, Ryan Corradini
//
// usage:
//   var tag_list = {tag1:5,tag2:12,tag3:7};
//   parentDiv.appendChild( makeCloud(tag_list, "http://www.buyog.com/labels/", 5, 0.75, 4.5, ' ', false) );


// Javascript implementation of Fisher-Yates algorithm;
//   Found at http://sedition.com/perl/javascript-fy.html
function shuffleArray( myArray ) {
    var i = myArray.length;
    if ( i == 0 ) return false;
    while ( --i ) {
        var j = Math.floor( Math.random() * ( i + 1 ) );
        var tempi = myArray[i];
        var tempj = myArray[j];
        myArray[i] = tempj;
        myArray[j] = tempi;
    }
}

function makeCloud(tags, baseUrl, minCount, minSize, max, delim, shuffle) {
    if (minCount == 'undefined') { minCount = 0 }
    if (minSize == 'undefined') { minSize = 1 }
    if (max == 'undefined') { max = 4.5 }; //(in 'em' units)
    if (delim == 'undefined') { delim = '&nbsp;' }
    if (shuffle == 'undefined') { shuffle = false; }
    var maxSeen = 0; var fontSize = max;
    
    var cloud = document.createElement("div");
    var link = null;
    var taglinks = [];
    cloud.className = "tag-cloud";
    
    for (tag in tags) { 
        if (tags[tag] > minCount) {
            if (tags[tag] > maxSeen) { maxSeen = tags[tag]; }
            fontSize = max * (tags[tag] - minCount);
            
            link = document.createElement("a");
            link.rel = "tag";
            link.href = baseUrl+tag+".html";
            link.title = tag + " (" + tags[tag] + " instances)";
            link.innerHTML = tag;
            link.fontSize = fontSize;

            taglinks.push(link);
        }
    }

    // optionally shuffle the tag order
    if (shuffle) {
        shuffleArray(taglinks);
    } else {
        taglinks = taglinks.sort();
    }

    // now append the tags to the new parent DIV
    for (var i in taglinks) {
        var ems = ((taglinks[i].fontSize-minSize) / (maxSeen - minCount)) + minSize;
        taglinks[i].style.fontSize = ems+"em";
        if (ems < 1) { taglinks[i].style.lineHeight = ems+"em"; }
        cloud.appendChild(taglinks[i]);
        if (delim) { cloud.appendChild(document.createTextNode(delim)) }
    }
    
    return cloud;
}
