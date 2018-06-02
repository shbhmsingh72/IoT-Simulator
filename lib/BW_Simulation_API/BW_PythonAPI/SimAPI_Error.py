class BWError(Exception): pass

class MissingInputError(BWError): pass

class ParameterError(BWError):
    # define the error codes & messages here
    bm = {0:"BW-IoT Error :"}
    em = {0:"Only alphabets,numbers,/,_,space are allowed"}
    am = {0:"Boolean: true or false is expected"}
    pm = {1001: "Invalid client name.",
	  1002: "Invalid topic. ", \
          1003: "Invalid message. ",
	  1004: "QoS: Value should be 0,1 or 2",    
	  1005: "Retain: Value should be 0 or 1", \
	  1006: "Invalid Request topic. ",        
          1007: "Invalid Request message. ", 
	  1008: "Invalid Response topic. ",
          1009: "Invalid Response message." ,
	  1010: "Invalid AddtoDB value.",
	  1011: "Parameter cannot be empty. Data expected",
	  1012: "Parameter Type mismatch",
	  1013: "Invalid Will Topic/Message",
	  1101: "Invalid description.",
          1103: "Will flag is set: Will Topic/Message could not be empty",
          1104: "QoS: Expecting number, string given",
          1105: "Retain: Expecting number, string given"
	}

class OperationError(BWError):
    bm = {0:"BW-IoT Error :"}
    pm = {101: "Client could not be added",
          102: "Publish message could not be added to database",
	  103: "Request Response could not be added to database",
	  104: "Topic could not be added to database",
	  105: "Topic is not subscribed",
	  106: "Specified Topic is not unsubscribed",
	  107: "Can't unsubscribe all",
	  108: "No topic is subscribed",
	  109: "Not Subscribed to any topic",
	  110: "Unknown client",
	  111: "The client has not yet published any message",
	  112: "Unknown client/request topic",
	  113: "Unknown client/topic",
	  114: "Unknown client/publish message",
	  115: "No client is added",
	  116: "Specified publish topic does not exist",
	  117: "Specified topic is not subscribed",
	  118: "Specified request topic is not availabe"
}
