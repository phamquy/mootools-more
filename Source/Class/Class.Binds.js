/*
Script: Class.Binds.js
	Automagically binds specified methods in a class to the instance of the class.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/
(function(){

	var binder = function(self, binds){
		var oldInit = self.initialize;
		self.initialize = function(){
			Array.flatten(binds).each(function(binder){
				var original = this[binder];
				this[binder] = function(){
					return original.apply(this, arguments);
				}.bind(this);
				this[binder].parent = original.parent;
			}, this);
			return oldInit.apply(this,arguments);
		};
		return self;
	};

	Class.Mutators.Binds = function(self, binds){
		if (!self.Binds) return self;
		delete self.Binds;
		return binder(self, binds);
	};

	Class.Mutators.binds = function(self, binds){
		if (!self.binds) return self;
		delete self['binds'];
		return binder(self, binds);
	};

})();