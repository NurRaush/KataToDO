import React, { useState } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

function NewTaskForm(props) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  function onInputChange(e) {
    if (e.target.name === 'label') {
      setLabel(e.target.value);
    } else if (e.target.name === 'min') {
      setMin(e.target.value);
    } else if (e.target.name === 'sec') {
      setSec(e.target.value);
    }
  }

  function onLabelSubmit(e) {
    e.preventDefault();
    const { createNewTask } = props;
    createNewTask(label, min, sec);
    setLabel('');
    setMin(0);
    setSec(0);
  }

  return (
    <form onSubmit={onLabelSubmit} className="new-todo-form">
      <input
        name="label"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onInputChange}
        value={label}
      />
      <input
        className="new-todo-form__timer"
        name="min"
        max={60}
        min={0}
        type="number"
        placeholder="min"
        value={min}
        onChange={onInputChange}
      />
      <input
        className="new-todo-form__timer"
        name="sec"
        max={60}
        min={0}
        type="number"
        placeholder="sec"
        value={sec}
        onChange={onInputChange}
      />
      <input type="submit" className="hidden" />
    </form>
  );
}

NewTaskForm.defaultProps = {
  createNewTask: () => {},
};

NewTaskForm.propTypes = {
  createNewTask: PropTypes.func,
};

export default NewTaskForm;
