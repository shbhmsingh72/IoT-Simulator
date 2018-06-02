import sys
import requests
import json
import os
import ConfigParser
from SimAPI_Error import ParameterError

dbconfParser = ConfigParser.RawConfigParser()  
global server
server='127.0.0.1'
global port
port='9000'
try:

	dbconfPath = r'../../conf/db.conf'
	dbconfParser.read(dbconfPath)
	port = dbconfParser.get('CONFIG', 'HTTP_SERVER_PORT')
except Exception as e:
	print 'Check whether db.conf is available in conf folder'



def check_special(s):
    string=""  
    for e in s:
	if (e.isalnum()):
		string=string+e
	elif ((e=="/") or (e=="_") or (e==" ") or (e=="")) :
		string=string+e
	else:
		string="reject@wronginput"
		break
    return string

def addClient(clientname , desc="description",clean_session=0,will_flag=0,willtopic="",willmessage="",willqos=1,willretain=0):

	try:
		if (check_special(clientname)=="reject@wronginput"):
			raise ParameterError(1001)
			os._exit(0)
		if (check_special(desc)=="reject@wronginput"):
			raise ParameterError(1101)
			os._exit(0) 
		if clientname=="":
			raise ParameterError(1011)
			os._exit(0)
		if (will_flag==1):
			if (willtopic=="" or willmessage==""):
				raise ParameterError(1103)
			elif (check_special(willtopic)=="reject@wronginput") or (check_special(willmessage)=="reject@wronginput"):
				raise ParameterError(1013)
		url="http://"+server+":"+port+"/api/addclient"  
		headers = {'content-type': 'application/json'}
		data={'cl_name' : clientname , 'description':desc, 'clean_session':clean_session,'will_flag':will_flag,'willtopic':willtopic,'willmessage':willmessage,'willqos':willqos,'willretain':willretain }		 
		params="{}"
		response = requests.post(url,params=data,headers=headers)
		return json.loads(response.text)
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port  "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		if (e.args[0]==1011):
			return "%s \n%d : %s"%(e.bm[0],e.args[0],e.pm[e.args[0]] )
		else:
			return "%s %d : %s"%(e.bm[0],e.args[0],e.pm[e.args[0]] )
	except Exception as e:
		return e.args[0]


def removeClient(clientname):
	try:
		if (check_special(clientname)=="reject@wronginput"):
			raise ParameterError(1001)
			os._exit(0)
		if clientname=="":
			raise ParameterError(1011)
			os._exit(0)

		url="http://"+server+":"+port+"/api/removeclient"  
		headers = {'content-type': 'application/json'}
		data={'cl_name' : clientname }
		params="{}"
		response = requests.post(url, params=data, headers=headers)
		return json.loads(response.text) 
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		if (e.args[0]==1011):
			return "%s \n%d: %s"%(e.bm[0],e.args[0],e.pm[e.args[0]] )
		else:
			return "%s %s \n%d: %s"%(e.bm[0],e.em[0],e.args[0],e.pm[e.args[0]] )
	except Exception as e:
		return e.args[0]


def getClientList():
	try:
		url="http://"+server+":"+port+"/api/get/clientlist"  
		response = requests.get(url)
		return json.loads(response.text)
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except Exception as e:
		pass


def getClientDetails(clientname):
	try:
		if (check_special(clientname)=="reject@wronginput"):
			raise ParameterError(1001)
			os._exit(0)
		if clientname=="":
			raise ParameterError(1011)
			os._exit(0)

		url="http://"+server+":"+port+"/api/get/clientdetails?client_name="+clientname  
		response = requests.get(url)
		return json.loads(response.text) 
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		if (e.args[0]==1011):
			return "%s \n%d: %s"%(e.bm[0],e.args[0],e.pm[e.args[0]] )
		else:
			return "%s %s \n%d: %s"%(e.bm[0],e.em[0],e.args[0],e.pm[e.args[0]] )

	except Exception as e:
		pass



def getSubscribersOf(topic):
	try:
		if (check_special(topic)=="reject@wronginput"):
			raise ParameterError(1001)
			os._exit(0)
		if topic=="":
			raise ParameterError(1011)
			os._exit(0)

		url="http://"+server+":"+port+"/api/get/topicdetails?topic="+topic  
		response = requests.get(url)
		return json.loads(response.text) 
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		if (e.args[0]==1011):
			return "%s \n%d: %s"%(e.bm[0],e.args[0],e.pm[e.args[0]] )
		else:
			return "%s %s \n%d: %s"%(e.bm[0],e.em[0],e.args[0],e.pm[e.args[0]] )
	except Exception as e:
		pass

