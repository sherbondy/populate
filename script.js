// (function(){

    /* TODOS:
       - devise a way to make p steps a function of N:
         this.step = (this.max-this.min)/n;

     */

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

    var randInt = function() {
	var min = 0;
	var max = 1;
	if (arguments.length === 2){
	    min = arguments[0];
	    max = arguments[1];
	} else {
	    max = arguments[0];
	}

	var range = max - min;
	return Math.floor(Math.random()*range) + min;
    }

    var drawWrightFisher = function(t, n, p, q){
	var canvas = $("#canvas");
	var ctx = canvas.getContext('2d');

	var w = canvas.width;
	var h = canvas.height;
	ctx.clearRect(0,0,w,h);

	var rDecider = (n > t) ? n : t;
	var r = w/(4*rDecider);
	var pCount = n*p;

	function circleX(r, j){ return r*(4*j + 2); }
	function circleY(r, i){ return r*(3*i + 2); }

	var maxX = circleX(r, n);
	var xOffset = (w - maxX)/2;

	// initialize the parentPointers
	var parentPointers = new Array(t);

	for (var i = 0; i < t; i += 1){
	    parentPointers[i] = new Array(n);
	    for (var j = 0; j < n; j += 1){
		var allele;
		if (i === 0) {
		    allele = j >= pCount ? 0 : 1;

		    parentPointers[0][j] = {
			allele: allele, 
			parent: null
		    };
		} else {
		    parent = randInt(n);
		    allele = parentPointers[i-1][parent].allele;

		    parentPointers[i][j] = {
			allele: allele,
			parent: parent
		    };
		}
	    }
	}

	for (var i = 0; i < t; i += 1){
	    for (var j = 0; j < n; j += 1){
		transact(function(){
		    var x = xOffset + circleX(r, j);
		    var y = circleY(r, i);
		    ctx.translate(x, y);

		    var pp = parentPointers[i][j];
		    if (pp) {
			var color = pp.allele === 0 ? red : blue;
		    }
		    drawCircle(ctx, r, color);
		}, ctx);
	    }
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

// })();
