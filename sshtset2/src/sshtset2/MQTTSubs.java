/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sshtset2;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

/**
 *
 * @author amit
 */
public class MQTTSubs implements MqttCallback {
    
    public static void main(String[] args) {
        new MQTTSubs().doDemo();
    }

    public void doDemo() {
        MqttClient client;
        String broker = "tcp://167.99.51.94:1883"; 
        try {
            client = new MqttClient(broker,MqttClient.generateClientId());
            client.connect();
            client.setCallback(this);
            client.subscribe("#");
            client.subscribe("ac/temperature");
            //MqttMessage message = new MqttMessage();
            //message.setPayload("A single message from my computer fff".getBytes());
            //client.publish("foo", message);
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void connectionLost(Throwable thrwbl) {
        System.out.println("connection lost");
    }

    @Override
    public void messageArrived(String string, MqttMessage mm) throws Exception {
        System.out.println(mm);
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken imdt) {
        //System.out.println("connection lost");
    }
    
}