def getSubscribeDetails(clientname):
	try:
		if (check_special(clientname)=="reject@wronginput"):
			raise ParameterError(1001)
			os._exit(0)
		if clientname=="":
			raise ParameterError(1011)
			os._exit(0)

		url="http://"+server+":"+port+"/api/get/subscribedetails?client_name="+clientname  
		response = requests.get(url)
		return json.loads(response.text)
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		if (e.args[0]==1011):
			return "%s \n%d: %s"%(e.bm[0],e.args[0],e.pm[e.args[0]] )
		else:
			return "%s %s \n%d: %s"%(e.bm[0],e.em[0],e.args[0],e.pm[e.args[0]] )

	except Exception as e:
		pass

def getPublishDetails(clientname):
	try:
		if (check_special(clientname)=="reject@wronginput"):
			raise ParameterError(1001)
			os._exit(0)
		if clientname=="":
			raise ParameterError(1011)
			os._exit(0)

		url="http://"+server+":"+port+"/api/get/publishdetails?client_name="+clientname  
		response = requests.get(url)
		return json.loads(response.text)
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		if (e.args[0]==1011):
			return "%s \n%d: %s"%(e.bm[0],e.args[0],e.pm[e.args[0]] )
		else:
			return "%s %s \n%d: %s"%(e.bm[0],e.em[0],e.args[0],e.pm[e.args[0]] )

	except Exception as e:
		pass

def addResponseforRequest(clientname,request_topic,request_message,response_topic,response_message,qos=0,retain=0):

	try:
		if (check_special(clientname)=="reject@wronginput"):
			raise ParameterError(1001)
			os._exit(0)
		if (check_special(request_topic)=="reject@wronginput"):
			raise ParameterError(1006)
			os._exit(0)
		if (check_special(request_message)=="reject@wronginput"):
			raise ParameterError(1007)
			os._exit(0)
		if (check_special(response_topic)=="reject@wronginput"):
			raise ParameterError(1008)
			os._exit(0)
		if (check_special(response_message)=="reject@wronginput"):
			raise ParameterError(1009)
			os._exit(0)

		try:
			qos=int(qos)
			if (qos<0 or qos>2):
				raise ParameterError(1004)
				os._exit(0)
		except:
			raise ParameterError(1104)
			os._exit(0)
		try:
			retain=int(retain)
			if (retain<0 or qos>1):
				raise ParameterError(1105)
				os._exit(0)
		except:
			raise ParameterError(1005)
			os._exit(0)

		if clientname=="" or request_topic=="" or request_message=="" or response_topic=="" or response_message=="":
			raise ParameterError(1011)
			os._exit(0)


		url="http://"+server+":"+port+"/api/addresponse"  
		headers = {'content-type': 'application/json'}
		data={ 'cl_name' : clientname , 'req_t' : request_topic, 'req_m' : request_message, 'res_t' : response_topic, 'res_m' : response_message, 'q' : qos, 'r':retain }
		params="{}"
		response = requests.post(url, params=data, headers=headers)
		return json.loads(response.text)
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		if (e.args[0]==1011):
			return "%s \n%d: %s"%(e.bm[0],e.args[0],e.pm[e.args[0]] )
		else:
			return "%s %s \n%d: %s"%(e.bm[0],e.em[0],e.args[0],e.pm[e.args[0]] )

	except Exception as e:
		return 'BW-IoT 1012: Parameter Type mismatch'


def addNewPublishMessage(clientname, topic, message,qos=0,retain=0):

	try:
		if (check_special(clientname)=="reject@wronginput"):
			raise ParameterError(1001)
			os._exit(0)

		if (check_special(topic)=="reject@wronginput"):
			raise ParameterError(1002)
			os._exit(0)
		if (check_special(message)=="reject@wronginput"):
			raise ParameterError(1003)
			os._exit(0)
		try:
			qos=int(qos)
			if (qos<0 or qos>2):
				raise ParameterError(1004)
				os._exit(0)
		except:
			raise ParameterError(1104)
			os._exit(0)
		try:
			retain=int(retain)
			if (retain<0 or qos>1):
				raise ParameterError(1105)
				os._exit(0)
		except:
			raise ParameterError(1005)
			os._exit(0)
		if clientname=="" or topic=="" or message=="":
			raise ParameterError(1011)
			os._exit(0)


		url="http://"+server+":"+port+"/api/addpublish"  
		headers = {'content-type': 'application/json'}
		data={'cl_name' : clientname , 't' :topic, 'm' : message,'q' : qos, 'r':retain }		 
		params="{}"
		response = requests.post(url, params=data, headers=headers)
		return json.loads(response.text) 
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		if (e.args[0]==1011):
			return "%s \n%d: %s"%(e.bm[0],e.args[0],e.pm[e.args[0]] )
		else:
			return "%s %s \n%d: %s"%(e.bm[0],e.em[0],e.args[0],e.pm[e.args[0]] )

	except Exception as e:
	     	return 'BW-IoT 1012: Parameter Type mismatch'


