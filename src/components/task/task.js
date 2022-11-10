import './task.css';
import { formatDistanceToNow } from 'date-fns';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Task(props) {
  const { tasks, taskDeleted, onToggleDone } = props;
  const { timerId, description, done, createdDate, timestamp, isTimerSet } = tasks;
  const [timer, setTimer] = useState(timerId);
  const [label, setLabel] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const date = formatDistanceToNow(createdDate);
  const timerSt = new Date(timestamp);
  let className = '';
  if (done) {
    className = 'completed';
  } else if (isEditing) {
    className = 'editing';
  }

  if (timestamp <= 0 && isTimerSet) {
    clearInterval(timer);
  }
  const tick = () => {
    const { onTimer } = props;
    onTimer(timer);
  };

  function onTimerStop() {
    clearInterval(timer);
    setTimer(null);
  }

  useEffect(() => {
    if (!timer && !done) {
      setTimer(setInterval(tick, 1000));
    } else if (done) {
      onTimerStop();
    }
  }, []);

  function onLabelChange(e) {
    setLabel(e.target.value);
  }

  function onUpdateTask(e) {
    if (e.code === 'Enter') {
      const { taskEdit } = props;
      e.target.value = '';
      taskEdit(label);
      setLabel('');
      setIsEditing(false);
    }
  }

  function onTimerPlay() {
    if (timer || timestamp <= 0) {
      return;
    }
    setTimer(setInterval(tick, 1000));
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
              onTimerStop();
            } else {
              onTimerPlay();
            }
            onToggleDone();
          }}
        />
        {!isEditing && (
          <label>
            <span className="title">{description}</span>
            <span className="description">
              <button type="button" className="icon icon-play" onClick={onTimerPlay} />
              <button type="button" className="icon icon-pause" onClick={onTimerStop} />
              <span className="tim">{`${timerSt.getMinutes()}:${timerSt.getSeconds()}`}</span>
            </span>
            <span className="description">{`created ${date} ago`}</span>
          </label>
        )}
        <button
          type="button"
          className="icon icon-edit"
          onClick={() => {
            setIsEditing(true);
          }}
        />
        <button
          type="button"
          className="icon icon-destroy"
          onClick={() => {
            clearInterval(timer);
            setTimer(null);
            taskDeleted();
          }}
        />
      </div>
      {isEditing && (
        <input className="edit" type="text" onChange={onLabelChange} onKeyUp={onUpdateTask} value={label} />
      )}
    </li>
  );
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
