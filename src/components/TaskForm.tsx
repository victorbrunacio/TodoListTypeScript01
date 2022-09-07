import { useState, ChangeEvent, FormEvent, useEffect, HTMLInputTypeAttribute } from 'react'
//css
import styles from "./TaskForm.module.css"

//interface
import { ITask } from "../interfaces/task"

interface Props {
  btnText: string
  taskList: ITask[]
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
  task?: ITask | null
  handleUpdate?(id: number, title: string, difficulty: number): void
}

const TaskForm = ({ btnText, taskList, setTaskList, task, handleUpdate }: Props) => {

  const [id, setId] = useState<number>(0)
  const [difficulty, setDifficulty] = useState<number>(0)
  const [title, setTitle] = useState<string>("")

  useEffect(() => {
    if (task) {
      setId(task.id)
      setTitle(task.title)
      setDifficulty(task.difficulty)
    }
  }, [task]);

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (handleUpdate) {
      handleUpdate(id, title, difficulty)
    } else {
      const id = Math.floor(Math.random() * 1000)
      const newTask: ITask = { id, title, difficulty }
      setTaskList!([...taskList, newTask])

      setTitle("")
      setDifficulty(0)
    }

  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value)
    } else {
      setDifficulty(parseInt(e.target.value))
    }
  }



  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="Title">Título:</label>
        <input type="text" name="title" onChange={handleChange} value={title} />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="difficulty">Dificuldade::</label>
        <input type="text" name='difficulty' onChange={handleChange} value={difficulty} />
      </div>
      <input type="submit" value={btnText} />
    </form>
  )
}

export default TaskForm