def addNewSubscribe(clientname, topic,qos=0):

	try:
		if (check_special(clientname)=="reject@wronginput"):
			raise ParameterError(1001)
			os._exit(0)

		if (check_special(topic)=="reject@wronginput"):
			raise ParameterError(1002)
			os._exit(0)
		try:
			qos=int(qos)
			if (qos<0 or qos>2):
				raise ParameterError(1104)
				os._exit(0)
		except:
			raise ParameterError(1004)
			os._exit(0)
		if clientname=="" or topic=="":
			raise ParameterError(1011)
			os._exit(0)


		url="http://"+server+":"+port+"/api/addsubscribe"  
		headers = {'content-type': 'application/json'}
		data={'cl_name' : clientname ,'t' : topic,  'q' : qos }
		params="{}"
		response = requests.post(url, params=data, headers=headers)
		return json.loads(response.text) 
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		if (e.args[0]==1011):
			return "%s \n%d: %s"%(e.bm[0],e.args[0],e.pm[e.args[0]] )
		else:
			return "%s %s \n%d: %s"%(e.bm[0],e.em[0],e.args[0],e.pm[e.args[0]] )

	except Exception as e:
    		return 'BW-IoT 1012: Parameter Type mismatch'



def removePublishMessage(clientname, topic=""):
	
	try:
		if (check_special(clientname)=="reject@wronginput"):
			raise ParameterError(1001)
			os._exit(0)

		if (check_special(topic)=="reject@wronginput"):
			raise ParameterError(1002)
			os._exit(0)

		if clientname=="":
			raise ParameterError(1011)
			os._exit(0)


		if (topic==""):
			url="http://"+server+":"+port+"/api/removeallpublish"
		else:
			url="http://"+server+":"+port+"/api/removepublish"
		headers = {'content-type': 'application/json'}
		data={'cl_name' : clientname , 't' : topic }
		params="{}"
		response = requests.post(url, params=data, headers=headers)
		return json.loads(response.text)
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		if (e.args[0]==1011):
			return "%s \n%d: %s"%(e.bm[0],e.args[0],e.pm[e.args[0]] )
		else:
			return "%s %s \n%d: %s"%(e.bm[0],e.em[0],e.args[0],e.pm[e.args[0]] )

	except Exception as e:
    		return 'BW-IoT 1012: Parameter Type mismatch'


def removeSubscribe(clientname, topic=""):

	try:
		if (check_special(clientname)=="reject@wronginput"):
			raise ParameterError(1001)
			os._exit(0)

		if (check_special(topic)=="reject@wronginput"):
			raise ParameterError(1002)
			os._exit(0)
		if clientname=="":
			raise ParameterError(1011)
			os._exit(0)



		if (topic==""):
			url="http://"+server+":"+port+"/api/removeallsubscribe"
		else:
			url="http://"+server+":"+port+"/api/removesubscribe"
		headers = {'content-type': 'application/json'}
		data={'cl_name' : clientname , 't' : topic }
		params="{}"
		response = requests.post(url, params=data, headers=headers)
		return json.loads(response.text)
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		if (e.args[0]==1011):
			return "%s \n%d: %s"%(e.bm[0],e.args[0],e.pm[e.args[0]] )
		else:
			return "%s %s \n%d: %s"%(e.bm[0],e.em[0],e.args[0],e.pm[e.args[0]] )

	except Exception as e:
    		return 'BW-IoT 1012: Parameter Type mismatch'


