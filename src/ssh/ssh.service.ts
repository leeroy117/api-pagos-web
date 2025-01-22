import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Client as SSHClient } from 'ssh2';
import * as net from 'net';

@Injectable()
export class SSHService implements OnModuleDestroy {
  private sshClient: SSHClient | null = null;
  private server: net.Server | null = null;

  async createTunnel(sshConfig: any, dbHost: string, dbPort: number, srcPort: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const sshClient = new SSHClient();
      sshClient
        .on('ready', () => {
          console.log('SSH Connection established');

          sshClient.forwardOut(
            dbHost,
            srcPort,
            dbHost,
            dbPort,
            (err, stream) => {
              if (err) {
                sshClient.end();
                return reject(err);
              }

              const server = net.createServer((socket) => {
                stream.pipe(socket).pipe(stream);
              });

              server.listen(srcPort, '127.0.0.1', () => {
                const localPort = (server.address() as net.AddressInfo).port;
                this.sshClient = sshClient;
                this.server = server;
                resolve(localPort);
              });
            },
          );
        })
        .on('error', (err) => {
          console.error('SSH Error:', err);
          reject(err);
        })
        .connect(sshConfig);
    });
  }

  async closeTunnel(): Promise<void> {
    if (this.server) {
      this.server.close();
      this.server = null;
    }
    if (this.sshClient) {
      this.sshClient.end();
      this.sshClient = null;
    }
  }

  async onModuleDestroy() {
    await this.closeTunnel();
  }
}
