import gql from 'graphql-tag';

export const getAddress = gql`
query GetAddress($id: ID!, $txLimit: Int, $fromDate: Int) {
  address(id: $id) {
    status
    message
    balance
    transactions(first: $txLimit, fromDate: $fromDate) {
      hash
      isError
      timeStamp
      blockNumber
      blockHash
      to
      from
      value
      gasPrice
      contractAddress
    }
  }
}
`;