import {
  Query,
  Resolver,
  ResolveProperty,
} from '@nestjs/graphql';

import { Address } from 'entities/address.entity';
import { AddressesService } from './addresses.service';
import { Transaction } from 'entities/transaction.entity';

@Resolver('Address')
export class AddressesResolvers {
  constructor(private readonly addressesService: AddressesService) {}

  @Query('address')
  findOneById(obj, args, context, info): Promise<Address> {
    const { id } = args;
    return this.addressesService.findOneById(id);
  }

  @ResolveProperty('transactions')
  getTransactions(address, args, context, info): Promise<Transaction[]> {
    return this.addressesService.getTransactionsForAddress(address, args);
  }
}