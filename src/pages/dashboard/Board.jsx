import '../../styles/Board.css'

import { VscAdd, VscChevronDown, VscCollapseAll } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux'

import Layout from '../../layout/Layout'

function Board() {
    const dispatch = useDispatch();
    const name = useSelector((state) => state.auth?.data?.name)
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

    return (
        <Layout>
            <div className="board-container">
                <header>
                    <h1>Welcome! {name}</h1>
                    <span>{getFormattedDate()}</span>
                </header>
                <div className="sub-header">
                    <h1>Board</h1>
                    <span>This Week <VscChevronDown /> </span>
                </div>
                <div className="boards">
                    <div className="board">
                        <div className="board-name">
                            <span>Backlog</span>
                            <VscCollapseAll />
                        </div>
                    </div>
                    <div className="board">
                        <div className="board-name">
                            <span>To Do</span>
                            <div className="add-task">
                                <VscAdd />
                                <VscCollapseAll />
                            </div>
                        </div>
                    </div>
                    <div className="board">
                        <div className="board-name">
                            <span>In Progress</span>
                            <VscCollapseAll />
                        </div>
                    </div>
                    <div className="board">
                        <div className="board-name">
                            <span>Done</span>
                            <VscCollapseAll />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Board
