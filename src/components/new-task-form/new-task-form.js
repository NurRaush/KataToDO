import React from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      label: '',
      min: 0,
      sec: 0,
    };
  }

  onInputChange = (e) => {
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  onLabelSubmit = (e) => {
    const { label, min, sec } = this.state;
    e.preventDefault();
    const { createNewTask } = this.props;
    createNewTask(label, min, sec);
    this.setState({
      label: '',
      min: 0,
      sec: 0,
    });
  };

  render() {
    const { label, min, sec } = this.state;
    return (
      <form onSubmit={this.onLabelSubmit} className="new-todo-form">
        <input
          name="label"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onInputChange}
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
          onChange={this.onInputChange}
        />
        <input
          className="new-todo-form__timer"
          name="sec"
          max={60}
          min={0}
          type="number"
          placeholder="sec"
          value={sec}
          onChange={this.onInputChange}
        />
        <input type="submit" className="hidden" />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  createNewTask: () => {},
};

NewTaskForm.propTypes = {
  createNewTask: PropTypes.func,
};

export default NewTaskForm;
