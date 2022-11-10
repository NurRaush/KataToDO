import './index.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list';
import Footer from './components/footer';

function App() {
  const [id, setId] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  const uncompletedCount = tasks.filter((el) => !el.done).length;
  let filteredTasks = tasks;
  if (filter === 'Completed') {
    filteredTasks = tasks.filter((el) => el.done);
  } else if (filter === 'Active') {
    filteredTasks = tasks.filter((el) => !el.done);
  }

  const deleteTask = (idD) => {
    setTasks((tasksS) => {
      const idx = tasksS.findIndex((el) => el.id === idD);
      return [...tasksS.slice(0, idx), ...tasksS.slice(idx + 1)];
    });
  };

  const editTask = (idD, text) => {
    setTasks((tasksS) => {
      const idx = tasksS.findIndex((el) => el.id === idD);
      const editedTask = {
        ...tasksS[idx],
        description: text,
      };
      return [...tasksS.slice(0, idx), editedTask, ...tasksS.slice(idx + 1)];
    });
  };

  const onToggleDone = (idD) => {
    setTasks((tasksS) => {
      const idx = tasksS.findIndex((el) => el.id === idD);
      const updatedItem = { ...tasksS[idx], done: !tasksS[idx].done };
      return [...tasksS.slice(0, idx), updatedItem, ...tasksS.slice(idx + 1)];
    });
  };

  const onTimer = (idD, timerId) => {
    setTasks((tasksS) => {
      const idx = tasksS.findIndex((el) => el.id === idD);
      const { isTimerSet } = tasksS[idx];
      let { timestamp } = tasksS[idx];
      timestamp = isTimerSet ? timestamp - 1000 : timestamp + 1000;
      const updatedItem = { ...tasksS[idx], timestamp, timerId };
      return [...tasksS.slice(0, idx), updatedItem, ...tasksS.slice(idx + 1)];
    });
  };

  const createNewTask = (text, min, sec) => {
    const timestamp = (min * 60 + Number(sec)) * 1000;
    setId((el) => el + 1);
    setTasks((tasksS) => [
      ...tasksS.slice(0),
      {
        description: text,
        done: false,
        id,
        createdDate: Date.now(),
        timestamp,
        isTimerSet: timestamp > 0,
        timerId: null,
      },
    ]);
  };

  const clearTasks = () => {
    setTasks((tasksS) => {
      const copyTasks = tasksS.filter((el) => !el.done);
      return [...copyTasks];
    });
  };

  const filterTasks = (filterName) => {
    setFilter(filterName);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm createNewTask={createNewTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          taskDelete={deleteTask}
          onToggleDone={onToggleDone}
          taskEdit={editTask}
          onTimer={onTimer}
        />
        <Footer filterTasks={filterTasks} uncompletedCount={uncompletedCount} clearTasks={clearTasks} />
      </section>
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
