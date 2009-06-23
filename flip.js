// flip upside down text
// original source: http://s.ytimg.com/yt/js/april_fools-vfl84826.js (from YouTube April Fools 2009)
// converted to Dojo/plugd syntax by Ryan Corradini (inspired by Paul Irish's jQuery plugin)
// requires dojo 1.3.0

// usage:
//   dojo.flip('div_id');
//   dojo.query('div').flip();

dojo.provide("plugd.flip");

(function(d){
    var charset = {
        a:"\u0250", b:"q", c:"\u0254", d:"p", e:"\u01DD", f:"\u025F", g:"\u0183", h:"\u0265",
        i:"\u0131", j:"\u027E", k:"\u029E", l:"l", m:"\u026F", n:"u", o:"o", p:"d", q:"b",
        r:"\u0279", s:"s", t:"\u0287", u:"n", v:"\u028C", w:"\u028D", y:"\u028E", z:"z",
        1:"\u21C2", 2:"Z" /* or u1105 */, 3:"E" /* or u1110 */, 4:"h" /* (or u3123) */, 5:"\u03DB"   /* or u078E */,
        6:"9", 7:"L" /* or u3125 */, 8:"8", 9:"6", 0:"0",
        ".":"\u02D9", ",":"'", "'":",", '"':",,", "´":",", "`":",", ";":"\u061B", "!":"\u00A1", "\u00A1":"!",
        "?":"\u00BF", "\u00BF":"?", "[":"]", "]":"[", "(":")", ")":"(", "{":"}", "}":"{", "<":">", ">":"<", _:"\u203E", "\r":"\n"
    };

    function _flipStr(str) {
        var folded = str.toLowerCase();
        var result = "";
        for (var x = folded.length - 1; x >= 0; --x){
            var c = folded.charAt(x);
            var r = charset[c];
            result += r != undefined ? r : c;
        }
        return result;
    }

    d.flip = function(n, args) {
        if (typeof n == 'string') { n = d.byId(n); }
        
        if (n.nodeType == 3) {  // text node
            n.nodeValue = _flipStr(n.nodeValue);
        } else if (n.nodeType == 1) {   // element
            for (var i = n.childNodes.length-1; i >= 0; i--) {
                var child = n.childNodes[i];
                d.flip(child, args);
                n.appendChild( n.removeChild( child ) );
            }
        }
    }

    // new in Dojo 1.3.0:
    d.NodeList.prototype.flip = d.NodeList._adaptAsForEach(d.flip);
 
    // old Dojo 1.0 - 1.2.x way:
    /*d.extend(d.NodeList, {
        flip: function(props){
            // summary: run `d.flip` for each of the nodes in this list
            return this.forEach(function(n){
                d.flip(n, props);
            });
        }
    });*/
})(dojo);
