import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesResolvers } from './addresses.resolvers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../entities/address.entity';
import { Transaction } from '../entities/transaction.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Address, Transaction]),
  ],
  providers: [AddressesResolvers, AddressesService],
})
export class AddressesModule {}