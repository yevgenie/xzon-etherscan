import * as React from 'react';
import { Query } from 'react-apollo';
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator';
import { getAddress } from '../../gql/GetAddress';
import { toWei } from '../../utils';
import Search from '../Search/Search';
import Transaction from '../Transaction/Transaction';
import './Address.css';

export default class Address extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    //
  }

  public render() {
    const { id, limit, fromDate } = this.props.match.params;
    return (
      <Query
        query={getAddress}
        variables={{
          id,
          txLimit: limit ? limit : 10,
          fromDate: fromDate ? fromDate : 0
        }}
      >
        {({ loading, data }) => {
          if (loading) {
            return <LoadingIndicator />;
          } else {
            const { address } = data;
            const { transactions } = address;
            return (
              <div className='address-panel'>
                <Search history={this.props.history} match={this.props.match} />
                <div className='address-info'>
                  <div className='address-id'>{`${id.slice(0,8)}...${id.substr(id.length - 8)}`}</div>
                  <div className='address-balance'>Balance: {toWei(address.balance)} ETH</div>
                </div>
                {transactions.map((transaction: any, index: number) => {
                  const lowCaseId = id.toLowerCase();
                  return <Transaction
                    transaction={transaction}
                    isIn={transaction.to === lowCaseId}
                    key={index} />;
                })}
              </div>
            );
          }
        }}
      </Query>
    );
  }
}