def removeResponseforRequest(clientname,req_topic=""):
	try:
		if (check_special(clientname)=="reject@wronginput"):
			raise ParameterError(1001)
			os._exit(0)

		if (check_special(req_topic)=="reject@wronginput"):
			raise ParameterError(1006)
			os._exit(0)
		if clientname=="":
			raise ParameterError(1011)
			os._exit(0)

		if (req_topic==""):
			url="http://"+server+":"+port+"/api/removeallresponse"
		else:
			url="http://"+server+":"+port+"/api/removeresponse"
		headers = {'content-type': 'application/json'}
		data={'cl_name' : clientname , 'req_t' : req_topic }
		params="{}"
		response = requests.post(url, params=data, headers=headers)
		return json.loads(response.text) 
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		if (e.args[0]==1011):
			return "%s \n%d: %s"%(e.bm[0],e.args[0],e.pm[e.args[0]] )
		else:
			return "%s %s \n%d: %s"%(e.bm[0],e.em[0],e.args[0],e.pm[e.args[0]] )

	except Exception as e:
    		return 'BW-IoT 1012: Parameter Type mismatch'



def unsubscribe(clientname, topic):
	try:
		if (check_special(clientname)=="reject@wronginput"):
			raise ParameterError(1001)
			os._exit(0)

		if (check_special(topic)=="reject@wronginput"):
			raise ParameterError(1002)
			os._exit(0)

		if clientname=="" or topic=="":
			raise ParameterError(1011)
			os._exit(0)

		url="http://"+server+":"+port+"/api/unsubscribe"
		headers = {'content-type': 'application/json'}
		data={'cl_name' : clientname , 't' : topic }
		params="{}"
		response = requests.post(url, params=data, headers=headers)
		return json.loads(response.text)
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		if (e.args[0]==1011):
			return "%s \n%d: %s"%(e.bm[0],e.args[0],e.pm[e.args[0]] )
		else:
			return "%s %s \n%d: %s"%(e.bm[0],e.em[0],e.args[0],e.pm[e.args[0]] )


	except Exception as e:
    		return e.args[0]


def unsubscribeAll():
	try:
		url="http://"+server+":"+port+"/api/unsubscribeall"
		headers = {'content-type': 'application/json'}
		data=""		 
		params="{}"
		response = requests.post(url, params=data, headers=headers)
		return json.loads(response.text) 
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except Exception as e:
    		return e.args[0]



def startclient(clientname):
	try:
		if (check_special(clientname)=="reject@wronginput"):
			raise ParameterError(1001)
			os._exit(0)
		if clientname=="":
			raise ParameterError(1011)
			os._exit(0)


		url="http://"+server+":"+port+"/api/startclient"
		headers = {'content-type': 'application/json'}
		data={'cl_name' : clientname}
		params="{}"
		response = requests.post(url, params=data, headers=headers)
		return json.loads(response.text)
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		if (e.args[0]==1011):
			return "%s \n%d: %s"%(e.bm[0],e.args[0],e.pm[e.args[0]] )
		else:
			return "%s %s \n%d: %s"%(e.bm[0],e.em[0],e.args[0],e.pm[e.args[0]] )


	except Exception as e:
		return e.args[0]
    		

def subscribe(clientname="",topic="",qos=0,addtodb="false"):
	try:
		if (clientname=="" and topic=="" and qos==0 and addtodb=="false"):
			url="http://"+server+":"+port+"/api/subscribe"	
			headers = {'content-type': 'application/json'}	
			data={'cl_name' : clientname , 't' : topic }
			response = requests.post(url,params=data,headers=headers)
		else:
			if (check_special(clientname)=="reject@wronginput"):
				raise ParameterError(1001)
				os._exit(0)

			if (check_special(topic)=="reject@wronginput"):
				raise ParameterError(1002)
				os._exit(0)

			try:
				qos=int(qos)
				if (qos<0 or qos>2):
					raise ParameterError(1104)
					os._exit(0)
			except:
				raise ParameterError(1004)
				os._exit(0)

			if not (addtodb.upper()=="TRUE" or addtodb.upper()=="FALSE"):
				print "Addtodb: Expecting true or false"
				os._exit(0)

			url="http://"+server+":"+port+"/api/subscribeclient"
			headers = {'content-type': 'application/json'}	
			data={'cl_name' : clientname , 't' : topic ,'q':qos,'adddb':addtodb}
			params="{}"
			response = requests.post(url, params=data, headers=headers)
		return json.loads(response.text)
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		return "%s %s \n%d: %s"%(e.bm[0],e.em[0],e.args[0],e.pm[e.args[0]] )
	except Exception as e:
    		return e.args[0]


