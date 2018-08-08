import * as moment from "moment";
import * as React from "react";
// import { DateInput } from "../components/DateInput/DateInput";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import "./Search.css";

export default class Search extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      addressId: "",
      fromDate: 0
    };
  }

  // tslint:disable-next-line:member-ordering
  public updateAddress = (event: any) => {
    this.setState({
      addressId: event.target.value
    });
  };

  public componentDidMount() {
    const { fromDate, id } = this.props.match.params;
    this.setState({
      fromDate: fromDate ? moment.unix(+fromDate).format("MM/DD/YYYY") : 0,
      addressId: id
    });
  }

  public search = (first: number = 0, fromDate: number = 0) => () => {
    this.props.history.push(
      `/address/${this.state.addressId}/${first}/${fromDate}`
    );
  };

  public onKeyPress = (event: any) => {
    if (event.key === "Enter") {
      this.search()();
    }
  };

  public onFromDateChange = (event: any) => {
    this.setState({
      fromDate: event.target.value
    });
  };

  public render() { 
    const { addressId } = this.state;
    const disableFilters = !(addressId && addressId.length === 42);
    return (
      <div className='search-panel'>
        <div className='search-address'>
          <input
            autoFocus={true}
            value={addressId}
            placeholder="Ethereum Address"
            onChange={this.updateAddress}
            onKeyPress={this.onKeyPress}
          />
          <SubmitButton 
            disabled={disableFilters}
            onClick={this.search()}
            label={"Search"}
          />
        </div>
        <div className='search-filters'>
          {/* TODO: Find a good calendar picker or better input masking setup */}
          {/* <span>From Date:</span>
          <DateInput
            style={{ margin: "5px", padding: "5px", fontSize: "1.2em" }}
            onChange={this.onFromDateChange}
            value={this.state.fromDate}
          /> */}
          <SubmitButton
            disabled={disableFilters}
            onClick={this.search(10)}
            label={"Last 10"}
          />
          <SubmitButton
            disabled={disableFilters}
            onClick={this.search(100)}
            label={"Last 100"}
          />
          <SubmitButton
            disabled={disableFilters}
            onClick={this.search(0, moment().startOf('isoWeek').valueOf() / 1000)}
            label={"This Week"}
          />
          <SubmitButton
            disabled={disableFilters}
            onClick={this.search(0, moment().startOf('month').valueOf() / 1000)}
            label={"This Month"}
          />
          <SubmitButton
            disabled={disableFilters}
            onClick={this.search(0, moment().startOf('year').valueOf() / 1000)}
            label={"This Year"}
          />
        </div>
      </div>
    );
  }
}
