/*********************************************************
 * 
 *
 *********************************************************/

/**
 * 取得今日的年月，若已超過本月結算日，則會取下個月的
 */
function getNewestOptionYearMonth(){
	var today = new Date();
	if(today.getDate() <= getThirdWednesdate(today)){ // 是否在本月結算之前
		return today.getFullYear() + fill(today.getMonth()+1, 'left', '00', 2);
	}else{
		var nextMonth = new Date(today.getFullYear(), today.getMonth()+1, 1);
		return nextMonth.getFullYear() + fill(nextMonth.getMonth()+1, 'left', '00', 2);
	}
}

/**
 * 取得inputDate所在年月的第三個星期三的日期
 * @param inputDate
 * @returns {Number}
 */
function getThirdWednesdate(inputDate){
	//var today = new Date();
	var firstDateOfThisMonth = new Date(inputDate.getFullYear(), inputDate.getMonth(), 1);
	var firstDay = firstDateOfThisMonth.getDay(); // 取得星期幾，會是 0 ~ 6 的值，0:星期日，1:星期一..6:星期六
	if(firstDay<=3){
		return 1 + 14 + (3 - firstDay);
	}else{
		return 1 + 21 + (3 - firstDay);
	}
}

/**
 * 填充
 * @param source 原始物件
 * @param side left:填在左邊；right:填在右邊
 * @param fillString 要填入的字串
 * @param totalLength 填完後的總長度
 * @returns
 */
function fill(source, side, fillString, totalLength){
	if(side=='right'){
		source = source + fillString;
		return source.substr(0, totalLength);
	}else{
		source = fillString + source;
		return source.substring(source.length-totalLength, source.length);
	}
	// String.substr(N1,N2) ：從指定的位置(N1)截取指定長度(N2)的字串。
	// String.substring(N1,N2) ：從指定的位置(N1)到指定的位置(N2)的字串。
}


var htmlObj;
var targetAmtArray = new Array();
var callAmtArray = new Array();
var putAmtArray = new Array();

function getTAIEX(){
	var $find = $(htmlObj).find(".real-plus-tit").next();
	return $find.html().substr(0, 4);
}

function getNearByExcercisePrice(){
	return Math.round(getTAIEX()/100) * 100;
}

function initOptionDataArray(htmlObj){
	var $find = $(htmlObj).find("tbody");
	$find.each(function( index ) {
		if(index==1){
			var $find2 = $(this).find("tr");
			$find2.each(function( index2 ) {
				if(index2 > 0){
					targetAmtArray[index2-1] = $(this).find("td:eq(7)").text().trim();
					callAmtArray[index2-1] = $(this).find("td:eq(2)").text().trim();
					putAmtArray[index2-1] = $(this).find("td:eq(10)").text().trim();
					//console.log( index2 + ": " + $(this).find("td:eq(7)").text() + ", call: " + $(this).find("td:eq(2)").text() + ", put: " + $(this).find("td:eq(10)").text() );
				}
			});
		}
	});
}

function renewData(){
	var yearMonth = getNewestOptionYearMonth();
	console.log('yearMonth=' + yearMonth);
	$.ajax({
		//url:"http://tw.screener.finance.yahoo.net/future/aa03?opmr=optionfull&opcm=WTXO&opym=201307",
		url:"WTXO_201307.html",
		//url:"NewMarket.html",
		async:false,
		//type: 'get',
		dataType:'text',
		context: document.body,
		success: function(data){
	        htmlObj = data;
	        //alert(data);
	        // init
	        initOptionDataArray(htmlObj);
	    },
	    error: function (xhr, ajaxOptions, thrownError){
	    	console.log('status='+xhr.status);
	        console.log('responseText='+xhr.responseText);
	        console.log('thrownError='+thrownError);
	    }
	});
}

function renewDataByIFrame(){
	var iframe=document.createElement('IFRAME');

	iframe.src='http://tw.screener.finance.yahoo.net/future/aa03?opmr=optionfull&opcm=WTXO&opym=201307';
	iframe.setAttribute('id','testframe');
	iframe.setAttribute('name','testframe');

	if (iframe.attachEvent){
	    iframe.attachEvent("onload", function(){
	        //alert("Local iframe is now loaded.");
	        //alert($(iframe).contents());
	    	iframeOnLoadedCallback();
	    });
	} else {
	    iframe.onload = function(){
	        //alert("Local iframe is now loaded.");
	        //alert($(iframe).contents());
	    	iframeOnLoadedCallback();
	    };
	}
	
	document.body.appendChild(iframe);
}

function iframeOnLoadedCallback(){
	htmlObj = $(iframe).contents();
}

function getOptionTxAmount(target, callOrPut){
	var index = indexOf(targetAmtArray, target);
	if(callOrPut=='CALL'){
		return callAmtArray[index];
	}else{
		return putAmtArray[index];
	}
}

function indexOf(array, value){
	if(array){
		for(var i=0; i<array.length; i++){
			if(array[i]==value){
				return i;
			}
		}
	}
	return -1;
}

