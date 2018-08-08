import { PrimaryColumn, Column, Entity, CreateDateColumn, Index } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryColumn()
  public hash: string;
  @Index()
  @Column('bigint')
  public blockNumber: number;
  @Column('bigint')
  public value: string;
  @Column('bigint')
  public gas: string;
  @Column('bigint')
  public gasPrice: string;
  @Index()
  @Column() // No support for UNIX_TIMESTAMP?
  public timeStamp: number;
  @Column()
  public blockHash: string;
  @Index()
  @Column()
  public from: string;
  @Index()
  @Column()
  public to: string;
  @Column('tinyint')
  public isError: string;
  @Column()
  public confirmations: string;
  @Column()
  public gasUsed: string;
  @Index()
  @Column()
  public contractAddress: string;
}
