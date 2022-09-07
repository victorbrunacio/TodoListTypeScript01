import React from 'react'
import { ITask } from '../interfaces/task'

import styles from "./TaskList.module.css"
import {FiTrash} from "react-icons/fi"
import {BsPencil} from "react-icons/Bs"

type Props = {
  taskList: ITask[]
  handleDelete(id:number): void
  handleEdit(task: ITask):void
}

const TaskList = ({taskList, handleDelete, handleEdit}: Props) => {
  return (
    <>
        {taskList.length > 0 ? (
          taskList.map((task, index)=>{
            return (
              <div key={index} className={styles.task}>
                <div className={styles.details}>
                  <h4>{task.title}</h4>
                  <p>Dificuldade: {task.difficulty}</p>
                </div>

                <div className={styles.actions}>
                    <FiTrash onClick={()=>handleDelete(task.id) }/>
                    <BsPencil onClick={()=>handleEdit(task)} />
                </div>
              </div>
            )
          })
        ) : (
          <p>Não há tarefas</p>
        )}
    </>
  )
}

export default TaskList