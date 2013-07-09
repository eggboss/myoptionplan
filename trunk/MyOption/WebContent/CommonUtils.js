//去除頭尾空白
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
// 去除左側（頭）空白
String.prototype.lTrim = function() {
	return this.replace(/(^\s*)/g, "");
};
// 去除右側（尾）空白
String.prototype.rTrim = function() {
	return this.replace(/(\s*$)/g, "");
};
// 利用LTrim、RTrim來實做的trim
String.prototype.Trim = function() {
	return this.lTrim().rTrim();
};
function formatFloat(num, pos) {
	var size = Math.pow(10, pos);
	return Math.round(num * size) / size;
}