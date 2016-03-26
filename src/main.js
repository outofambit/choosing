
let React = require('react');
let ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const Switch = (props) =>
  <div className='switch'>
  <button key={props.label} className={'clicked-' + props.clicks + (props.active ? ' active' : ' inactive')} onClick={() => {props.parentAction(props.label)}}>
    {props.label}
  </button>
  </div>

const Space = (props) =>
  <span className='space'
        onClick={() => {props.parentAction(props.ind)}}>
        &nbsp; {/* this is how we make react render this*/}
  </span>

class SwitchSet extends React.Component {
  constructor(props) {
    super(props);

    // set up state (on/off) map
    let kvs = this.props.switchData.map((da) => {
      return [da.label, false];
    });
    let stateMap = new Map(kvs);

    let kkvs = this.props.switchData.map((da) => {
      return [da.label, 0];
    });
    let clicksMap = new Map(kkvs);

    this.state = {
      switches: stateMap,
      clicks: clicksMap,
      showInds: [0, this.props.switchData.length-1]
    };
  }

  handleSwitchClicked (label) {
    let newSwitchMap = new Map();
    this.state.switches.forEach((v, k, o) =>
      newSwitchMap.set(k, (k == label))
    )
    let newClicksMap = this.state.clicks;
    newClicksMap.set(label, (this.state.clicks.get(label)+1) % this.props.maxClicks)
    // set state of switches
    this.setState({switches: newSwitchMap});
    this.setState({clicks: newClicksMap});
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
    // this.setState({clicks: this.state.clicks + 1});
  }

  render () {
    let sws = this.props.switchData.map((da, ind, arr) => {
      if (this.state.showInds.includes(ind)) {
        return (
          <Switch {...da}
            active={this.state.switches.get(da.label)}
            clicks={this.state.clicks.get(da.label)}
            parentAction={this.handleSwitchClicked.bind(this)}
            key={da.label} />
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
        sswss.push(<Space
          key={'space'+ind}
          ind={ind}
          parentAction={this.handleSpaceClicked.bind(this)} />)
      }
    })
    return (
        <ReactCSSTransitionGroup className="switchSet" transitionName="switch" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {sswss}
        </ReactCSSTransitionGroup>
    )
  }
}

// make some test data
let swda = [
  {label: 'man'},
  {label: 'masc'},
  {label: 'sissy'},
  {label: 'androgynous'},
  {label: 'tomboy'},
  {label: 'femme'},
  {label: 'woman'},
]

ReactDOM.render(
  <SwitchSet switchData={swda} maxClicks='10' />,
  document.body
);
