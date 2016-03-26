
let React = require('react');
let ReactDOM = require('react-dom');

const Switch = (props) =>
  <button key={props.label} className={props.active ? 'active' : 'inactive'} onClick={() => {props.action(); props.parentAction(props.label)}}>
    {props.label}
  </button>

const Space = (props) =>
  <span onClick={() => {props.action(); props.parentAction(props.label)}}>
    -
  </span>

class SwitchSet extends React.Component {
  constructor(props) {
    super(props);

    let kvs = this.props.switchData.map((da) => {
      return [da.label, false];
    });
    let stateMap = new Map(kvs);
    this.state = {
      switches: stateMap,
      clicks: 0,
      showInds: [0, this.props.switchData.length-1]
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
    let sws = this.props.switchData.map((da, ind, arr) => {
      if (this.state.showInds.includes(ind)) {
        return (
          <Switch {...da} active={this.state.switches.get(da.label)} parentAction={this.handleSwitchClicked.bind(this)} key={da.label} />
        )
      }
    })
    let sswss = [];
    sws.forEach((da, ind, arr) => {
      sswss.push(da)
      if (ind > 0 && ind < arr.length-1) {
        sswss.push(<Space/>)
      }
    })
    return (
      <div className="switchSet">
        {sswss}
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
  // <SwitchSet {...swda} />,
  <SwitchSet {...swda} />,
  document.getElementById('react')
);
