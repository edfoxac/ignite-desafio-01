import { useState } from 'react'

import '../styles/tasklist.scss';

import { v4 as uuidv4 } from 'uuid';


import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}
export function TaskList() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTask, setNewTask] = useState();

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    const uuid2 = uuidv4();

    const novaTask = [{
        id: uuid2,
        title: newTaskTitle,
        isComplete: false
      }];


      // if(!newTaskTitle){
      //   alert('Este campo não pode ser vazio');
      // } else { 
      // }


      if(newTaskTitle){
        setTasks([...tasks, {
        id: uuid2,
        title: newTaskTitle,
        isComplete: false
        }]);
      }

  }

  function handleToggleTaskCompletion(id: string) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    let newArr = tasks.map((item, i) => {
      if (id == item.id) {
        if(item.isComplete){
          return { ...item, isComplete: false };
        } else {
          return { ...item, isComplete: true };
        }
        

      } else {
        return item;
      }
    });
    setTasks(newArr);
  }

  function handleRemoveTask(id: string) {
    // Remova uma task da listagem pelo ID
    const newList = tasks.filter((item) => item.id !== id);
    setTasks(newList);
  
  }
  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}