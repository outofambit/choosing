
let React = require('react');
let ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const Switch = (props) =>
  <div className='switch'>
  <button
    key={props.label}
    className={'btn btn-default clicked-' + props.clicks + (props.active ? ' active' : ' inactive')}
    onClick={() => {props.parentAction(props.label)}}>
    {props.label}
  </button>
  </div>

const Space = (props) =>
  <span className={'space' + (props.entice ? ' clickme' : '')}
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
      showInds: props.showInds,
      entice: false
    };
  }

  handleSwitchClicked (label) {
    let newSwitchMap = new Map();
    this.state.switches.forEach((v, k, o) =>
      newSwitchMap.set(k, (k == label))
    )
    let newClicksMap = this.state.clicks;
    newClicksMap.set(label, Math.min(this.state.clicks.get(label)+1, this.props.maxClicks-1))
    // set state of switches
    this.setState({switches: newSwitchMap});
    this.setState({clicks: newClicksMap});
  }

  handleSpaceClicked (ind) {
    let newInd = this.state.showInds[ind] + Math.round((this.state.showInds[ind+1] - this.state.showInds[ind]) / 2)
    // if this is already shown, don't do a refresh
    if (showInds.includes(newInd)) {
      return
    }

    let showInds = this.state.showInds
    showInds.push(newInd)
    showInds.sort((a, b) => {
      return a - b
    })
    this.setState({showInds: showInds})
    if (this.state.entice) {
      this.setState({entice: false})
    }
  }

  // called right after the element first renders
  componentDidMount () {
    setTimeout(() => {
      if (this.state.showInds.length == 2) {
        this.setState({entice: true})
      }
    }, 7000);
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
          parentAction={this.handleSpaceClicked.bind(this)}
          entice={this.state.entice} />)
      }
    })
    return (
        <ReactCSSTransitionGroup className="switchSet" transitionName="switch" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {sswss}
        </ReactCSSTransitionGroup>
    )
  }
}

const Modal = (props) =>
  <div className='modal'>
    <span className='modal-msg' >{props.message}</span>
    {props.content}
  </div>

// make some test data
let swda = [
  {label: 'stoic'},
  {label: 'strong'},
  {label: 'manly'},
  {label: 'masc'},
  {label: 'boyish'},
  {label: 'sissy'},
  {label: 'genderbending'},
  {label: 'androgynous'},
  // {label: 'queer'},
  {label: 'butch'},
  {label: 'tomboy'},
  {label: 'girly'},
  {label: 'femme'},
  {label: 'womanly'},
  {label: 'coquettish'},
  {label: 'vulnerable'}
]

let set = <SwitchSet switchData={swda} maxClicks='20' showInds={[2, 12]} />

let msg = 'Please choose from the options below'

ReactDOM.render(
  <Modal content={set} message={msg} />,
  document.body
);
