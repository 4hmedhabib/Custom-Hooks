import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import { useHttp } from './hooks/';

function App() {
	const [ tasks, setTasks ] = useState([]);

	const transformTask = (data) => {
		const loadedData = [];
		for (let key in data) {
			loadedData.push({
				id: key,
				text: data[key].text
			});
		}
		setTasks(loadedData);
	};

	const { isLoading, error, sendRequest: fetchTasks } = useHttp();

	useEffect(
		() => {
			fetchTasks({ url: 'https://react-http-992d0-default-rtdb.firebaseio.com/tasks.json' }, transformTask);
		},
		[ fetchTasks ]
	);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks items={tasks} loading={isLoading} error={error} onFetch={fetchTasks} />
		</React.Fragment>
	);
}

export default App;
