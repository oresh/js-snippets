/* Base scripts file. */

/* PROJECTNAME global objects. */
window.PROJECTNAME = {
	Behavior: {},
	Settings: {},
	Functions: {},
	runBehaviors: function() {}
};

/* PROJECTNAME global params. */
window.PROJECTNAME.refreshRate = 50; //ms

/* Simple hook system. */
window.Hook = {
  hooks: [],
  register: function ( name, callback ) {
    if( 'undefined' == typeof( Hook.hooks[name] ) )
      Hook.hooks[name] = []
    Hook.hooks[name].push( callback )
  },
  call: function ( name, arguments ) {
    if( 'undefined' != typeof( Hook.hooks[name] ) )
      for( i = 0; i < Hook.hooks[name].length; ++i )
        if( true != Hook.hooks[name][i]( arguments ) ) { break; }
  }
};

jQuery.fn.extend({
	makeClass: function(removableClass, addedClass) {
		this.removeClass(removableClass);
		this.addClass(addedClass);
	}
});

/**
 * Default (base) behavior
 */
PROJECTNAME.Behavior.default = function(settings) {
	jQuery('html').removeClass('no-js');
}

/**
 * Execute all Behaviors.
 */
PROJECTNAME.runBehaviors = function(settings) {
	if (typeof settings.context == 'undefined') settings.context = document;
	var behaviors = Object.keys(PROJECTNAME.Behavior);
	for (var i = 0, len = behaviors.length; i < len; i++) {
		PROJECTNAME.Behavior[behaviors[i]](settings);
	}
}

/**
 * Execute all Behaviors.
 */
PROJECTNAME.runBehavior = function(name, settings) {
	var localSettings = {
		context: document,
		selector: ''
	};
	if (settings) {
		for (var attrname in settings) {
			localSettings[attrname] = settings[attrname];
		}
	} else {
		settings = localSettings;
	}
	PROJECTNAME.Behavior[name[i]](settings);
}

/**
 * Run All behaviors on document ready.
 */
jQuery(document).ready(function() {
	PROJECTNAME.runBehaviors(document);
});
