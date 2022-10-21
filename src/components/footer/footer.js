import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter';

import './footer.css';

function Footer({ uncompletedCount, filterTasks, clearTasks }) {
  return (
    <footer className="footer">
      <span className="todo-count">{uncompletedCount} items left</span>
      <TasksFilter
        filterTasks={(text) => {
          filterTasks(text);
        }}
      />
      <button type="button" className="clear-completed" onClick={clearTasks}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  uncompletedCount: 0,
  filterTasks: () => {},
  clearTasks: () => {},
};

Footer.propTypes = {
  uncompletedCount: PropTypes.number,
  filterTasks: PropTypes.func,
  clearTasks: PropTypes.func,
};

export default Footer;
