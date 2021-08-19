import { useHttp } from '../../hooks';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
	const { error, isLoading, sendRequest: sendTaskRequest } = useHttp();

	const createTask = async (taskText, taskData) => {
		const data = await taskData;
		const generatedId = data.name;
		const createdTask = { id: generatedId, text: taskText };

		props.onAddTask(createdTask);
	};

	const enterTaskHandler = (taskText) => {
		sendTaskRequest(
			{
				url: 'https://react-http-992d0-default-rtdb.firebaseio.com/tasks.json',
				method: 'POST',
				body: { text: taskText },
				headers: {
					'Content-Type': 'application/json'
				}
			},
			createTask.bind(null, taskText)
		);
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
