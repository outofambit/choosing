
let React = require('react');
let ReactDOM = require('react-dom');

const Switch = (props) =>
  <button key={props.label} className={props.active ? 'active' : 'inactive'} onClick={() => {props.action(); props.parentAction(props.label)}}>
    {props.label}
  </button>

const Space = (props) =>
  <span onClick={() => {props.parentAction(props.ind)}}>
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

  handleSpaceClicked (ind) {
    console.log(ind)
    let newInd = Math.round((this.state.showInds[ind] + this.state.showInds[ind+1]) / 2)
    let showInds = this.state.showInds
    showInds.push(newInd)
    showInds.sort((a, b) => {
      return a - b
    })
    // TODO: dont do if new ind is already in the array
    this.setState({showInds: showInds})
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
    // clean up the undefineds
    sws = sws.filter(val => {
      if (val) {return true}
      return false
    })
    // add in the spaces to a new array
    let sswss = [];
    sws.forEach((el, ind, arr) => {
      sswss.push(el)
      if (ind != arr.length-1) {
        sswss.push(<Space key={'space'+ind-1} ind={ind-1} parentAction={this.handleSpaceClicked.bind(this)} />)
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
}

ReactDOM.render(
  <SwitchSet {...swda} />,
  document.getElementById('react')
);
