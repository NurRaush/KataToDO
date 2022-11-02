import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list';
import Footer from './components/footer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      filter: 'All',
    };
    this.id = 1;
  }

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      return {
        tasks: [...tasks.slice(0, idx), ...tasks.slice(idx + 1)],
      };
    });
  };

  editTask = (id, text) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const editedTask = {
        ...tasks[idx],
        description: text,
      };
      return {
        tasks: [...tasks.slice(0, idx), editedTask, ...tasks.slice(idx + 1)],
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const updatedItem = { ...tasks[idx], done: !tasks[idx].done };
      return {
        tasks: [...tasks.slice(0, idx), updatedItem, ...tasks.slice(idx + 1)],
      };
    });
  };

  onTimer = (id, timerId) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const { isTimerSet } = tasks[idx];
      let { timestamp } = tasks[idx];
      timestamp = isTimerSet ? timestamp - 1000 : timestamp + 1000;
      const updatedItem = { ...tasks[idx], timestamp, timerId };
      return {
        tasks: [...tasks.slice(0, idx), updatedItem, ...tasks.slice(idx + 1)],
      };
    });
  };

  createNewTask = (text, min, sec) => {
    const timestamp = (min * 60 + Number(sec)) * 1000;
    this.setState(({ tasks }) => ({
      tasks: [
        ...tasks.slice(0),
        {
          description: text,
          done: false,
          id: this.id++,
          createdDate: Date.now(),
          timestamp,
          isTimerSet: timestamp > 0,
          timerId: null,
        },
      ],
    }));
  };

  clearTasks = () => {
    this.setState(({ tasks }) => {
      const copyTasks = tasks.filter((el) => !el.done);
      return {
        tasks: [...copyTasks],
      };
    });
  };

  filterTasks = (filterName) => {
    this.setState({ filter: filterName });
  };

  render() {
    const { tasks, filter } = this.state;
    const uncompletedCount = tasks.filter((el) => !el.done).length;
    let filteredTasks = tasks;
    if (filter === 'Completed') {
      filteredTasks = tasks.filter((el) => el.done);
    } else if (filter === 'Active') {
      filteredTasks = tasks.filter((el) => !el.done);
    }
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm createNewTask={this.createNewTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            taskDelete={this.deleteTask}
            onToggleDone={this.onToggleDone}
            taskEdit={this.editTask}
            onTimer={this.onTimer}
          />
          <Footer filterTasks={this.filterTasks} uncompletedCount={uncompletedCount} clearTasks={this.clearTasks} />
        </section>
      </section>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
