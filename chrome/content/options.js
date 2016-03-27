var PonsOptions = {
	prefs: null,

	init: function(event) {
		this.prefs = Components.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefService)
				.getBranch("pons.context.search.");
		this.populateOutputLanguageList(this.prefs.getCharPref("inputLanguage"));
		this.selectLanguageFromPrefs();
	},	

	createMenuItem: function(aLabel, aValue) {
	  const XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
	  var item = document.createElementNS(XUL_NS, "menuitem");
	  item.setAttribute("label", aLabel);
	  item.setAttribute("value", aValue);
	  return item;
	},

	changed: function() {
		var inputList = document.getElementById('inputList');
		var item = inputList.selectedItem;
		var languageCode = item.getAttribute("value");
		this.populateOutputLanguageList(languageCode, true);
		this.selectFirstLanguage();
	},

	populateOutputLanguageList: function(inputLanguage) {
		var outputLanguage = document.getElementById('outputLanguage');
		while(outputLanguage.hasChildNodes()){
		  outputLanguage.removeChild(outputLanguage.firstChild);
		}
		switch (inputLanguage) {
			case 'cs':
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
				break;
			case 'da':
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
				break;
			case 'de':
				outputLanguage.appendChild(this.createMenuItem('Chinese', 'zh'));
				outputLanguage.appendChild(this.createMenuItem('Czech', 'cs'));
				outputLanguage.appendChild(this.createMenuItem('Danish', 'da'));
				outputLanguage.appendChild(this.createMenuItem('Dutch', 'nl'));
				outputLanguage.appendChild(this.createMenuItem('English', 'en'));
				outputLanguage.appendChild(this.createMenuItem('Elvish', 'lb'));
				outputLanguage.appendChild(this.createMenuItem('French', 'fr'));
				outputLanguage.appendChild(this.createMenuItem('Greek', 'el'));
				outputLanguage.appendChild(this.createMenuItem('Hungarian', 'hu'));
				outputLanguage.appendChild(this.createMenuItem('Italian', 'it'));
				outputLanguage.appendChild(this.createMenuItem('Latin', 'la'));
				outputLanguage.appendChild(this.createMenuItem('Norwegian', 'no'));
				outputLanguage.appendChild(this.createMenuItem('Polish', 'pl'));
				outputLanguage.appendChild(this.createMenuItem('Portuguese', 'pt'));
				outputLanguage.appendChild(this.createMenuItem('Russian', 'ru'));
				outputLanguage.appendChild(this.createMenuItem('Slovenian', 'sl'));
				outputLanguage.appendChild(this.createMenuItem('Spanish', 'es'));
				outputLanguage.appendChild(this.createMenuItem('Swedish', 'sv'));
				outputLanguage.appendChild(this.createMenuItem('Turkish', 'tr'));
				break;
			case 'el':
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
				break;
			case 'en':
				outputLanguage.appendChild(this.createMenuItem('Chinese', 'zh'));
				outputLanguage.appendChild(this.createMenuItem('French', 'fr'));
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));	
				outputLanguage.appendChild(this.createMenuItem('Italian', 'it'));
				outputLanguage.appendChild(this.createMenuItem('Polish', 'pl'));
				outputLanguage.appendChild(this.createMenuItem('Portuguese', 'pt'));
				outputLanguage.appendChild(this.createMenuItem('Russian', 'ru'));
				outputLanguage.appendChild(this.createMenuItem('Slovenian', 'sl'));
				outputLanguage.appendChild(this.createMenuItem('Spanish', 'es'));
				break;
			case 'es':
				outputLanguage.appendChild(this.createMenuItem('English', 'en'));
				outputLanguage.appendChild(this.createMenuItem('French', 'fr'));;
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
				outputLanguage.appendChild(this.createMenuItem('Polish', 'pl'));
				outputLanguage.appendChild(this.createMenuItem('Portuguese', 'pt'));
				outputLanguage.appendChild(this.createMenuItem('Slovenian', 'sl'));
				break;	
			case 'fr':
				outputLanguage.appendChild(this.createMenuItem('English', 'en'));
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
				outputLanguage.appendChild(this.createMenuItem('Polish', 'pl'));
				outputLanguage.appendChild(this.createMenuItem('Slovenian', 'sl'));
				outputLanguage.appendChild(this.createMenuItem('Spanish', 'es'));
				break;
			case 'hu':
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
				break;
			case 'it':
				outputLanguage.appendChild(this.createMenuItem('English', 'en'));
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
				outputLanguage.appendChild(this.createMenuItem('Polish', 'pl'));
				outputLanguage.appendChild(this.createMenuItem('Slovenian', 'sl'));
				break;	
			case 'la':
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
			case 'lb':
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
				break;
			case 'no':
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
				break;
			case 'nl':
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
				break;
			case 'pl':
				outputLanguage.appendChild(this.createMenuItem('English', 'en'));
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
				outputLanguage.appendChild(this.createMenuItem('French', 'fr'));
				outputLanguage.appendChild(this.createMenuItem('Italian', 'it'));
				outputLanguage.appendChild(this.createMenuItem('Russian', 'ru'));
				outputLanguage.appendChild(this.createMenuItem('Spanish', 'es'));
				break;	
			case 'pt':
				outputLanguage.appendChild(this.createMenuItem('English', 'en'));
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
				outputLanguage.appendChild(this.createMenuItem('Spanish', 'es'));
				break;
			case 'ru':
				outputLanguage.appendChild(this.createMenuItem('English', 'en'));
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
				outputLanguage.appendChild(this.createMenuItem('Polish', 'pl'));
				break;
			case 'sl':
				outputLanguage.appendChild(this.createMenuItem('English', 'en'));
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
				outputLanguage.appendChild(this.createMenuItem('French', 'fr'));
				outputLanguage.appendChild(this.createMenuItem('Italian', 'it'));
				outputLanguage.appendChild(this.createMenuItem('Spanish', 'es'));
				break;	
			case 'sv':
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
				break;
			case 'tr':
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
				break;
			case 'zh':
				outputLanguage.appendChild(this.createMenuItem('English', 'en'));
				outputLanguage.appendChild(this.createMenuItem('German', 'de'));
				break;	
		}
	},

	selectFirstLanguage: function() {
		var outputList = document.getElementById('outputList');
		outputList.selectedIndex = 0;
		var outputLanguage = document.getElementById('outputLanguage');
		this.prefs.setCharPref("outputLanguage", outputLanguage.firstChild.value);
	},

	selectLanguageFromPrefs: function() {
		var outputList = document.getElementById('outputList');
		var languageCode = this.prefs.getCharPref("outputLanguage");

		if (outputList.hasChildNodes() == true ) {
			var outputLanguage = document.getElementById('outputLanguage');
			var children = outputLanguage.childNodes;
			var i = 0;
			while (i < children.length) {
			  if (children[i].value == languageCode) {
				  var outputList = document.getElementById('outputList');
				  outputList.selectedIndex = i;
				  break;  
			  }
			  else {
				  i++;
			  }
			}
		}
	}
}

window.addEventListener("load", function load(event){
window.removeEventListener("load", load, false);
	PonsOptions.init();
},false);
