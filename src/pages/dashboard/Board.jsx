import '../../styles/Board.css'

import { useEffect, useState } from 'react';
import { VscAdd, VscChevronDown, VscChevronUp, VscCollapseAll, VscEllipsis } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux'

import Layout from '../../layout/Layout'
import { getTimeFrameTask, markChecklist } from '../../redux/slices/TaskSlice';

function Board() {
    const dispatch = useDispatch();

    const name = useSelector((state) => state.auth?.data?.name)

    const [showDropdown, setShowDropdown] = useState(false);
    const [timeFrame, setTimeFrame] = useState("week");
    const [tasks, setTasks] = useState([]);
    const [data, setData] = useState({
        taskId: '',
        checklistId: '',
        isCompleted: ''
    })


    const getFormattedDate = () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.toLocaleString('default', { month: 'short' });
        const year = currentDate.getFullYear();

        const getDaySuffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };

        return `${day}${getDaySuffix(day)} ${month}, ${year}`;
    }

    const handleTimeFrameChange = (timeFrame) => {
        setTimeFrame(timeFrame);
        setShowDropdown(false);
    }

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const convertTimeFrame = (newTimeFrame) => {
        switch (newTimeFrame) {
            case 'today':
                return "Today";
            case 'week':
                return "This Week";
            case 'month':
                return "This Month";
            default:
                return "This Week";
        }
    }
    const convertPriority = (priority) => {
        switch (priority) {
            case 'high':
                return "HIGH PRIORITY";
            case 'low':
                return "LOW PRIORITY";
            case 'Moderate':
                return "MODERATE PRIORITY";
            default:
                return "";
        }
    }

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });

        const getDaySuffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };

        return `${month} ${day}${getDaySuffix(day)}`;
    }

    const filterTasksByStatus = (status) => tasks.filter(task => task.status === status);
    const getOtherBoards = (currentStatus) => {
        const allStatuses = ['backlog', 'todo', 'progress', 'done'];
        return allStatuses.filter(status => status !== currentStatus);
    }
    const countCompletedChecklists = (checklists) => {
        return checklists.filter(checklist => checklist.isCompleted).length;
    }

    const toggleChecklistCompletion = (taskId, checklistId) => {
        setTasks(currentTasks =>
            currentTasks.map(task => {
                if (task._id === taskId) {
                    const updatedChecklists = task.checklists.map(checklist => {
                        if (checklist._id === checklistId) {
                            const newIsCompleted = !checklist.isCompleted;
                            setData({
                                taskId: taskId,
                                checklistId: checklistId,
                                isCompleted: newIsCompleted
                            });

                            return { ...checklist, isCompleted: newIsCompleted };
                        }
                        return checklist;
                    });

                    return { ...task, checklists: updatedChecklists };
                }
                return task;
            })
        );
    }
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await dispatch(getTimeFrameTask(timeFrame))
            setTasks(response.payload?.data)
        }
        fetchTasks()
    }, [timeFrame, dispatch]);
    useEffect(() => {
        if (data.taskId && data.checklistId) {
            const markTheChecklist = async () => {
                await dispatch(markChecklist(data));
            };
            markTheChecklist();
        }
    }, [data, dispatch]);
    return (
        <Layout>
            <div className="board-container">
                <header>
                    <h1>Welcome! {name}</h1>
                    <span>{getFormattedDate()}</span>
                </header>
                <div className="sub-header">
                    <h1>Board</h1>
                    <div className='timeframe'>
                        <span onClick={toggleDropdown} className='timeframe-name'>{convertTimeFrame(timeFrame)} {showDropdown ? <VscChevronUp /> : <VscChevronDown />}</span>
                        {showDropdown && (
                            <div className="dropdown">
                                <span onClick={() => handleTimeFrameChange('today')}>Today</span>
                                <span onClick={() => handleTimeFrameChange('week')}>This Week</span>
                                <span onClick={() => handleTimeFrameChange('month')}>This Month</span>
                            </div>
                        )}
                    </div>

                </div>
                <div className="boards">
                    {['backlog', 'todo', 'progress', 'done'].map((status) => (
                        <div key={status} className="board">
                            <div className="board-name">
                                <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                                {
                                    status === 'todo' ? (
                                        <div className="add-task">
                                            <VscAdd />
                                            <VscCollapseAll />
                                        </div>
                                    ) : <VscCollapseAll />
                                }
                            </div>
                            <div className="all-task">
                                {filterTasksByStatus(status).map((task) => (
                                    <div key={task?._id} className="task">
                                        <header className='task-priority'>
                                            <span>{convertPriority(task?.priority)}</span>
                                            <VscEllipsis />
                                        </header>
                                        <h1>{task?.title}</h1>
                                        <div className="checklist-header">
                                            <span>Checklist{" "} ({countCompletedChecklists(task.checklists)}/{task.checklists.length})</span>
                                            <div>
                                                <VscChevronDown />
                                            </div>
                                        </div>
                                        <div className="all-checklist">
                                            {
                                                task?.checklists?.map((checklist) => {
                                                    return (
                                                        <div className='checklist' key={checklist?._id}>
                                                            <input
                                                                type="checkbox"
                                                                checked={checklist.isCompleted}
                                                                onChange={() => toggleChecklistCompletion(task._id, checklist._id)}
                                                            />
                                                            <span>{checklist?.name}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className='task-footer'>
                                            <span>{formattedDate(task?.dueDate)}</span>
                                            <div className="other-boards">
                                                {getOtherBoards(status).map((otherStatus) => (
                                                    <span key={otherStatus}>{otherStatus.charAt(0).toUpperCase() + otherStatus.slice(1)}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Board
