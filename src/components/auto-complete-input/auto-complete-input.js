import React, { Component } from 'react';

import './auto-complete-input.scss';
import { debounce } from '../../utils/utils'

const ENTER = 13;
const ARROW_UP = 38;
const ARROW_DOWN = 40;

const changeFocus = (currentValue, autoCompletionsLength, change) => {
  currentValue += change + autoCompletionsLength;
  if (autoCompletionsLength > 0) {
    currentValue %= autoCompletionsLength;
  }
  return currentValue;
}

export class AutoCompleteInput extends Component {
  constructor(props) {
    super(props);

    this.state = { value: '', isFocused: false, autoCompletions: [], focus: -1 }
  }

  handleInputChange = (event) => {
    this.setValue(event.target.value)
  }

  getAutoCompletions = () => {
    debounce(() => {
      // If I was firing to backend instead of using the localStorage, I would give value as a parameter
      const autoCompletions = this.props.getAutoCompletions().filter(location => location.toLocaleLowerCase().includes(this.state.value.toLocaleLowerCase())).slice(0, 5);
      this.setState({ autoCompletions });
    }, 400);
  }

  handleKeyDown = (event) => {
    const autoCompletionsLength = this.state.autoCompletions.length;
    switch (event.keyCode) {
      case ENTER:
        this.setValue(this.state.autoCompletions[this.state.focus]);
        this.setState({focus: -1});
        event.target.blur();
        break;
      case ARROW_UP:
        let focus = changeFocus(this.state.focus, autoCompletionsLength, -1);
        this.setState({focus});
        break;
      case ARROW_DOWN:
        focus = changeFocus(this.state.focus, autoCompletionsLength, 1);
        this.setState({focus});
        break;
      default:
        break;
    }
  }

  setValue = (value) => {
    this.setState({ value })
    this.emitChange(value);
  }

  setIsFocused = (isFocused) => {
    this.getAutoCompletions();
    this.setState({ isFocused });
  }

  emitChange = (value) => {
    this.getAutoCompletions();
    this.props.onChange(value);
  }

  render() {
    return (
      <div className='auto-complete'>
        <label
          onFocus={() => this.setIsFocused(true)}
          onBlur={() => this.setIsFocused(false)}
          onKeyDown={this.handleKeyDown}
        >
          {this.props.label}
          <input className='auto-complete-input' type="text" value={this.state.value} onChange={this.handleInputChange}/>
          { this.state.isFocused && <div className={'auto-complete-dropdown'}>
            { this.state.autoCompletions.map((autoCompletion, index) => {
              return (<div
                key={index}
                onMouseDown={() => this.setValue(autoCompletion)}
                className={`auto-complete-option ${this.state.focus === index ? 'active' : ''}`}>
                  {autoCompletion}
                </div>);
            })}
          </div>}
        </label>
      </div>
    );
  }
}

