import BWSimREST
import time
print BWSimREST.addClient('Client1','MySensor')
print BWSimREST.addNewSubscribe('Client1','Topic')
print BWSimREST.addNewSubscribe('Client1','Topic1')
print BWSimREST.addClient('Client2','Mobile')
print BWSimREST.addNewSubscribe('Client2','Topic')
print BWSimREST.addNewSubscribe('Client2','Topic2')
print BWSimREST.addClient('Client3','NewSensor')
print BWSimREST.addNewSubscribe('Client3','Topic')
print BWSimREST.addNewSubscribe('Client3','Topic3')
print BWSimREST.addResponseforRequest('Client1','Topic','Hello','Topic1','ReqRes1')
print BWSimREST.addResponseforRequest('Client2','Topic','Hello','Topic2','ReqRes2')
print BWSimREST.addResponseforRequest('Client3','Topic','Hello','Topic3','ReqRes3')
print BWSimREST.startclient('Client1')
print BWSimREST.startclient('Client2')
print BWSimREST.startclient('Client3')
time.sleep(5)
print BWSimREST.publish('pubclient1','Topic','Hello')
time.sleep(3)
print BWSimREST.publish('pubclient2','Topic','Hello')
time.sleep(4)
print 'Unsubscribing Topic1,Topic2,Topic3'
print BWSimREST.unsubscribe('Client1','Topic1')
print BWSimREST.unsubscribe('Client2','Topic2')
print BWSimREST.unsubscribe('Client3','Topic3')
time.sleep(5)
print 'Publishing Topic'
print BWSimREST.publish('pubclient1','Topic','Hello')
print BWSimREST.publish('pubclient2','Topic','Hello')


