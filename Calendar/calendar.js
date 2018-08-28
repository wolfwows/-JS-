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
    // this.Days = [];
    this.setOptions(options);
    this.Year = this.options.Year;
    this.Month = this.options.Month;
    this.Today = this.options.Today;
    this.signDays = this.options.signDays;
    this.draw();
  },
  setOptions: function(options) {
    this.options = {
      Year: new Date().getFullYear(),
      Month: new Date().getMonth() + 1,
      Today: new Date().getDate(),
      signDays: []
    };
    Object.extend(this.options, options || {});
  },
  // 绘制日历表的方法
  draw: function() {
    var days = [];
    var signRecodes = this.signDays;
    // getDay()函数返回当前月第一天所在的星期数
    for (var i = 1, firstDay = new Date(this.Year, this.Month - 1, 1).getDay(); i <= firstDay; i++) {
      // 通过push()函数将空值传入数组
      days.push("&nbsp;");
    }
    // 通过getDate()函数获取当前月的天数
    for (var i = 1, monthDay = new Date(this.Year, this.Month, 0).getDate(); i <= monthDay; i++) {
      // 通过push()函数将当前月的天数传入数组
      days.push(i);
    }
    var frag = document.createDocumentFragment();
    this.Days = [];
    while (days.length > 0) {
      var row = document.createElement("tr");
      for (var i = 1; i <= 7; i++) {
        var cell = document.createElement("td");
        cell.innerHTML = "&nbsp;";
        if (days.length > 0) {
          var day = days.shift();
          cell.innerHTML = "<span>" + day + "</span>";
          // 为当天的日期添加样式
          if(day == this.Today){
            cell.classList.add("onToday");
          }
          // 在此处筛查签到记录数组中的日期，并赋予样式
          if(day > 0 && signRecodes.length){
            for(let i = 0; i < signRecodes.length; i++){
              if(this.isSame(new Date(this.Year,this.Month - 1, day),signRecode[i])){
								cell.classList.add("onSign");
							}
            }
          }
        }
        row.appendChild(cell);
      }
      frag.appendChild(row);
    }
    this.calendarBox.appendChild(frag);
  },
  // 此函数进行当前月份的日期与签到记录数组里的日期是否相等
  isSame: function(d1, d2){
		d2 = new Date(d2 * 1000);
		return(d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate());
	},
  signIn:function(){
    var now = new Date();
		var Year = now.getFullYear();
		var Month = now.getMonth() + 1;
		if(Year != this.Year || Month != this.Month){
			this.Year = Year;
			this.Month = Month;
			this.isSingIn = true;
			return this.Draw();
		}
    document.getElementsByClassName("onToday")[0].classList.add("onSign");
		this.signDays.push(Date.parse(new Date()) / 1000);
//					此处应当提交修改后的签到数组
		console.log(this.signDays);
  }


}
