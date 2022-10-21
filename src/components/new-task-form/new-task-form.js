import React from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      label: '',
    };
  }

  onLabelChange = (e) => {
    this.setState(() => ({
      label: e.target.value,
    }));
  };

  onLabelSubmit = (e) => {
    const { label } = this.state;
    e.preventDefault();
    e.target.value = '';
    const { createNewTask } = this.props;
    createNewTask(label);
    this.setState({
      label: '',
    });
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.onLabelSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={this.onLabelChange} value={label} />
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
