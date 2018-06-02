
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;
import java.net.ServerSocket;
import java.util.function.Supplier;
import java.util.stream.Stream;

public class EchoServer {

    public static void main(String[] args) {
        
        boolean serverUp = true;

        while(serverUp) {

            try {

                ServerSocket echoServerSocket = new ServerSocket(41464);   
                Socket clientSocket = echoServerSocket.accept();          // blocking
                echoServerSocket.setReuseAddress(serverUp);
                PrintStream out = new PrintStream(clientSocket.getOutputStream()); // use PrintStream to write bytes to the output stream associated with Socket obj (clientSocket)
                BufferedReader br = new BufferedReader(new InputStreamReader(clientSocket.getInputStream())); // use BufferedReader to read stream of characters from 
                                                                                                              // InputStreamReader which reads bytes from input stream associated with client socket
                Supplier<String> socketInput = () -> {
                    try {
                        return br.readLine();
                    } catch (IOException ex) {
                        return null;
                    }
                };
                
                Stream<String> stream = Stream.generate(socketInput);
                stream.map(s -> {
                    System.out.println("Client request: " + s);
                    out.println(s);
                    return s;
                })
                .allMatch(s -> s != null);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}