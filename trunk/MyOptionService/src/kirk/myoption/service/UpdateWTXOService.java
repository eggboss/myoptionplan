package kirk.myoption.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

public class UpdateWTXOService {
	private String url = "http://tw.screener.finance.yahoo.net/future/aa03?opmr=optionfull&opcm=WTXO&opym=";
	private String defaultOutputFilePath = "d:/projects/fet_settlement/workspace/MyOption/WebContent/WTXO_201307.html";
	private String outputFilePath = null;
	
	private SimpleDateFormat timeFormat = new SimpleDateFormat("HHmm");
	private SimpleDateFormat timeFormat2 = new SimpleDateFormat("HH:mm:ss");
	
	{
		System.out.println("MyOption Service Begin...");
		System.out.println("Update from site : " + getUrl());
		System.out.println("Output file path : " + outputFilePath);
	}
	
	public String getUrl(){
		return url + getNewestOptionYearMonth();
	}
	
	public String getOutputFilePath(){
		if(outputFilePath!=null){
			return outputFilePath;
		}else{
			return defaultOutputFilePath;
		}
	}
	
	public void setOutputFilePath(String outputFilePath){
		this.outputFilePath = outputFilePath;
	}
	
	// 第一個星期三是幾號
	public int getThirdWednesdate(Calendar date){
		date.set(Calendar.DAY_OF_MONTH, 1);
		int dayOfWeek = date.get(Calendar.DAY_OF_WEEK);
		if(dayOfWeek<=3){
			return 1 + 14 + (3 - dayOfWeek);
		}else{
			return 1 + 21 + (3 - dayOfWeek);
		}
	}
	
	public String getNewestOptionYearMonth(){
		Calendar date = Calendar.getInstance();
		int year = date.get(Calendar.YEAR);
		int month = date.get(Calendar.MONTH);
		int dayOfMonth = date.get(Calendar.DAY_OF_MONTH);
		if(dayOfMonth <= getThirdWednesdate(date)){
			String monthString = "00"+(month+1);
			return year + monthString.substring(monthString.length()-2, monthString.length());
		}else{
			String monthString = "00"+(month+2);
			return year + monthString.substring(monthString.length()-2, monthString.length());
		}
		
	}
	
	public boolean checkTime(){
		Date now = new Date();
		int nowInt = Integer.parseInt(timeFormat.format(now));
		if( 845 <= nowInt && 1350 >= nowInt ){
			return true;
		}else{
			System.out.println("Over Time ! " + nowInt);
			return false;
		}
	}
	
	public void start() throws Exception{
		System.out.println("update at " + timeFormat2.format(new Date()));
		
		HttpClient httpclient = new DefaultHttpClient();
		HttpGet httpget = new HttpGet(url);
        HttpResponse response = httpclient.execute(httpget);
        HttpEntity entity = response.getEntity();
        InputStream is = entity.getContent();
        
		String filePath = getOutputFilePath();
		FileOutputStream fos = new FileOutputStream(new File(filePath));
		int inByte;
		while((inByte = is.read()) != -1){
			fos.write(inByte);
		}
		is.close();
		fos.close();
	}
	
	public static void main(String[] args) throws Exception{
		
		UpdateWTXOService service = new UpdateWTXOService();

		if(args!=null && args.length>0){
			service.setOutputFilePath(args[1]);
		}
		
		while(service.checkTime()){
			service.start();
			
			Thread.sleep(180*1000); // 毫秒
		}
		
	}
	
}
