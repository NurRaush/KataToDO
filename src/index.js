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
    };
    this.id = 1;
  }

  resetHidden = () => {
    this.setState(({ tasks }) => {
      const resetedTasks = tasks.map((el) => ({
        ...el,
        hide: false,
      }));
      return {
        tasks: [...resetedTasks],
      };
    });
  };

  filterTasks = (text) => {
    this.resetHidden();
    if (text === 'Completed') {
      this.hideTasks(true);
    } else if (text === 'Active') {
      this.hideTasks(false);
    }
  };

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

  createNewTask = (text) => {
    this.setState(({ tasks }) => ({
      tasks: [
        ...tasks.slice(0),
        {
          description: text,
          done: false,
          hide: false,
          id: this.id++,
          createdDate: Date.now(),
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

  hideTasks(done) {
    this.setState(({ tasks }) => {
      const copyTasks = tasks.map((el) => {
        const copyEl = { ...el };
        if (copyEl.done === !done) {
          copyEl.hide = true;
        }
        return copyEl;
      });
      return {
        tasks: [...copyTasks],
      };
    });
  }

  render() {
    const { tasks } = this.state;
    const uncompletedCount = tasks.filter((el) => !el.done).length;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm createNewTask={this.createNewTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={tasks}
            taskDelete={this.deleteTask}
            onToggleDone={this.onToggleDone}
            taskEdit={this.editTask}
          />
          <Footer filterTasks={this.filterTasks} uncompletedCount={uncompletedCount} clearTasks={this.clearTasks} />
        </section>
      </section>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
