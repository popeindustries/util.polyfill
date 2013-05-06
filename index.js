/**
 * Array.indexOf()
 */
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(item) {
		for (var i = i = 0, n = this.length; i < n; i++) {
			if (item === this[i]) {
				return i;
			}
		}
		return -1;
	};
}

/**
 * window.requestAnimationFrame()
 */
var vendors = ['ms', 'moz', 'webkit', 'o']
	, lastFrameTime = null;

for (var i = 0, n = vendors.length; i < n; i++) {
	vendor = vendors[i];
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
	}
}

if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = function(callback, element) {
		var currFrameTime = +(new Date)
			, id, interval, lastTime;
		if (lastFrameTime == null) {
			lastFrameTime = currFrameTime;
		}
		interval = Math.max(0, 16 - (currFrameTime - lastFrameTime));
		id = window.setTimeout((function() {
			// Call with elapsed frame time
			callback(currFrameTime + interval);
		}), interval);
		lastTime = currFrameTime + interval;
		return id;
	};
}

if (!window.cancelAnimationFrame) {
	window.cancelAnimationFrame = function(id) {
		clearTimeout(id);
	};
}

/**
 * Function.bind()
 * --https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind--
 */
if (!Function.prototype.bind) {
	Function.prototype.bind = function(context) {
		if (typeof this !== 'function') {
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}
		var args = Array.prototype.slice.call(arguments, 1)
			, toBind = this
			, noop = function() {}
			, bound = function() {
				return toBind.apply(this instanceof noop ? this : context || window,
					args.concat(Array.prototype.slice.call(arguments)));
			};
		noop.prototype = this.prototype;
		bound.prototype = new noop();
		return bound;
	}
}
