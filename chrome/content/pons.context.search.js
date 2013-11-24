var Pons = {
  init: function(event) {
    var contextMenu = document.getElementById("contentAreaContextMenu");
    if (contextMenu)
      contextMenu.addEventListener("popupshowing", Pons.ponsShowHideItems, false);
  },
  loadPons: function() {
    var urlPrefix = "http://de.pons.eu/dict/search/results/?q=";
    var urlSuffix = "&l=dees";
    var selectedText = Pons.getBrowserSelection();
    var myUrl = urlPrefix + selectedText + urlSuffix;
    var tBrowser = top.document.getElementById("content");
    var tab = tBrowser.addTab(myUrl);
    tBrowser.selectedTab = tab;
  },
  ponsShowHideItems: function(event)  {
    var show = document.getElementById("pons-show");
    show.hidden = !gContextMenu.isTextSelected;
  },
  getBrowserSelection: function() {
    const charLen = 150;

    let commandDispatcher = document.commandDispatcher;

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
}

window.addEventListener("load", Pons.init, false);