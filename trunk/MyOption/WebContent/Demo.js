// demo 05 
function demo05(){
	empty();
	var nearByExcercisePrice = getNearByExcercisePrice();
	setting(1, 'BUY',  'CALL', nearByExcercisePrice+100);
	setting(2, 'SALE', 'CALL', nearByExcercisePrice+200);
	renewReportTable();
}

function demo06(){
	empty();
	var nearByExcercisePrice = getNearByExcercisePrice();
	setting(1, 'SALE', 'PUT', nearByExcercisePrice-100);
	setting(2, 'BUY',  'PUT', nearByExcercisePrice-200);
	renewReportTable();
}

function empty(){
	for(var i=1; i<=8; i++){
		var obj1Id = 'buy_sale_' + i + '_select';
		var obj2Id = 'all_put_' + i + '_select';
		var obj3Id = 'excercise_price_' + i + '_select';
		$('#'+obj1Id).val('');
		$('#'+obj2Id).val('');
		$('#'+obj3Id).val('');
		renewPremium(i);
	}
}

function setting(idx, buySale, callPut, price){
	$('#buy_sale_'+idx+'_select').val(buySale);
	$('#call_put_'+idx+'_select').val(callPut);
	$('#excercise_price_'+idx+'_select').val(price);
	renewPremium(idx);
}