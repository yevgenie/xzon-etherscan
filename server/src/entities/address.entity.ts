import { PrimaryColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class Address {
    @PrimaryColumn()
    public id: string;
    @Column()
    public status: string;
    @Column()
    public message: string;
    @Column('bigint')
    public balance: string;
    @CreateDateColumn({ precision: null, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt?: number;
    @Column({ type: 'timestamp' })
    public lastUpdated?: Date;
    // ?
    public transactions?: Transaction[];
}