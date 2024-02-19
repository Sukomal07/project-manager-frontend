import '../../styles/Analytics.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Layout from '../../layout/Layout';
import { getBacklogTask, getDoneTask, getDueTask, getHighPriority, getLowPriority, getModeratePriority, getProgressTask, getTodoTask } from '../../redux/slices/AnalyticsSlice';

function Analytics() {
    const dispatch = useDispatch()
    const {
        backlog,
        todo,
        progress,
        done,
        low,
        high,
        moderate,
        dueTask
    } = useSelector((state) => state.analytics);

    useEffect(() => {
        dispatch(getBacklogTask())
        dispatch(getDoneTask())
        dispatch(getProgressTask())
        dispatch(getTodoTask())
        dispatch(getHighPriority())
        dispatch(getLowPriority())
        dispatch(getModeratePriority())
        dispatch(getDueTask())
    }, [])
    return (
        <Layout>
            <div className="analytics-container">
                <h1>Analytics</h1>
                <div className="analytics-sections">
                    <div className="task-status-section">
                        <ul>
                            <li><span className="dot backlog-dot"></span> Backlog Tasks <span className="task-count">{backlog.totalTask}</span></li>
                            <li><span className="dot todo-dot"></span> To-do Tasks <span className="task-count">{todo.totalTask}</span></li>
                            <li><span className="dot inprogress-dot"></span> In-Progress Tasks <span className="task-count">{progress.totalTask}</span></li>
                            <li><span className="dot completed-dot"></span> Completed Tasks <span className="task-count">{done.totalTask}</span></li>
                        </ul>
                    </div>
                    <div className="task-priority-section">
                        <ul>
                            <li><span className="dot low-dot"></span> Low Priority <span className="task-count">{low}</span></li>
                            <li><span className="dot moderate-dot"></span> Moderate Priority <span className="task-count">{moderate}</span></li>
                            <li><span className="dot high-dot"></span> High Priority <span className="task-count">{high}</span></li>
                            <li><span className="dot duedate-dot"></span> Due Date Tasks <span className="task-count">{dueTask}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Analytics;
