import { useState } from "react";
import "./status.css";
import backlogicon from "../icons_FEtask/Backlog.svg";
import todoicon from "../icons_FEtask/To-do.svg";
import inprogicon from "../icons_FEtask/in-progress.svg";
import doneicon from "../icons_FEtask/Done.svg";
import cancelledicon from "../icons_FEtask/Cancelled.svg";
import plus from '../icons_FEtask/add.svg';
import threedot from '../icons_FEtask/3 dot menu.svg';

const Status = ({ data, order }) => {
  const [tickets, setTickets] = useState(data.tickets);

  // Group tickets by status
  const groupTicketsByStatus = (status) => {
    let filteredTickets = tickets.filter((ticket) => ticket.status === status);

    if (order === "Priority") {
      // Assuming 'priority' is a numeric field
      return filteredTickets.sort((a, b) => b.priority - a.priority); // Descending order
    } else if (order === "Title") {
      return filteredTickets.sort((a, b) => a.title.localeCompare(b.title)); // Ascending order
    }

    return filteredTickets;
  };

  // Render a column for each status
  const renderTicketColumn = (status, columnTitle) => {
    const groupedTickets = groupTicketsByStatus(status);
    return (
      <div className="ticket-column">
        <h3 className="column-top">
          <div className="column-title">
          <div className="column-icon">
              {columnTitle === "Backlog" && <img src={backlogicon} alt="img" />}
              {columnTitle === "Todo" && <img src={todoicon} alt="img" />}
              {columnTitle === "In Progress" && <img src={inprogicon} alt="img" />}
              {columnTitle === "Completed" && <img src={doneicon} alt="img" />}
              {columnTitle === "Cancelled" && <img src={cancelledicon} alt="img" />}
            </div>
          <div>{columnTitle}</div>
          <div className="ticket-length"> {groupedTickets.length}</div>
          </div>
          <div className="column-right">
            <div>{<img src={plus} alt="img" />}</div>
            <div>{<img src={threedot} alt="img" />}</div>
          </div>
        </h3>{" "}
        {groupedTickets.map((ticket) => (
          <div key={ticket.id} className="ticket-card">
            <div className="card-header">
              <div className="ticket-icon">
                <div>
                  <div>{ticket.id}</div>
                  <h4>{ticket.title}</h4>
                </div>
                <div className="avatar">
                  {/* Replace with an actual image if available */}
                  <img
                    src={`https://via.placeholder.com/30x30?text=${ticket.userId}`}
                    alt="User"
                  />
                </div>
              </div>
            </div>
            <div className="cards">
            <div className="card-feature"><img src={threedot} alt="img" /></div>
            <div className="card-feature">Feature Request</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="ticket-board">
      {renderTicketColumn("Backlog", "Backlog")}
      {renderTicketColumn("Todo", "Todo")}
      {renderTicketColumn("In progress", "In Progress")}
      {renderTicketColumn("Completed", "Completed")}
      {renderTicketColumn("Cancelled", "Cancelled")}
    </div>
  );
};

export default Status;