def publish(clientname="", topic="", message="",qos=0,retain=1,addtodb="false"):
	try:
		if (clientname=="" and topic=="" and message=="" and qos==0 and retain==1 and addtodb=="false"):
			url="http://"+server+":"+port+"/api/publish"
			headers = {'content-type': 'application/json'}
			response = requests.post(url,headers=headers)
		else:
			if (check_special(clientname)=="reject@wronginput"):
				raise ParameterError(1001)
				os._exit(0)

			if (check_special(topic)=="reject@wronginput"):
				raise ParameterError(1002)
				os._exit(0)
			if (check_special(message)=="reject@wronginput"):
				raise ParameterError(1003)
				os._exit(0)
			if (clientname!=""):
				if (topic!=""):
					if (message==""):
						return "Message to be published is missing"
						os._exit(0)
				else:
					return "Topic cannot be empty"
					os._exit(0)
			try:
				qos=int(qos)
				if (qos<0 or qos>2):
					raise ParameterError(1104)
					os._exit(0)
			except:
				raise ParameterError(1004)
				os._exit(0)
			try:
				retain=int(retain)
				if (retain<0 or retain>1):
					raise ParameterError(1105)
					os._exit(0)
			except:
				raise ParameterError(1005)
				os._exit(0)
		
			if not (addtodb.upper()=="TRUE" or addtodb.upper()=="FALSE"):
				return "Addtodb: Expecting true or false"
				os._exit(0)

			url="http://"+server+":"+port+"/api/publishclient"
			headers = {'content-type': 'application/json'}
			data={'cl_name' : clientname , 't' : topic,'m':message,'q': qos,'r':retain,'adddb':addtodb}
			params="{}"
			response = requests.post(url, params=data, headers=headers)
		return json.loads(response.text) 
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		return "%s %s \n%d: %s"%(e.bm[0],e.am[0],e.args[0],e.pm[e.args[0]] )
	except Exception as e:
    		return e.args[0]

def stopclient(clientname=""):
	try:
		if (check_special(clientname)=="reject@wronginput"):
			raise ParameterError(1001)
			os._exit(0)
		if clientname=="":
			raise ParameterError(1011)
			os._exit(0)


		url="http://"+server+":"+port+"/api/stopclient"
		headers = {'content-type': 'application/json'}
		data={'cl_name' : clientname}
		params="{}"
		response = requests.post(url, params=data, headers=headers)
		return json.loads(response.text)
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		if (e.args[0]==1011):
			return "%s \n%d: %s"%(e.bm[0],e.args[0],e.pm[e.args[0]] )
		else:
			return "%s %s \n%d: %s"%(e.bm[0],e.em[0],e.args[0],e.pm[e.args[0]] )
	except Exception as e:
		return e.args[0]


def stoppublish(clientname=""):
	try:
		if (check_special(clientname)=="reject@wronginput"):
			raise ParameterError(1001)
			os._exit(0)

		url="http://"+server+":"+port+"/api/stoppublish"
		headers = {'content-type': 'application/json'}
		data={'cl_name' : clientname}
		params="{}"
		response = requests.post(url, params=data, headers=headers)
		return json.loads(response.text)
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		return "%s %s \n%d: %s"%(e.bm[0],e.em[0],e.args[0],e.pm[e.args[0]] )


	except Exception as e:
    		return e.args[0]

def stopResponseforRequest(clientname,request_topic):
	try:
		if (check_special(clientname)=="reject@wronginput"):
			raise ParameterError(1001)
			os._exit(0)

		if (check_special(request_topic)=="reject@wronginput"):
			raise ParameterError(1006)
			os._exit(0)
		if clientname=="" or request_topic=="":
			raise ParameterError(1011)
			os._exit(0)


		url="http://"+server+":"+port+"/api/stopres"
		headers = {'content-type': 'application/json'}
		data={'cl_name':clientname,'req_topic' : request_topic}
		params="{}"
		response = requests.post(url, params=data, headers=headers)
		return json.loads(response.text)
	except requests.exceptions.ConnectionError:
		print "Unable to connect with Port "+port+" . Please restart the simulator"
		os._exit(0)

	except ParameterError as e:
		if (e.args[0]==1011):
			return "%s \n%d: %s"%(e.bm[0],e.args[0],e.pm[e.args[0]] )
		else:
			return "%s %s \n%d: %s"%(e.bm[0],e.em[0],e.args[0],e.pm[e.args[0]] )

	except Exception as e:
    		pass


