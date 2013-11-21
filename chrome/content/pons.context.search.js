window.addEventListener("load", function load(event){
    pons.init();  
},false);


var pons = {
  init: function() {
    var contextMenu = document.getElementById("contentAreaContextMenu");
    if (contextMenu)
      contextMenu.addEventListener("popupshowing", PonsShowHideItems, false);
  },
  loadPons: function() {
    var urlPrefix = "http://de.pons.eu/dict/search/results/?q=";
    var urlSuffix = "&l=dees";
    var selectedText = getBrowserSelection();
    var myUrl = urlPrefix + selectedText + urlSuffix;
    var tBrowser = top.document.getElementById("content");
    var tab = tBrowser.addTab(myUrl);
    tBrowser.selectedTab = tab;
  }
};

function PonsShowHideItems(event)
{
  var show = document.getElementById("pons-show");
  show.hidden = !gContextMenu.isTextSelected;
}

function getBrowserSelection() {
  const charLen = 150;

  var focusedWindow = commandDispatcher.focusedWindow;
  var selection = focusedWindow.getSelection().toString();
  if (!selection) {
    let element = commandDispatcher.focusedElement;
    var isOnTextInput = function isOnTextInput(elem) {
      return elem instanceof HTMLTextAreaElement ||
             (elem instanceof HTMLInputElement && elem.mozIsTextField(true));
    };

    if (isOnTextInput(element)) {
      selection = element.QueryInterface(Ci.nsIDOMNSEditableElement)
                         .editor.selection.toString();
    }
  }

  if (selection) {
    if (selection.length > charLen) {
      var pattern = new RegExp("^(?:\\s*.){0," + charLen + "}");
      pattern.test(selection);
      selection = RegExp.lastMatch;
    }

    selection = selection.trim().replace(/\s+/g, " ");

    if (selection.length > charLen)
      selection = selection.substr(0, charLen);
  }
  return selection;
}