function appendBuySaleSelect(parentId){
	var newSelectId = parentId + '_select';
	$('#' + parentId).append('<select id=\'' + newSelectId + '\'></select>');
	$('#' + newSelectId).append('<option value=\'\'></option>');
	$('#' + newSelectId).append('<option value=\'BUY\'>BUY</option>');
	$('#' + newSelectId).append('<option value=\'SALE\'>SALE</option>');
}

function appendCallPutSelect(parentId){
	var newSelectId = parentId + '_select';
	var index = parentId.substr(parentId.length-1, 1);
	var onChangeString = ' onChange=\'renewPremium(' + index + ')\' ';
	$('#' + parentId).append('<select id=\'' + newSelectId + '\' ' + onChangeString + ' ></select>');
	$('#' + newSelectId).append('<option value=\'\'></option>');
	$('#' + newSelectId).append('<option value=\'CALL\'>CALL</option>');
	$('#' + newSelectId).append('<option value=\'PUT\'>PUT</option>');
}

function appendExcercisePriceSelect(parentId){
	var newSelectId = parentId + '_select';
	var index = parentId.substr(parentId.length-1, 1);
	var onChangeString = ' onChange=\'renewPremium(' + index + ')\' ';
	$('#' + parentId).append('<select id=\'' + newSelectId + '\' ' + onChangeString + ' ></select>');
	$('#' + newSelectId).append('<option value=\'\'></option>');
	for(var i=0; i<targetAmtArray.length; i++){
		$('#' + newSelectId).append('<option value=\'' + targetAmtArray[i] + '\'>' + targetAmtArray[i] + '</option>');
	}
}

function renewPremium(index){
	var callPutValue = $('#call_put_' + index + '_select').val();
	var excercisePriceValue = $('#excercise_price_' + index + '_select').val();
	if(callPutValue!='' && excercisePriceValue!=''){
		$('#premium_' + index).text(getOptionTxAmount(excercisePriceValue, callPutValue));
	}
}

function initReportTable(){
	var nearExcercisePrice = Math.round(getTAIEX()/100) * 100;
	var excercisePrice = nearExcercisePrice - 600;
	for(var i=1; i<=13; i++){
		$('#report_' + i + '_0').text(excercisePrice + (i-1)*100);
	}
}

function renewReportTable(){
	//parseInt(str, 10)
	var taiex = parseInt($('#taiex').text(), 10);
	console.log('taiex=' + taiex);
	for(var i=1; i<=8; i++){
		var buySaleValue = $('#buy_sale_' + i + '_select').val();
		var callPutValue = $('#call_put_' + i + '_select').val();
		var excercisePriceValue = $('#excercise_price_' + i + '_select').val();
		var permiumValue = parseInt($('#premium_' + i).text(), 10);
		console.log('permiumValue=' + permiumValue);
		if(buySaleValue!='' && callPutValue!='' && excercisePriceValue!=''){
			for(var j=1; j<=13; j++){
				var objId = 'report_' + j + '_' + i;
				var tempExcercisePrice = parseInt($('#report_' + j + '_0').text(), 10);
				console.log('tempExcercisePrice=' + tempExcercisePrice);
				var tempCalPrice = 0;
				
				if(callPutValue=='CALL'){
					if(buySaleValue=='BUY'){
						if(tempExcercisePrice <= excercisePriceValue){
							tempCalPrice = -1*permiumValue;
						}else{
							tempCalPrice = tempExcercisePrice-excercisePriceValue-permiumValue;
						}
					}else{
						if(tempExcercisePrice <= excercisePriceValue){
							tempCalPrice = permiumValue;
						}else{
							tempCalPrice = (-1)*(tempExcercisePrice-excercisePriceValue-permiumValue);
						}
					}
				}else{
					if(buySaleValue=='BUY'){
						if(tempExcercisePrice >= excercisePriceValue){
							tempCalPrice = -1*permiumValue;
						}else{
							tempCalPrice = tempExcercisePrice-excercisePriceValue-permiumValue;
						}
					}else{
						if(tempExcercisePrice >= excercisePriceValue){
							tempCalPrice = permiumValue;
						}else{
							tempCalPrice = (-1)*(tempExcercisePrice-excercisePriceValue-permiumValue);
						}
					}
				}
				
				$('#' + objId).text(tempCalPrice);
				if(tempCalPrice<0){
					$('#' + objId).css('color', 'red');
				}else{
					$('#' + objId).css('color', 'black');
				}
			}
		}
	}
	
	// TOTAL
	calculateTotal();
}

function calculateTotal(){
	for(var i=1; i<=13; i++){
		var totalId = 'report_' + i + '_9';
		var totalValue = 0;
		
		// summary
		for(var j=1; j<=8; j++){
			var tempId = 'report_' + i + '_' + j;
			var tempValue = $('#' + tempId).text()=='' ? 0 : parseInt($('#' + tempId).text(), 10);
			
			totalValue += tempValue;
		}
		
		$('#' + totalId).text(totalValue);
		if(totalValue < 0) $('#' + totalId).css('color', 'red');
	}
	
}
