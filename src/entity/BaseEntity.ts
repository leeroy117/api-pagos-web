import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    
    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    protected  createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true, 
        default: null })
    protected updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'is_deleted', nullable: true, 
        default: null})
    protected isDeleted: Date;
}