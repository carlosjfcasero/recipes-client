import React, {Component} from 'react';
import RichTextEditor from 'react-rte';
import PropTypes from "prop-types";

class MyRichTextEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string
  };

  state = {
    value: RichTextEditor.createEmptyValue()
  }

  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange(value.toString('html'), this.props.name);
    }
  };

  render() {
    return (
        <RichTextEditor
            value={this.state.value}
            onChange={this.onChange}
        />
    );
  }
}

export default MyRichTextEditor