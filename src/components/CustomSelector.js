import React, {Component} from 'react'

class CustomSelector extends Component {

  render() {
    return (
        <>
          <div>
            <h4 style={{padding: "1%", color: "#412774"}}>{this.props.label}</h4>
          </div>
          <div>
            <div className="col-4">
              <select className="form-select" onChange={this.props.handleInputChange} name={this.props.name}>
                {Array.from(this.props.values, value => {
                  return (<option>{value}</option>)
                })}
              </select>
            </div>
          </div>
        </>
    )
  }
}

export default CustomSelector