import './task.css';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.Component {
  taskEdit = () => {
    this.setState(({ edit }) => ({
      edit: !edit,
    }));
  };

  render() {
    const { tasks } = this.props;
    const { description, done, hide, createdDate } = tasks;
    const { taskDeleted, onToggleDone } = this.props;
    const date = formatDistanceToNow(createdDate);
    let className = '';
    if (done) {
      className = 'completed';
    }
    if (hide) {
      className += ' hide';
    }

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} />
          <label>
            <span className="description">{description}</span>
            <span className="created">
              created
              {date}
              ago
            </span>
          </label>
          <button type="button" className="icon icon-edit" onClick={this.taskEdit} />
          <button type="button" className="icon icon-destroy" onClick={taskDeleted} />
        </div>
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
