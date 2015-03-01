var tabs = [{
  id : 0,
  title : "One",
  icon : "/1_979797_72x72.png",
  activeIcon : "/1_fa5050_72x72.png"
}, {
  id : 1,
  title : "Two",
  icon : "/2_979797_72x72.png",
  activeIcon : "/2_fa5050_72x72.png"
}, {
  id : 2,
  title : "Three",
  icon : "/3_979797_72x72.png",
  activeIcon : "/3_fa5050_72x72.png"
}, {
  id : 3,
  title : "Four",
  icon : "/4_979797_72x72.png",
  activeIcon : "/4_fa5050_72x72.png"
}];

// Initialize the tab bar
$.deseTabGroup.init({
  nodes : tabs,
  backgroundColor : "#ffffff",
  activeBackgroundColor : "#ffffff",
  tabClickCallback : tabClickCallback
});

// Set the first tab as active
$.deseTabGroup.setIndex(0);

// Handle the click event on a tab
function tabClickCallback(_index) {
  Ti.API.debug("-- index.js: customized tab clicked, index = " + _index);
}

function updateBadgeNum() {
  var _index = $.inputIndex.value || 0;
  var _badgeNum = $.inputBadgeNumberValue.value || 0;
  $.deseTabGroup.setTabBadgeNumberValue(_index, _badgeNum);
};

function updateBadgeDot() {
  var _index = $.inputIndex.value || 0;
  $.deseTabGroup.setTabBadgeDot(_index, true);
};

$.index.open();
