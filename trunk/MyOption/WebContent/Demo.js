// demo 05 
function demo05(){
	var nearExcercisePrice = Math.round(getTAIEX()/100) * 100;
	alert(nearExcercisePrice);
	$('#buy_sale_1_select').val('BUY');
	$('#call_put_1_select').val('CALL');
	$('#excercise_price_1_select').val((nearExcercisePrice+100)+'');
	renewPremium(1);
	
	$('#buy_sale_2_select').val('SALE');
	$('#call_put_2_select').val('CALL');
	$('#excercise_price_2_select').val((nearExcercisePrice+200)+'');
	renewPremium(2);
}