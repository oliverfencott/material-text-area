'use strict';

import React from 'react';

const transition = 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';

const {PropTypes} = React;

const TextArea = React.createClass({
  getInitialState: function() {
    const {defaultValue} = this.props;

    return {
      focused: false,
      hasValue: defaultValue ? true : false
    };
  },

  propTypes: {
    rows: PropTypes.number,
    floatingLabelText: PropTypes.string,
    hintText: PropTypes.string,
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    style: PropTypes.object,
    hasErrors: PropTypes.bool,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onBlur: PropTypes.func
  },

  getDefaultProps: function() {
    return {
      rows: 4,
      floatingLabelText: '',
      hintText: '',
      defaultValue: '',
      name: '',
      style: {},
      hasErrors: false,
      onChange: () => {},
      onClick: () => {},
      onBlur: () => {}
    };
  },

  getStyles: function() {
    const {style, hasErrors} = this.props;
    const focused = this.isFocused();
    const hasValue = this.hasValue();

    const focusedColor = hasErrors ? style.errorColor : style.focusedColor;

    return {
      container: {
        width: '100%',
        position: 'relative'
      },
      floatingLabelText: {
        position: 'absolute',
        top: 14,
        color: focused ? focusedColor : style.unfocusedColor,
        transform: focused || hasValue ? 'translate(-0px, -23px) scale(0.75)' : 'translate(0, 0) scale(1)',
        transformOrigin: 'left top',
        transition
      },
      hintText: {
        position: 'absolute',
        top: 14,
        color: style.unfocusedColor,
        opacity: hasValue || !focused ? 0 : 1,
        transition
      },
      input: {
        width: '100%',
        position: 'relative',
        margin: '14px 0 12px',
        padding: 0,
        color: style.textColor,
        backgroundColor: 'transparent',
        outline: 'none',
        border: 'none',
        resize: 'none'
      },
      indicator: {
        position: 'absolute',
        bottom: 8,
        height: 1,
        width: '100%',
        backgroundColor: style.unfocusedColor
      },
      focusedIndicator: {
        position: 'absolute',
        bottom: 8,
        height: 2,
        width: '100%',
        backgroundColor: focusedColor,
        transform: focused ? 'scaleX(1)' : 'scaleX(0)',
        transition
      }
    };
  },

  render: function() {
    const style = this.getStyles();
    const {
      rows,
      name,
      defaultValue,
      floatingLabelText,
      hintText,
      onClick
    } = this.props;

    return (
      <div style={style.container} onClick={onClick}>
        {this.renderLabelText(floatingLabelText, style.floatingLabelText)}
        {this.renderLabelText(hintText, style.hintText)}
        <textarea
          rows={rows}
          style={style.input}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          onChange={this.handleChange}
          defaultValue={defaultValue}
          name={name}
        />
        <div style={style.indicator} />
        <div style={style.focusedIndicator} />
      </div>
    );
  },

  renderLabelText: function(labelText, style) {
    if (labelText) {
      return (
        <div style={style}>
          {labelText}
        </div>
      );
    }
  },

  handleChange: function(event) {
    const {onChange} = this.props;
    const {value, name} = event.target;
    const hasValue = value ? true : false;

    this.setState({
      hasValue
    }, () => onChange(name, value));
  },

  handleInputFocus: function() {
    this.setState({
      focused: true
    });
  },

  handleInputBlur: function() {
    this.setState({
      focused: false
    });
  },

  isFocused: function() {
    return this.state.focused;
  },

  hasValue: function() {
    return this.state.hasValue;
  }
});

export default TextArea;
