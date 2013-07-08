// Trim() , Ltrim() , RTrim()
String.prototype.trim = function() { return this.replace(/(^\s*)|(\s*$)/g, ""); } //去除頭尾空白
String.prototype.lTrim = function() { return this.replace(/(^\s*)/g, ""); }       //去除左側（頭）空白
String.prototype.rTrim = function() { return this.replace(/(\s*$)/g, ""); }       //去除右側（尾）空白
String.prototype.Trim= function() { return this.lTrim().rTrim(); }                //利用LTrim、RTrim來實做的trim