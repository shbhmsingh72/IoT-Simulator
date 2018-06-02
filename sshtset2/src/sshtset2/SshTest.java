/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sshtset2;


import java.util.Collection;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.Map;

import org.apache.sshd.common.io.IoServiceFactory;
import org.apache.sshd.common.io.mina.MinaServiceFactory;
import org.apache.sshd.common.io.nio2.Nio2ServiceFactory;
import org.apache.sshd.common.keyprovider.KeyPairProvider;
import org.apache.sshd.common.util.GenericUtils;
import org.apache.sshd.server.SshServer;
import org.apache.sshd.server.auth.password.PasswordAuthenticator;
import org.apache.sshd.server.auth.pubkey.AcceptAllPublickeyAuthenticator;
import org.apache.sshd.server.forward.AcceptAllForwardingFilter;
import org.apache.sshd.server.keyprovider.AbstractGeneratorHostKeyProvider;
import org.apache.sshd.server.scp.ScpCommandFactory;
import org.apache.sshd.server.session.ServerSession;
import org.apache.sshd.server.shell.InteractiveProcessShellFactory;
import org.apache.sshd.server.shell.ProcessShellFactory;
import org.apache.sshd.server.subsystem.sftp.SftpSubsystemFactory;



/**
 *
 * @author amit
 */
public class SshTest extends SshServer {
    public static void main(String[] args) throws Exception {
        int port = 2222;
        String provider;
        boolean error = false;
        String hostKeyType = AbstractGeneratorHostKeyProvider.DEFAULT_ALGORITHM;
        int hostKeySize = 0;
        Collection<String> keyFiles = null;
        Map<String, String> options = new LinkedHashMap<>();

        int numArgs = GenericUtils.length(args);
        for (int i = 0; i < numArgs; i++) {
            String argName = args[i];
            if ("-p".equals(argName)) {
                if (i + 1 >= numArgs) {
                    System.err.println("option requires an argument: " + argName);
                    error = true;
                    break;
                }
                port = Integer.parseInt(args[++i]);
            } else if ("-key-type".equals(argName)) {
                if (i + 1 >= numArgs) {
                    System.err.println("option requires an argument: " + argName);
                    error = true;
                    break;
                }

                if (keyFiles != null) {
                    System.err.println("option conflicts with -key-file: " + argName);
                    error = true;
                    break;
                }
                hostKeyType = args[++i].toUpperCase();
            } else if ("-key-size".equals(argName)) {
                if (i + 1 >= numArgs) {
                    System.err.println("option requires an argument: " + argName);
                    error = true;
                    break;
                }

                if (keyFiles != null) {
                    System.err.println("option conflicts with -key-file: " + argName);
                    error = true;
                    break;
                }

                hostKeySize = Integer.parseInt(args[++i]);
            } else if ("-key-file".equals(argName)) {
                if (i + 1 >= numArgs) {
                    System.err.println("option requires an argument: " + argName);
                    error = true;
                    break;
                }

                String keyFilePath = args[++i];
                if (keyFiles == null) {
                    keyFiles = new LinkedList<>();
                }
                keyFiles.add(keyFilePath);
            } else if ("-io".equals(argName)) {
                if (i + 1 >= numArgs) {
                    System.err.println("option requires an argument: " + argName);
                    error = true;
                    break;
                }
                provider = args[++i];
                if ("mina".equals(provider)) {
                    System.setProperty(IoServiceFactory.class.getName(), MinaServiceFactory.class.getName());
                } else if ("nio2".endsWith(provider)) {
                    System.setProperty(IoServiceFactory.class.getName(), Nio2ServiceFactory.class.getName());
                } else {
                    System.err.println("provider should be mina or nio2: " + argName);
                    error = true;
                    break;
                }
            } else if ("-o".equals(argName)) {
                if (i + 1 >= numArgs) {
                    System.err.println("option requires and argument: " + argName);
                    error = true;
                    break;
                }
                String opt = args[++i];
                int idx = opt.indexOf('=');
                if (idx <= 0) {
                    System.err.println("bad syntax for option: " + opt);
                    error = true;
                    break;
                }
                options.put(opt.substring(0, idx), opt.substring(idx + 1));
            } else if (argName.startsWith("-")) {
                System.err.println("illegal option: " + argName);
                error = true;
                break;
            } else {
                System.err.println("extra argument: " + argName);
                error = true;
                break;
            }
        }
        if (error) {
            System.err.println("usage: sshd [-p port] [-io mina|nio2] [-key-type RSA|DSA|EC] [-key-size NNNN] [-key-file <path>] [-o option=value]");
            System.exit(-1);
        }

        System.err.println("Starting SSHD on port " + port);

        SshServer sshd = SshServer.setUpDefaultServer();
        Map<String, Object> props = sshd.getProperties();
        props.putAll(options);

        KeyPairProvider hostKeyProvider = setupServerKeys(sshd, hostKeyType, hostKeySize, keyFiles);
        sshd.setKeyPairProvider(hostKeyProvider);
        // Should come AFTER key pair provider setup so auto-welcome can be generated if needed
        setupServerBanner(sshd, options);
        sshd.setPort(port);

        sshd.setShellFactory(InteractiveProcessShellFactory.INSTANCE);
        
        sshd.setPasswordAuthenticator((String arg0, String arg1, ServerSession arg2) -> "amit".equals(arg0) && "1".equals(arg1));
        
        sshd.setPublickeyAuthenticator(AcceptAllPublickeyAuthenticator.INSTANCE);
        sshd.setTcpipForwardingFilter(AcceptAllForwardingFilter.INSTANCE);
        sshd.setCommandFactory(new ScpCommandFactory.Builder().withDelegate(
            command -> new ProcessShellFactory(GenericUtils.split(command, ' ')).create()
        ).build());
        sshd.setSubsystemFactories(Collections.singletonList(new SftpSubsystemFactory()));
        sshd.start();

        Thread.sleep(Long.MAX_VALUE);
    }
}
