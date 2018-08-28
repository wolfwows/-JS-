var $$ = function(id) {
  return "string" == typeof id ? document.getElementById(id) : id;
};
var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}
Object.extend = function(destination, source) {
  for (var property in source) {
    destination[property] = source[property];
  }
  return destination;
}
var Calendar = Class.create();
Calendar.prototype = {
  initialize: function(calendarBox, options) {
    this.calendarBox = $$(calendarBox);
    this.Days = [];
    this.setOptions(options);
    this.Year = this.options.Year;
    this.Month = this.options.Month;
    this.draw();
  },
  setOptions: function(options) {
    this.options = {
      Year: new Date().getFullYear(),
      Month: new Date().getMonth() + 1,
    };
    Object.extend(this.options, options || {});
  },
  draw: function() {
    var arr = [];
    // getDay()函数返回当前月第一天所在的星期数
    for (var i = 1, firstDay = new Date(this.Year, this.Month - 1, 1).getDay(); i <= firstDay; i++) {
      // 通过push()函数将空值传入数组
      arr.push("&nbsp;");
    }
    // 通过getDate()函数获取当前月的天数
    for (var i = 1, monthDay = new Date(this.Year, this.Month, 0).getDate(); i <= monthDay; i++) {
      // 通过push()函数将当前月的天数传入数组
      arr.push(i);
    }
    var frag = document.createDocumentFragment();
    this.Days = [];
    while (arr.length > 0) {
      var row = document.createElement("tr");
      for (var i = 1; i <= 7; i++) {
        var cell = document.createElement("td");
        cell.innerHTML = "&nbsp;";
        if (arr.length > 0) {
          var d = arr.shift();
          cell.innerHTML = "<span>" + d + "</span>";
        }
        row.appendChild(cell);
      }
      frag.appendChild(row);
    }
    this.calendarBox.appendChild(frag);
  }
}
