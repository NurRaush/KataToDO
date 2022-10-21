import './task.css';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      isEditing: false,
    };
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

  render() {
    const { tasks } = this.props;
    const { description, done, hide, createdDate } = tasks;
    const { taskDeleted, onToggleDone } = this.props;
    const date = formatDistanceToNow(createdDate);
    const { label, isEditing } = this.state;
    let className = '';
    if (done) {
      className = 'completed';
    } else if (isEditing) {
      className = 'editing';
    }
    if (hide) {
      className += ' hide';
    }
    return (
      <li className={className}>
        <div className="view">
          <input name="checkbox" className="toggle" type="checkbox" onClick={onToggleDone} />
          {!isEditing && (
            <label>
              <span className="description">{description}</span>
              <span className="created">
                created
                {date}
                ago
              </span>
            </label>
          )}
          <button
            type="button"
            className="icon icon-edit"
            onClick={() => {
              this.setState({ isEditing: true });
            }}
          />
          <button type="button" className="icon icon-destroy" onClick={taskDeleted} />
        </div>
        {isEditing && (
          <input className="edit" type="text" onChange={this.onLabelChange} onKeyUp={this.onUpdateTask} value={label} />
        )}
      </li>
    );
  }
}

Task.defaultProps = {
  tasks: { description: 'noDescription', done: false, hide: false },
  taskDeleted: () => {},
  onToggleDone: () => {},
};

Task.propTypes = {
  tasks: PropTypes.object,
  taskDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default Task;
