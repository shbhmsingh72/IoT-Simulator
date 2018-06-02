#!/usr/bin/env python2.7
import sys
import time

from py_mqtt_client import MQTTclient  #importing class MQTTclient 

qos=0
retain=1
print ("Enter the portno for publisher")
portno_value=raw_input(">")

port=int(portno_value)

mypublisher_client1=MQTTclient("publisherclient1",port,40,"localhost",0)
if not mypublisher_client1.connect():
	print ("Error while connecting")
	sys.exit(0)
mypublisher_client2=MQTTclient("publisherclient2",port)
if not mypublisher_client2.connect():
	print ("Error while connecting")
	sys.exit(0)
mypublisher_client3=MQTTclient("publisherclient3",port,40,"localhost",0)
if not mypublisher_client3.connect():
	print ("Error while connecting")
	sys.exit(0)
mypublisher_client4=MQTTclient("publisherclient4",port,40,"localhost",0)
if not mypublisher_client4.connect():
	print ("Error while connecting")
	sys.exit(0)
mypublisher_client5=MQTTclient("publisherclient5",port,40,"localhost",0)
if not mypublisher_client5.connect():
	print ("Error while connecting")
	sys.exit(0)


mypublisher_client1.subscribe("mytopic",qos)
mypublisher_client2.subscribe("mytopic",qos)
mypublisher_client3.subscribe("mytopic",qos)
mypublisher_client4.subscribe("mytopic",qos)
mypublisher_client5.subscribe("mytopic",qos)

mypublisher_client1.publish("mytopic","hello I am publisher1",retain,qos)
mypublisher_client2.publish("mytopic","hello I am publisher2",retain,qos)
mypublisher_client3.publish("mytopic","hello I am publisher3",retain,qos)
mypublisher_client4.publish("mytopic","hello I am publisher4",retain,qos)
mypublisher_client5.publish("mytopic","hello I am publisher5",retain,qos)
	
time.sleep(2)

mypublisher_client1.disconnect()
mypublisher_client2.disconnect()
mypublisher_client3.disconnect()
mypublisher_client4.disconnect()
mypublisher_client5.disconnect()