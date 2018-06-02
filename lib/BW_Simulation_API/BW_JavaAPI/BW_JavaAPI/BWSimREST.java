package BW_JavaAPI;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.regex.*;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class BWSimREST {

	
	public static String API_URL;
	public static String urlParameters;
	public static byte[] postData;
	public static String port;
	Properties prop = new Properties();
	InputStream input = null;

	
	public BWSimREST()
	{
	
	try {

		input = new FileInputStream("../../../conf/db.conf");

		prop.load(input);

		port=prop.getProperty("HTTP_SERVER_PORT");

	} catch (IOException ex) {
		ex.printStackTrace();
	} finally {
		if (input != null) {
			try {
				input.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

  

	}
	
	public static String addClient(String clientname)
	{
		String s=addClient(clientname,"description",0,0," "," ",0,0);
		return s;
	}
	public static String addClient(String clientname , String desc)
	{
		String s=addClient(clientname,desc,0,0," "," ",0,0);
		return s;
	}
	public static String addClient(String clientname , String desc, int clean_session)
	{
		String s=addClient(clientname,desc,clean_session,0," "," ",0,0);
		return s;
	}
	public static String addClient(String clientname , String desc, int clean_session,int will_flag,String willtopic,String willmessage)
	{
		String s=addClient(clientname,desc,clean_session,will_flag,willtopic,willmessage,0,0);
		return s;
	}
	public static String addClient(String clientname , String desc, int clean_session,int will_flag,String willtopic,String willmessage,int willqos)
	{
		String s=addClient(clientname,desc,clean_session,will_flag,willtopic,willmessage,willqos,0);
		return s;
	}


	public static String addClient(String clientname , String desc, int clean_session,int will_flag,String willtopic,String willmessage,int willqos,int willretain)
	{
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";
		if (!desc.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid description. Only alphabets,numbers,/,_,space are allowed";
		if (!willtopic.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid willtopic. Only alphabets,numbers,/,_,space are allowed";
		if (!willmessage.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid willmessage. Only alphabets,numbers,/,_,space are allowed";
		if (clean_session < 0 || clean_session >1)
			return "Invalid clean session. Value should be 0 or 1";
		if (will_flag < 0 || will_flag >1)
			return "Invalid will flag. Value should be 0 or 1";
		if (willqos < 0 || willqos >2)
			return "Invalid will qos. Value should be 0,1 or 2";
		if (willretain < 0 || willretain >1)
			return "Invalid will retain. Value should be 0 or 1";
		if (will_flag==1)
			if (willtopic==" " || willmessage==" ")
				return "Willflag is set. Will topic/message cannot be empty";



		urlParameters  = "param1="+clientname+"&param2="+desc+"&param3="+clean_session+"&param4="+will_flag+"&param5="+willtopic+"&param6="+willmessage+"&param7="+willqos+"&param8="+willretain;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8);
		API_URL = "http://localhost:"+port+"/api/addclient";
		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}
	}
	public static String removeClient(String clientname)
	{
		
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";

		urlParameters  = "param1="+clientname;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );
		API_URL = "http://localhost:"+port+"/api/removeclient";
		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}
	public static String getClientList()
	{
		API_URL = "http://localhost:"+port+"/api/get/clientlist";
		try
		{
			String s=sendGET();
			return s;
		}
		catch(Exception e)
		{
			return e+"";
		}
	}
	public static String getClientDetails(String clientname)
	{
		try
		{
			clientname=java.net.URLEncoder.encode(clientname, "UTF-8");
		}
		catch(java.io.UnsupportedEncodingException e)
		{
			return "UTF-8 Encoding is not supported";
		}

		if (!clientname.matches("[a-zA-Z 0-9/_+]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";

		API_URL="http://localhost:"+port+"/api/get/clientdetails?client_name="+clientname;
		try
		{
			String s=sendGET();
			return s;
		}
		catch(Exception e)
		{
			return e+"";
		}
		 
	}


	public static String getSubscribersOf(String topic)
	{
		try
		{
			topic=java.net.URLEncoder.encode(topic, "UTF-8");
		}
		catch(java.io.UnsupportedEncodingException e)
		{
			return "UTF-8 Encoding is not supported";
		}


		if (!topic.matches("[a-zA-Z 0-9/_+%2F]+"))
			return "Invalid topic. Only alphabets,numbers,/,_,space are allowed";

		API_URL="http://localhost:"+port+"/api/get/topicdetails?topic="+topic;
		try
		{
			String s=sendGET();
			return s;
		}
		catch(Exception e)
		{
			return e+"";
		}
		 
	}
	

	public static String getSubscribeDetails(String clientname)
	{
		try
		{
			clientname=java.net.URLEncoder.encode(clientname, "UTF-8");
		}
		catch(java.io.UnsupportedEncodingException e)
		{
			return "UTF-8 Encoding is not supported";
		}

		
		if (!clientname.matches("[a-zA-Z 0-9/_+]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";

		API_URL="http://localhost:"+port+"/api/get/subscribedetails?client_name="+clientname;
		try
		{
			String s=sendGET();
			return s;
		}
		catch(Exception e)
		{
			return e+"";
		}
		 
	}

	public static String getPublishDetails(String clientname)
	{
		try
		{
			clientname=java.net.URLEncoder.encode(clientname, "UTF-8");
		}
		catch(java.io.UnsupportedEncodingException e)
		{
			return "UTF-8 Encoding is not supported";
		}


		if (!clientname.matches("[a-zA-Z 0-9/_+]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";

		API_URL="http://localhost:"+port+"/api/get/publishdetails?client_name="+clientname;
		try
		{
			String s=sendGET();
			return s;
		}
		catch(Exception e)
		{
			return e+"";
		}
		 
	}

	public static String unsubscribe(String clientname,String topic)
	{
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";
		if (!topic.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid topic. Only alphabets,numbers,/,_,space are allowed";

		urlParameters  = "param1="+clientname+"&param2="+topic;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );
		API_URL = "http://localhost:"+port+"/api/unsubscribe";
		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}

	public static String unsubscribeAll()
	{
		API_URL = "http://localhost:"+port+"/api/unsubscribeall";
		urlParameters  = "param1=x";
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}


	public static String startclient(String clientname)
	{
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";

		API_URL = "http://localhost:"+port+"/api/startclient";
		urlParameters  = "param1="+clientname;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}

	public static String stopclient(String clientname)
	{
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";

		API_URL = "http://localhost:"+port+"/api/stopclient";
		urlParameters  = "param1="+clientname;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}
	public static String subscribe()
	{
		API_URL = "http://localhost:"+port+"/api/subscribe";
		urlParameters  = "param1=";
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}

	public static String subscribe(String clientname,String topic)
	{
		String s=subscribe(clientname,topic,0,false);
		return s;
	}

	public static String subscribe(String clientname,String topic,int qos)
	{
		String s=subscribe(clientname,topic,qos,false);
		return s;

	}
	public static String subscribe(String clientname,String topic,int qos,boolean addtodb)
	{
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";
		if (!topic.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid topic. Only alphabets,numbers,/,_,space are allowed";
		if (qos < 0 || qos >2)
			return "Invalid qos. Value should be 0,1 or 2";

		API_URL = "http://localhost:"+port+"/api/subscribeclient";
		urlParameters  = "param1="+clientname+"&param2="+topic+"&param3="+qos+"&param4="+addtodb;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}


	public static String publish()
	{
		API_URL = "http://localhost:"+port+"/api/publish";
		urlParameters  = "param1=x";
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}


	public static String publish(String clientname,String topic,String message)
	{
		String s=publish(clientname,topic,message,0,1,false);
		return s;
	}


	public static String publish(String clientname,String topic,String message,int qos)
	{
		String s=publish(clientname,topic,message,qos,1,false);
		return s;

	}

	public static String publish(String clientname,String topic,String message,int qos,int retain)
	{
		String s=publish(clientname,topic,message,qos,retain,false);
		return s;


	}


	public static String publish(String clientname,String topic,String message,int qos,int retain,boolean addtodb)
	{
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";
		if (!topic.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid topic. Only alphabets,numbers,/,_,space are allowed";
		if (!message.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid message. Only alphabets,numbers,/,_,space are allowed";

		if (qos < 0 || qos >2)
			return "Invalid qos. Value should be 0,1 or 2";
		if (retain < 0 || retain >1)
			return "Invalid retain. Value should be 0 or 1";


		API_URL = "http://localhost:"+port+"/api/publishclient";
		urlParameters  = "param1="+clientname+"&param2="+topic+"&param3="+message+"&param4="+qos+"&param5="+retain+"&param6="+addtodb;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}

	public static String stoppublish()
	{
		API_URL = "http://localhost:"+port+"/api/stoppublish";
		urlParameters  = "param1=";
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}


	public static String stoppublish(String clientname)
	{
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";

		API_URL = "http://localhost:"+port+"/api/stoppublish";
		urlParameters  = "param1="+clientname;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}

	public static String addResponseforRequest(String clientname, String request_topic, String request_message, String response_topic, String response_message)
	{
		String s=addResponseforRequest(clientname,request_topic,request_message,response_topic,response_message,0,0);
		return s;
	}

	public static String addResponseforRequest(String clientname, String request_topic, String request_message, String response_topic, String response_message,int qos)
	{
		String s=addResponseforRequest(clientname,request_topic,request_message,response_topic,response_message,qos,0);
		return s;

	}


	public static String addResponseforRequest(String clientname, String request_topic, String request_message, String response_topic, String response_message,int qos,int retain)
	{
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";
		if (!request_topic.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid request topic. Only alphabets,numbers,/,_,space are allowed";
		if (!request_message.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid request message. Only alphabets,numbers,/,_,space are allowed";
		if (!response_topic.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid response topic. Only alphabets,numbers,/,_,space are allowed";
		if (!response_message.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid response message. Only alphabets,numbers,/,_,space are allowed";

		if (qos < 0 || qos >2)
			return "Invalid qos. Value should be 0,1 or 2";
		if (retain < 0 || retain >1)
			return "Invalid retain. Value should be 0 or 1";


		API_URL = "http://localhost:"+port+"/api/addresponse";
		urlParameters  = "param1="+clientname+"&param2="+request_topic+"&param3="+request_message+"&param4="+response_topic+"&param5="+response_message+"&param6="+qos+"&param7="+retain;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}
	public static String addNewPublishMessage(String clientname, String topic, String message)
	{
		String s=addNewPublishMessage(clientname,topic,message,0,0);
		return s;
	}

	public static String addNewPublishMessage(String clientname, String topic, String message,int qos)
	{
		String s=addNewPublishMessage(clientname,topic,message,qos,0);
		return s;
	}
	public static String addNewPublishMessage(String clientname, String topic, String message,int qos,int retain)
	{
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";
		if (!topic.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid topic. Only alphabets,numbers,/,_,space are allowed";
		if (!message.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid message. Only alphabets,numbers,/,_,space are allowed";

		if (qos < 0 || qos >2)
			return "Invalid qos. Value should be 0,1 or 2";
		if (retain < 0 || retain >1)
			return "Invalid retain. Value should be 0 or 1";

		API_URL = "http://localhost:"+port+"/api/addpublish";
		urlParameters  = "param1="+clientname+"&param2="+topic+"&param3="+message+"&param4="+qos+"&param5="+retain;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}

	public static String addNewSubscribe(String clientname, String topic)
	{
		String s=addNewSubscribe(clientname,topic,0);
		return s;
	}


	public static String addNewSubscribe(String clientname, String topic,int qos)
	{
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";
		if (!topic.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid topic. Only alphabets,numbers,/,_,space are allowed";
		if (qos < 0 || qos >2)
			return "Invalid qos. Value should be 0,1 or 2";

		API_URL = "http://localhost:"+port+"/api/addsubscribe";
		urlParameters  = "param1="+clientname+"&param2="+topic+"&param3="+qos;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}

	public static String removePublishMessage(String clientname)
	{
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";

		API_URL = "http://localhost:"+port+"/api/removeallpublish";
		urlParameters  = "param1="+clientname;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}

	public static String removePublishMessage(String clientname, String topic)
	{
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";
		if (!topic.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid topic. Only alphabets,numbers,/,_,space are allowed";

		API_URL = "http://localhost:"+port+"/api/removepublish";
		urlParameters  = "param1="+clientname+"&param2="+topic;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}


	public static String removeSubscribe(String clientname)
	{
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";
		API_URL = "http://localhost:"+port+"/api/removeallsubscribe";
		urlParameters  = "param1="+clientname;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}

	public static String removeSubscribe(String clientname, String topic)
	{
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";
		if (!topic.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid topic. Only alphabets,numbers,/,_,space are allowed";
		API_URL = "http://localhost:"+port+"/api/removesubscribe";
		urlParameters  = "param1="+clientname+"&param2="+topic;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}
	public static String removeResponseforRequest(String clientname)
	{
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";

		API_URL = "http://localhost:"+port+"/api/removeallresponse";
		urlParameters  = "param1="+clientname;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}

	public static String removeResponseforRequest(String clientname, String req_topic)
	{
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";
		if (!req_topic.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid request topic. Only alphabets,numbers,/,_,space are allowed";

		API_URL = "http://localhost:"+port+"/api/removeresponse";
		urlParameters  = "param1="+clientname+"&param2="+req_topic;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}
	public static String stopResponseforRequest(String clientname, String request_topic)
	{
		if (!clientname.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid clientname. Only alphabets,numbers,/,_,space are allowed";
		if (!request_topic.matches("[a-zA-Z 0-9/_]+"))
			return "Invalid request topic. Only alphabets,numbers,/,_,space are allowed";
		API_URL = "http://localhost:"+port+"/api/stopres";
		urlParameters  = "param1="+clientname+"&param2="+request_topic;
		postData = urlParameters.getBytes(StandardCharsets.UTF_8 );

		try
		{
			String s=sendPOST();
		
			return s;
		}
		catch(Exception e)
		{
		 	return e+"";
		}

	}

	public static String sendGET() throws IOException {
		URL obj = new URL(API_URL);
		HttpURLConnection con;
		int responseCode;
		try
		{
			con = (HttpURLConnection) obj.openConnection();
			con.setRequestMethod("GET");
			responseCode = con.getResponseCode();
		}
		catch(java.net.ConnectException e)
		{
			return "Unable to bind with Port "+port+". Please restart the simulator";
		}
		if (responseCode == HttpURLConnection.HTTP_OK) { 
			BufferedReader in = new BufferedReader(new InputStreamReader(
					con.getInputStream()));
			String inputLine;
			StringBuffer response = new StringBuffer();

			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
			in.close();

	
			return(response.toString());
		} else {
			return("Unable to perform the required function");
		}

	}

	public static String sendPOST() throws IOException {
		URL obj = new URL(API_URL);
		HttpURLConnection con;
		int responseCode;
		try
		{
			con = (HttpURLConnection) obj.openConnection();
			con.setRequestMethod("POST");
			con.setDoOutput(true);
			OutputStream os = con.getOutputStream();
			os.write(postData);
			os.flush();
			os.close();
			responseCode = con.getResponseCode();
		}
		catch(java.net.ConnectException e)
		{
			return "Unable to bind with Port "+port+" . Please restart the simulator";
		}


		if (responseCode == HttpURLConnection.HTTP_OK) { 
			BufferedReader in = new BufferedReader(new InputStreamReader(
					con.getInputStream()));
			String inputLine;
			StringBuffer response = new StringBuffer();

			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
			in.close();

			
			return(response.toString());
		} else {
			return("Unable to perform the required function");
		}
	}

}

