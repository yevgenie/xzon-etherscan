import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Address from './Address/Address';
import Search from './Search/Search';

export default class Dashboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    // 
  }

  public render() {
    return (
      <Router>
        <div className="Dashboard">
          <Route exact={true} path={`/`} component={Search} />
          <Route path={`/address/:id/:limit?/:fromDate?`} component={Address} />
        </div>
      </Router>
    );
  }
}
