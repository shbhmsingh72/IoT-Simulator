import BW_JavaAPI.BWSimREST;
class API_Example
{
	public static void main(String arg[]) throws InterruptedException
	{
		BWSimREST api=new BWSimREST();
		String s;
		s=api.addClient("Client1","MySensor");
		System.out.println(s);
		s=api.addNewSubscribe("Client1","Topic");
		System.out.println(s);
		s=api.addNewSubscribe("Client1","Topic1");
		System.out.println(s);
		s=api.addClient("Client2","Mobile");
		System.out.println(s);
		s=api.addNewSubscribe("Client2","Topic");
		System.out.println(s);
		s=api.addNewSubscribe("Client2","Topic2");
		System.out.println(s);
		s=api.addClient("Client3","NewSensor");
		System.out.println(s);
		s=api.addNewSubscribe("Client3","Topic");
		System.out.println(s);
		s=api.addNewSubscribe("Client3","Topic3");
		System.out.println(s);
		s=api.addResponseforRequest("Client1","Topic","Hello","Topic1","ReqRes1");
		System.out.println(s);
		s=api.addResponseforRequest("Client2","Topic","Hello","Topic2","ReqRes2");
		System.out.println(s);
		s=api.addResponseforRequest("Client3","Topic","Hello","Topic3","ReqRes3");
		System.out.println(s);
		s=api.startclient("Client1");
		System.out.println(s);
		s=api.startclient("Client2");
		System.out.println(s);
		s=api.startclient("Client3");
		Thread.sleep(10000);
		s=api.publish("pubclient1","Topic","Hello");
		Thread.sleep(5000);
		s=api.publish("pubclient2","Topic","Hello");
		Thread.sleep(3000);
		System.out.println("Unsubscribing Topic1,Topic2,Topic3");
		s=api.unsubscribe("Client1","Topic1");
		System.out.println(s);
		s=api.unsubscribe("Client2","Topic2");
		System.out.println(s);
		s=api.unsubscribe("Client3","Topic3");
		System.out.println(s);
		System.out.println("Publishing Topic");
		s=api.publish("pubclient1","Topic","Hello");
		System.out.println(s);
		s=api.publish("pubclient2","Topic","Hello");
		System.out.println(s);
		Thread.sleep(2000);
		s=api.stopclient("Client1");
		System.out.println(s);
		s=api.stopclient("Client2");
		System.out.println(s);
		s=api.stopclient("Client3");
		System.out.println(s);


	}
}
