#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#ifdef _WIN32
	#include <windows.h> 
	typedef unsigned __int8   uint8_t;
	typedef unsigned __int16  uint16_t;
	typedef unsigned long ssize_t;
#else
	#include <unistd.h>
#endif
int l=1;
int BMQ_Callback_Publish(char *topic_name,uint16_t topic_length,void *data,long unsigned int data_length)
{
    printf("Topic:%s\t Data%d:%s\n",topic_name,l++,data);
}

int main()
{
	int rc;
	int portno=1883;
	//As per MQTT NonTLS=1883 TLS=8883
	char *hostname="mqttserver.com";
	//instead of host name use IP "127.0.0.1"
	uint16_t timeout=60;
	int clean_session=0;
	char *clientid="client_Name";
	uint16_t clientid_length=strlen(clientid);
	char *username = "username";
	char *password = "password";
	uint16_t username_length=0;
	uint16_t password_length=0;
	unsigned char will_qos=0;
	unsigned char will_retain=0;
	char *will_topic="will_topic";
	uint16_t will_topic_length=strlen(will_topic);
	char *will_message="will_message";
	unsigned long int will_message_length=strlen(will_message);

	rc=BMQ_Connect(portno,hostname,timeout,clean_session,clientid,clientid_length,username_length,username,password_length,password,&BMQ_Callback_Publish);
	//rc=BMQ_Will_Connect(portno,hostname,timeout,clean_session,clientid,clientid_length,username_length,password_length,username,password,will_qos,will_retain,will_topic,will_topic_length,will_message,will_message_length,&BMQ_Callback_Publish);
	if (rc>0)
		printf("Successfully connected to MQTTServer.com\n");
	else
		printf("Server Unavailable\n");

	char *topic_name="topic";
	uint16_t topiclength=strlen(topic_name);
	char *data="Message";
	long unsigned int datalength=strlen(data);
	uint8_t qos=0;
	uint8_t retain=0;
	int result;
	result=BMQ_Subscribe(topic_name,topiclength,qos);
	if (result==1)
		printf("Subscribe Success\n");
	else
		printf("Subscribe Failed\n");

	for (int i = 0; i < 10; i++)
	{
		result=BMQ_Publish(topic_name,topiclength,data,datalength,retain,qos);
	//	if (result==1)
	//		printf("Message%d Sucessfully Published \n",i);
	//	else
	//		printf("Message%d Publish Failed\n",i);
	}
	printf("Sleeping 5 seconds\n");
	Sleep(5000);

	result=BMQ_Unsubscribe(topic_name,topiclength);
	if (result==1)
		printf("UnSubscribe Success\n");
	else
		printf("UnSubscribe Failed\n");

	for (int i = 0; i < 10; i++)
	{
		result=BMQ_Publish(topic_name,topiclength,data,datalength,retain,qos);
		if (result==1)
			printf("Message%d Sucessfully Published \n",i);
		else
			printf("Message%d Publish Failed\n",i);
	}
	printf("Sleeping 5 seconds\n");
	Sleep(5000);

	result=BMQ_Disconnect();
	if (result==1)
		printf("Disconnect Success\n");
	else
		printf("Disconnect Failed\n");
	printf("Exiting after 2 seconds\n");
	Sleep(2000); 
	return 0;
}
