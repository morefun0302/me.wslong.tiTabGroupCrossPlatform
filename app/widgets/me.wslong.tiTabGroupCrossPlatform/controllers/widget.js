var nodes = [],
    excess,
    excessLength,
    moreOpen,
    width,
    display,
    fontFamily,
    borderBackgroundColor,
    backgroundColor,
    activeBackgroundColor,
    moreIcon,
    moreIconVert,
    fontColor,
    fontActiveColor,
    tabClickCallback;

/**
 * _params.nodes
 */
$.init = function(_params) {
  nodes = _params.nodes;
  excess = false;
  excessLength = 5;
  moreOpen = false;
  width = 0;
  display = {
    width : Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth,
    height : Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight,
    dpi : Ti.Platform.displayCaps.dpi
  };
  fontFamily = _params.fontFamily;
  borderBackgroundColor = _params.borderBackgroundColor || "#000000";
  backgroundColor = _params.backgroundColor || "#ffffff";
  activeBackgroundColor = _params.activeBackgroundColor || "#ffffff";
  moreIconVert = _params.moreIconVert;
  moreIcon = _params.moreIcon || ( moreIconVert ? WPATH("/more_vert_black.png") : WPATH("/more_horiz_black.png"));
  fontColor = _params.fontColor || "#979797";
  fontActiveColor = _params.fontActiveColor || "#fa5050";
  tabClickCallback = _params.tabClickCallback;

  if (OS_ANDROID) {
    display.width = (display.width / (display.dpi / 160));
    display.height = (display.height / (display.dpi / 160));
  }

  if (Alloy.isTablet) {
    excessLength = Math.floor(display.width / 70);
  }

  if (nodes.length > excessLength) {
    excess = true;
  }

  width = excess ? Math.floor(display.width / excessLength) : Math.floor(display.width / nodes.length);
  Ti.API.debug("-- preparing width = " + width);

  $.TabGroup.backgroundColor = backgroundColor;
  $.Border.backgroundColor = borderBackgroundColor;

  for (var i = 0; i < nodes.length; i ++) {
    var tabController = Widget.createController("singleTab", {
      id : nodes[i].id,
      icon : nodes[i].icon,
      activeIcon : nodes[i].activeIcon,
      title : nodes[i].title,
      fontColor : fontColor,
      fontActiveColor : fontActiveColor,
      fontFamily : fontFamily,
      tabWidth : width
    });
    nodes[i].tabController = tabController;
    $.TabContainer.add(tabController.getView());
  }
};

/**
 * Sets the indexed item as active
 * @param {Object} _index The index of the item to show as active
 */
$.setIndex = function(_index) {
  for (var i = 0; i < nodes.length; i ++) {
    if (nodes[i].id !== _index && nodes[i].tabController.getTabFocus()) {
      nodes[i].tabController.trigger();
    };
    if (nodes[i].id === _index && !nodes[i].tabController.getTabFocus()) {
      nodes[i].tabController.trigger();
    };
  };
};

$.Wrapper.addEventListener("click", function(_event) {
  if ( typeof _event.source.id !== "undefined" && typeof _event.source.id == "number") {
    $.setIndex(_event.source.id);
    tabClickCallback(_event.source.id);
  }
});

/**
 * @param {Object} _index: the index of the tab
 * @param {Object} _number: the number of the tab badge, null/non-number to remove the badge
 */
$.setTabBadgeNumberValue = function(_index, _number) {
  nodes[_index] && nodes[_index].tabController.setTabBadgeNumber(_number);
};

/**
 * @param {Object} _index: the index of the tab
 * @param {Object} _flag: true to show, false to hide
 */
$.setTabBadgeDot = function(_index, _flag) {
  nodes[_index] && nodes[_index].tabController.setTabBadgeDot(_flag);
};
