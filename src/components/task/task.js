import './task.css';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.Component {
  constructor(props) {
    super(props);
    const { timerId } = props.tasks;
    this.timerId = timerId;
    this.state = {
      label: '',
      isEditing: false,
    };
  }

  componentDidMount() {
    const { tasks } = this.props;
    const { done } = tasks;
    if (!this.timerId && !done) {
      this.timerId = setInterval(this.tick, 1000);
    } else if (done) {
      this.onTimerStop();
    }
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onUpdateTask = (e) => {
    if (e.code === 'Enter') {
      const { taskEdit } = this.props;
      const { label } = this.state;
      e.target.value = '';
      taskEdit(label);
      this.setState({
        label: '',
        isEditing: false,
      });
    }
  };

  tick = () => {
    const { tasks, onTimer } = this.props;
    const { timestamp, isTimerSet } = tasks;

    if (timestamp <= 0 && isTimerSet) {
      clearInterval(this.timerId);
    } else {
      onTimer(this.timerId);
    }
  };

  onTimerPlay = () => {
    const { tasks } = this.props;
    const { timestamp } = tasks;
    if (this.timerId || timestamp <= 0) {
      return;
    }
    this.timerId = setInterval(this.tick, 1000);
  };

  onTimerStop = () => {
    clearInterval(this.timerId);
    this.timerId = null;
  };

  render() {
    const { tasks } = this.props;
    const { description, done, createdDate, timestamp } = tasks;
    const { taskDeleted, onToggleDone } = this.props;
    const date = formatDistanceToNow(createdDate);
    const { label, isEditing } = this.state;
    const timer = new Date(timestamp);
    let className = '';
    if (done) {
      className = 'completed';
    } else if (isEditing) {
      className = 'editing';
    }
    return (
      <li className={className}>
        <div className="view">
          <input
            name="checkbox"
            defaultChecked={done}
            className="toggle"
            type="checkbox"
            onClick={() => {
              if (!done) {
                this.onTimerStop();
              } else {
                this.onTimerPlay();
              }
              onToggleDone();
            }}
          />
          {!isEditing && (
            <label>
              <span className="title">{description}</span>
              <span className="description">
                <button type="button" className="icon icon-play" onClick={this.onTimerPlay} />
                <button type="button" className="icon icon-pause" onClick={this.onTimerStop} />
                <span className="tim">{`${timer.getMinutes()}:${timer.getSeconds()}`}</span>
              </span>
              <span className="description">{`created ${date} ago`}</span>
            </label>
          )}
          <button
            type="button"
            className="icon icon-edit"
            onClick={() => {
              this.setState({ isEditing: true });
            }}
          />
          <button
            type="button"
            className="icon icon-destroy"
            onClick={() => {
              clearInterval(this.timerId);
              this.timerId = null;
              taskDeleted();
            }}
          />
        </div>
        {isEditing && (
          <input className="edit" type="text" onChange={this.onLabelChange} onKeyUp={this.onUpdateTask} value={label} />
        )}
      </li>
    );
  }
}

Task.defaultProps = {
  tasks: { description: 'noDescription', done: false },
  taskDeleted: () => {},
  onToggleDone: () => {},
};

Task.propTypes = {
  tasks: PropTypes.object,
  taskDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default Task;
