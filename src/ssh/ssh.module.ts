import { Module } from '@nestjs/common';
import { SSHService } from './ssh.service';

@Module({
    exports: [
        SSHService
    ],
    providers: [
        SSHService
    ]
})
export class SshModule {}
