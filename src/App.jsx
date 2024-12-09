import { useState } from 'react'
import styles from './App.module.css'
import { Form } from './components/form/form'
import { TodoItem } from './components/TodoItem/TodoItem'
import { getSubheading } from './utils/getSubheading'

function App() {
	const [isFormShown, setIsFormShown] = useState(false)

	const [tasks, setTasks] = useState([
		{ name: 'Wyrzucić śmieci', done: true, id: 1 },
		{ name: 'Zapłacić rachunki', done: false, id: 2 },
	])

	function addItem(newTaskName) {
		setTasks(prevTasks => [
			...prevTasks,

			{ name: newTaskName, done: false, id: prevTasks.length > 0 ? prevTasks.at(-1).id + 1 : 0 },
		])
		setIsFormShown(false)
	}

	function deleteItem(id) {
		setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
	}

	function finishItem(id) {
		setTasks(prevTasks =>
			prevTasks.map(task => {
				if (task.id !== id) {
					return task
				}
				return {
					...task,
					done: true,
				}
			})
		)
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div>
					<h1>Todo Lista</h1>
					<h2>{getSubheading(tasks.length)}</h2>
				</div>
				{!isFormShown && (
					<button
						onClick={() => {
							setIsFormShown(true)
						}}
						className={styles.button}>
						+
					</button>
				)}
			</header>
			{isFormShown && <Form onFormSubmit={newTaskName => addItem(newTaskName)} />}

			<ul>
				{tasks.map(({ id, name, done }) => (
					<TodoItem
						key={id}
						name={name}
						done={done}
						onDeleteButtonClick={() => deleteItem(id)}
						onDoneButtonClick={() => finishItem(id)}
					/>
				))}
			</ul>
		</div>
	)
}

export default App
