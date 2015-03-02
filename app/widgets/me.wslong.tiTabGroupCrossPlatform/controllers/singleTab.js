Titanium.API.debug(">> singleTab init");

var args = arguments[0] || {},
    id = args.id,
    icon = args.icon,
    activeIcon = args.activeIcon,
    title = args.title,
    fontColor = args.fontColor,
    fontActiveColor = args.fontActiveColor,
    fontFamily = args.fontFamily,
    tabFocus = false,
    tabWidth = args.tabWidth + "dp";

exports.trigger = function() {
  if (tabFocus) {
    $.icon.image = icon;
    $.label.color = fontColor;
  } else {
    $.icon.image = activeIcon;
    $.label.color = fontActiveColor;
  }
  tabFocus = !tabFocus;
};

exports.getTabFocus = function() {
  return tabFocus;
};

exports.setTabBadgeNumber = function(_number) {
  Ti.API.debug(">> singleTab>setTabBadgeNumber: with _number = " + _number);
  var intNumber = parseInt(_number, 10);
  if ( !isNaN(intNumber)) {
    if (intNumber > 0) {
      $.badgeDot.visible = false;
      $.badgeNumVal.text = (intNumber > 99 ? "99" : intNumber);
      Math.floor(intNumber / 10) > 0 ? ($.badgeNum.width = "20dp") : ($.badgeNum.width = "16dp");
      $.badgeNum.visible = true;
    };
  } else {
    $.badgeNum.visible = false;
  };
};

exports.setTabBadgeDot = function(_flag) {
  Ti.API.debug(">> singleTab>setTabBadgeDot: with _flag = " + _flag);
  if (_flag) {// true
    $.badgeNum.visible = false;
    $.badgeDot.visible = true;
  } else {
    $.badgeDot.visible = false;
  };
};

$.tabContainer.id = id;
$.icon.image = icon;
$.label.color = fontColor;
$.label.text = title;
if (fontFamily) {
  $.label.font.fontFamily = fontFamily;
};
$.tabContainer.width = tabWidth;
