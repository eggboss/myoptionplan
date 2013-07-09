package kirk.myoption.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

public class Test {
	public static void main(String[] args) throws Exception{
		String url = "http://tw.screener.finance.yahoo.net/future/aa03?opmr=optionfull&opcm=WTXO&opym=201307";
		
		HttpClient httpclient = new DefaultHttpClient();
		
		HttpGet httpget = new HttpGet(url);
        HttpResponse response = httpclient.execute(httpget);
        HttpEntity entity = response.getEntity();
        InputStream is = entity.getContent();
        
		String filePath = "h:/WTXO_201307.html";
		FileOutputStream fos = new FileOutputStream(new File(filePath));
		int inByte;
		while((inByte = is.read()) != -1){
			fos.write(inByte);
		}
		is.close();
		fos.close();
	}
}
