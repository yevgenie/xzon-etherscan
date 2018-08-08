import * as moment from 'moment';
import * as React from 'react';
import { AddressLabel } from '../../components/AddressLabel/AddressLabel';
import { Colors, toWei } from '../../utils';
import './Transaction.css';

export default class Transaction extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const transaction = this.props.transaction;
    const isIn = this.props.isIn;
    const directionMessage = isIn ? 'IN' : 'OUT';
    return (
        <div className="transaction-panel">
            <div className="date-label">
            {moment.unix(+transaction.timeStamp).format("dddd, MMMM Do, YYYY h:mm:ss A")}
            </div>
            <div className="info">
            <div>
                <div className="direction-label" style={{ backgroundColor: isIn ? Colors.green : Colors.orange }}>
                {directionMessage}
                </div>
            </div>
            <div className="amount-label">
                {toWei(transaction.value)} ETH
            </div>
            <div className="block-label">
                #{transaction.blockNumber}
            </div>
            </div>
            {transaction.contractAddress ? <AddressLabel prefix={"Contract"} value={transaction.contractAddress} />: ""}
            {isIn && transaction.from ? <AddressLabel prefix={"From"} value={transaction.from} />: ""}
            {!isIn && transaction.to ? <AddressLabel prefix={"To"} value={transaction.to} /> : ""}
            <AddressLabel style={{ opacity: 0.5 }} prefix={"Hash"} value={transaction.hash} />
        </div>);
    }
}
