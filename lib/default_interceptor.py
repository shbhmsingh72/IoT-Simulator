
from py_mqtt_client import MQTTclient  #importing class MQTTclient 

#Interceptor function name should not be changed
def intercept(client,topic_name,data):
	print ("\n Interceptor running\n client id: {0} Received Msg: {1} from Topic: {2}\n".format(client.get_clientid(),data,topic_name))
	return True #<----Return true if request responce file need to executed
