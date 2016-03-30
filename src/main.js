
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

class SwitchSet extends React.Component {
  constructor(props) {
    super(props);

    // set up state (on/off) map
    let kvs = this.props.switchData.map((da) => {
      return [da.label, false];
    });
    let stateMap = new Map(kvs);

    let kkvs = this.props.switchData.map((da) => {
      return [da.label, da.show ? 2 : 0];
    });
    let clicksMap = new Map(kkvs);

    this.state = {
      switches: stateMap,
      clicks: clicksMap,
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

  // called right after the element first renders
  componentDidMount () {
    setTimeout(() => {
      if (this.state.showInds.length == 2) {
        this.setState({entice: true})
      }
    }, 7000);
  }

  calculateSeedIndices() {
    let ret = []
    for (var i = 0; i < this.props.switchData.length; i++) {
      if (this.state.clicks.get(this.props.switchData[i].label) > 0) {
        continue
      }
      // left
      let left = 0;
      for (var j = i; j > -1; j--) {
        if (this.state.clicks.get(this.props.switchData[j].label) > 0) {
          left = j
          break
        }
      }
      // right
      let right = this.props.switchData.length-1;
      for (var j = i; j < this.props.switchData.length; j++) {
        if (this.state.clicks.get(this.props.switchData[j].label) > 0) {
          right = j
          break
        }
      }
      // am i between those?
      if (i < this.props.switchData.length/2 && Math.floor((right - left)/2 + left) == i) {
        ret.push(i)
      }
      else if (i > this.props.switchData.length/2 && Math.ceil((right - left)/2 + left) == i) {
        ret.push(i)
      }

    }
    return ret
  }

  render () {
    let seedIndices = this.calculateSeedIndices()
    let sws = this.props.switchData.map((da, ind, arr) => {
      if (this.state.clicks.get(da.label) > 0 || seedIndices.includes(ind)) {
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
    sws = sws.filter(val => { return val })

    return (
        <ReactCSSTransitionGroup className="switchSet" transitionName="switch" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {sws}
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
  {label: 'manly',
    show: true
  },
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
  {label: 'womanly',
    show: true
  },
  {label: 'coquettish'},
  {label: 'vulnerable'}
]

let set = <SwitchSet switchData={swda} maxClicks='20'/>

let msg = 'Please choose from the options below'

ReactDOM.render(
  <Modal content={set} message={msg} />,
  document.body
);
