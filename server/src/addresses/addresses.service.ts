import { Injectable } from '@nestjs/common';
import { Address } from '../entities/address.entity';
import { Transaction } from '../entities/transaction.entity';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { ConsoleColor } from '../enviroment/enviroment';

// todo: move
const ETHERSCAN_URL = 'https://api.etherscan.io/api';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Transaction)
    private readonly trasactionRepository: Repository<Transaction>,
  ) {}

  async findOneById(id: string): Promise<Address> {
    const getAddressFromDb: Address = await this.addressRepository.findOne(id);
    if (
      getAddressFromDb &&
      getAddressFromDb.lastUpdated &&
      !this.isExpired(moment(getAddressFromDb.lastUpdated).valueOf())
    ) {
      // tslint:disable-next-line:no-console
      console.log(
        `${ConsoleColor.FgCyan} Getting Address Data from DB ${
          ConsoleColor.FgWhite
        }`,
      );
      return getAddressFromDb;
    } else {
      // tslint:disable-next-line:no-console
      console.log(
        `${ConsoleColor.FgCyan} Getting Address Data from Etherscan ${
          ConsoleColor.FgWhite
        }`,
      );
      return this.getAddressFromEtherscan(id); // Also updates DB
    }
  }

  public async getTransactionsForAddress(
    address: Address,
    args: { first?: number; fromDate?: number },
  ) {
    // tslint:disable-next-line:no-console
    const { first, fromDate } = args;
    let resultTransactions: Transaction[];
    const getFromDb =
      address &&
      address.lastUpdated &&
      !this.isExpired(moment(address.lastUpdated).valueOf());
    if (getFromDb) {
      resultTransactions = await this.getTransactionsFromDb(address.id, fromDate);
      if (!(resultTransactions && resultTransactions.length > 0)) {
        resultTransactions = await this.getTransactionsFromEtherscan(address.id);
      }
    } else {
      resultTransactions = await this.getTransactionsFromEtherscan(address.id);
    }
    if (first) {
      resultTransactions = resultTransactions.slice(0, first);
    }
    if (fromDate) {
      resultTransactions = resultTransactions.filter((transaction: Transaction) => {
        return transaction.timeStamp > fromDate;
      });
    }
    return resultTransactions;
  }

  private getTransactionsFromDb(id: string, fromDate?: number): Promise<Transaction[]> {
    // tslint:disable-next-line:no-console
    console.log(
      `${ConsoleColor.FgCyan} Getting Transaction Data from DB ${
        ConsoleColor.FgWhite
      }`,
    );
    const getTransactionsQuery = this.trasactionRepository
      .createQueryBuilder()
      .select(`*`)
      .where(`(\`to\` = '${id}'`)
      .orWhere(`\`from\` = '${id}'`)
      .orWhere(`contractAddress = '${id}')`)
      .orderBy(`timeStamp`, 'DESC');
    if (fromDate) {
      getTransactionsQuery
      .andWhere(`timeStamp > ${fromDate}`);
    }
    // tslint:disable-next-line:no-console
    // console.log(`getTransactionsQuery`, getTransactionsQuery.getSql());
    return getTransactionsQuery.execute();
  }

  private async getTransactionsFromEtherscan(
    id: string,
  ): Promise<Transaction[]> {
    // tslint:disable-next-line:no-console
    console.log(
      `${ConsoleColor.FgCyan} Getting Transaction Data from Etherscan ${
        ConsoleColor.FgWhite
      }`,
    );
    const queryGetTransactions = `?module=account&action=txlist&address=${id}&startblock=0&endblock=99999999&sort=desc&apikey=YourApiKeyToken`;
    try {
      const addressTransactionData = await axios.get(
        ETHERSCAN_URL + queryGetTransactions,
      );
      const { result } = addressTransactionData.data;
      // Note: Save is a sideeffect, saving result to our own database. Potentially move to a queue.
      this.trasactionRepository.save(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  private async getAddressFromEtherscan(id: string) {
    const queryGetBalance = `?module=account&action=balance&address=${id}&tag=latest&apikey=YourApiKeyToken`;
    try {
      const addressTransactionData = await axios.get(
        ETHERSCAN_URL + queryGetBalance,
      );
      const { status, message, result } = addressTransactionData.data;
      const addressWithTransactions: Address = {
        id,
        status,
        message,
        balance: result,
      };
      // Note: Save is a sideeffect, saving result to our own database. Potentially move to a queue.
      await this.addressRepository.save({
        ...addressWithTransactions,
        lastUpdated: new Date(),
      });
      return addressWithTransactions;
    } catch (error) {
      throw error;
    }
  }

  private isExpired(lastUpdated: number) {
    return (
      lastUpdated <
      moment()
        .subtract(5, 'minutes')
        .valueOf()
    );
  }
}
