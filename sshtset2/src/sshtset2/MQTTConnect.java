/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sshtset2;
import java.io.*;
import java.util.Random;
import java.security.*;
import java.security.cert.*;
import java.util.Properties;
import javax.net.SocketFactory;
import javax.net.ssl.*;

import org.bouncycastle.jce.provider.*;


import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttMessage;

public class MQTTConnect {
    static X509Certificate getXCert(String f)throws Exception{
        X509Certificate cert=null;
        InputStream inStream = null;
        try {
            inStream = new FileInputStream(f);
            CertificateFactory cf = CertificateFactory.getInstance("X.509");
            cert = (X509Certificate)cf.generateCertificate(inStream);
        } finally {
            if (inStream != null) {
                inStream.close();
            }
        }
        return cert;
    }
    static PrivateKey getkp(String k,String p) throws Exception{
        FileInputStream is = new FileInputStream("your.keystore");

        KeyStore keystore = KeyStore.getInstance(KeyStore.getDefaultType());
        keystore.load(is, "my-keystore-password".toCharArray());

        String alias = "myalias";

        Key key = keystore.getKey(alias, "password".toCharArray());
        return (PrivateKey)key;
    }
    static SSLSocketFactory getSocketFactory (final String caCrtFile) throws Exception
    { 
        Security.addProvider(new BouncyCastleProvider());
        X509Certificate caCert = getXCert(caCrtFile);
        //X509Certificate cert = getXCert(crtFile);
        // load client private key
        //PrivateKey key=getkp(keyFile, password);

        // CA certificate is used to authenticate server
        KeyStore caKs = KeyStore.getInstance("JKS");
        caKs.load(null, null);
        caKs.setCertificateEntry("ca-certificate", caCert);
        TrustManagerFactory tmf = TrustManagerFactory.getInstance("PKIX");
        tmf.init(caKs);

        // client key and certificates are sent to server so it can authenticate us
        /*KeyStore ks = KeyStore.getInstance("JKS");
        ks.load(null, null);
        ks.setCertificateEntry("certificate", cert);
        ks.setKeyEntry("private-key", key, password.toCharArray(), new java.security.cert.Certificate[]{cert});
        KeyManagerFactory kmf = KeyManagerFactory.getInstance("PKIX");
        kmf.init(ks, password.toCharArray());
        */
        // finally, create SSL socket factory
        SSLContext context = SSLContext.getInstance("TLS");
        context.init(null, tmf.getTrustManagers(), null);

        return context.getSocketFactory();
    }
    public static String randomAlphaNumeric(int count) {
        String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder builder = new StringBuilder();
        while (count-- != 0) {
        int character = (int)(Math.random()*ALPHA_NUMERIC_STRING.length());
        builder.append(ALPHA_NUMERIC_STRING.charAt(character));
    }
    return builder.toString();
}
	public static void main(String[] args) throws Exception {

                // MQTT topic
		String topic        = "ac/temperature"; 
 
                String cert="/home/amit/IOT/certy/server.crt";
		//String content      = "20";
 
		// QoS supported at level 0 and 1
		int qos             = 0;
 
		// Connection URI
		String broker	    = "tcp://172.27.30.144:1883"; 
 
		//String cpUserName = new String("p2p");
		//String cpPassword = new String("1234");
 
	    for(int i=0;i<2000;i++){
		MqttClient sampleClient = new MqttClient(broker,MqttClient.generateClientId());// client id cannot be more than 23 chars	    
		MqttConnectOptions connOpts = new MqttConnectOptions();
                connOpts.setUserName("p2p");
                connOpts.setPassword("1234".toCharArray());                                
		connOpts.setCleanSession(true);
		sampleClient.connect(connOpts);
        	System.out.println("Connected!");	
		sampleClient.disconnect();
                Thread.sleep(500);
            }

	}

}