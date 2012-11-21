var $ = function(sel){
    var isId = sel[0] === "#";
    var rest = sel.slice(1);
    if (isId){
	return document.getElementById(rest);
    } else {
	return document.getElementsByClassName(rest)[0];
    }
};

window.addEvent('domready', function() {
    var intro = $("#intro");

    var tangle = new Tangle(intro, {
	initialize: function(){
	    this.rounds = 10;
	    this.ancestors = 10;
	    this.p = 0.5;
	    this.q = 0.5;
	},
	update: function(){
	    this.q = 1.0 - this.p;
	}
    });
});
