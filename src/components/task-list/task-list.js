import './task-list.css';
import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task';

function TaskList(props) {
  const { tasks, taskDelete, onToggleDone, taskEdit, onTimer } = props;
  const createdTasks = tasks.map((element) => (
    <Task
      tasks={element}
      key={element.id}
      taskDeleted={() => taskDelete(element.id)}
      onToggleDone={() => onToggleDone(element.id)}
      taskEdit={(text) => taskEdit(element.id, text)}
      onTimer={(timerId) => onTimer(element.id, timerId)}
    />
  ));

  return <ul className="todo-list">{createdTasks}</ul>;
}

TaskList.defaultProps = {
  tasks: [],
  taskDelete: () => {},
  onToggleDone: () => {},
};

TaskList.propTypes = {
  tasks: PropTypes.array,
  taskDelete: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default TaskList;
