import './task-filter.css';
import React from 'react';
import PropTypes from 'prop-types';

class TasksFilter extends React.Component {
  containerClick = (e) => {
    const list = e.target.closest('ul');
    const selectedFilter = e.target;
    for (const elem of list.children) {
      elem.firstElementChild.className = '';
    }
    selectedFilter.className = 'selected';
    const { filterTasks } = this.props;
    filterTasks(selectedFilter.textContent);
  };

  render() {
    return (
      <ul className="filters" onClick={this.containerClick} onKeyUp={() => {}}>
        <li>
          <button type="button" className="selected">
            All
          </button>
        </li>
        <li>
          <button type="button">Active</button>
        </li>
        <li>
          <button type="button">Completed</button>
        </li>
      </ul>
    );
  }
}

TasksFilter.defaultProps = {
  filterTasks: () => {},
};

TasksFilter.propTypes = {
  filterTasks: PropTypes.func,
};
export default TasksFilter;
