var $ = function(sel){
    var isId = sel[0] === "#";
    var rest = sel.slice(1);
    if (isId){
	return document.getElementById(rest);
    } else {
	return document.getElementsByClassName(rest)[0];
    }
};

var red = "rgb(255,0,0)";
var blue = "rgb(0,0,255)";

var transact = function(fn, ctx){
    ctx.save();
    fn();
    ctx.restore();
}

var drawCircle = function(ctx, r, color){
    transact(function(){
	ctx.fillStyle = color;
	ctx.beginPath();
	
	ctx.arc(0, 0, r, 0, Math.PI*2, true);
	ctx.fill();
	ctx.stroke();
    }, ctx);
}

var drawWrightFisher = function(t, n, p, q){
    var canvas = $("#canvas");
    var ctx = canvas.getContext('2d');

    var w = canvas.width;
    var h = canvas.height;
    ctx.clearRect(0,0,w,h);

    var cell = w/n;
    var r = cell/4;
    console.log(w);

    for (var i = 0; i < n; i += 1){
	transact(function(){
	    var x = i*cell + 2*r;
	    ctx.translate(x, 2*r);
	    drawCircle(ctx, r, red);
	}, ctx);
    }
};

window.addEvent('domready', function() {
    var intro = $("#intro");

    var tangle = new Tangle(intro, {
	initialize: function(){
	    this.t = 10;
	    this.n = 10;
	    this.p = 0.5;
	    this.q = 0.5;
	},
	update: function(){
	    this.q = 1.0 - this.p;
	    drawWrightFisher(this.t, this.n, this.p, this.q);
	}
    });
});
