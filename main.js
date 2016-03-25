
let React = require('react');
let ReactDOM = require('react-dom');

const Switch = (props) =>
  <button key={props.label} className={props.active ? 'active' : 'inactive'} onClick={() => {props.action(); props.parentAction(props.label)}}>
    {props.label}
  </button>;

class SwitchSet extends React.Component {
  constructor(props) {
    super(props);

    let kvs = this.props.switchData.map((da) => {
      return [da.label, false];
    });
    let stateMap = new Map(kvs);
    this.state = {
      switches: stateMap,
      clicks: 0
    };
  }

  handleSwitchClicked (label) {
    let newSwitchMap = new Map();
    this.state.switches.forEach((v, k, o) =>
      newSwitchMap.set(k, (k == label))
    )
    // set state of switches
    this.setState({switches: newSwitchMap});
    this.setState({clicks: this.state.clicks + 1});
  }

  render () {
    let cutoff = this.state.clicks
    console.log(cutoff)
    let sws = this.props.switchData.map((da, ind, arr) => {
      let distInd = Math.floor(Math.abs(ind - arr.length/2))
      console.log(distInd)
      if (distInd <= cutoff) {
        return (
          <Switch {...da} active={this.state.switches.get(da.label)} parentAction={this.handleSwitchClicked.bind(this)} key={da.label} />
        )
      }

    })
    return (
      <div className="switchSet">
        {sws}
      </div>
    )
  }

}

let swda = {
  switchData:
    [
      {
        label: 'hello',
        action: () => {console.log('hello!')}
      },
      {
        label: 'goodbye',
        action: () => {console.log('goodbye!')}
      },
      {
        label: 'stay',
        action: () => {console.log('staying!')}
      }
    ]
};

ReactDOM.render(
  <SwitchSet {...swda} />,
  document.getElementById('react')
);
