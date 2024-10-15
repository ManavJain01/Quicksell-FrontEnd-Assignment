import { useState } from "react";
import High from "../icons_FEtask/Img - High Priority.svg";
import Medium from "../icons_FEtask/Img - Medium Priority.svg";
import Low from "../icons_FEtask/Img - Low Priority.svg";
import Urgent from "../icons_FEtask/SVG - Urgent Priority colour.svg";
import NoPri from "../icons_FEtask/No-priority.svg";
import plus from '../icons_FEtask/add.svg';
import threedot from '../icons_FEtask/3 dot menu.svg'

const Priority = ({ data, order }) => {
  const [tickets, setTickets] = useState(data.tickets);

  // Map of priorities
  const priorityLabels = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No priority",
  };

  // Group tickets by priority
  const groupTicketsByPriority = (priority) => {
    let filteredTickets = tickets.filter(
      (ticket) => ticket.priority === priority
    );

    if (order === "Priority") {
      // Assuming 'priority' is a numeric field
      return filteredTickets.sort((a, b) => b.priority - a.priority); // Descending order
    } else if (order === "Title") {
      return filteredTickets.sort((a, b) => a.title.localeCompare(b.title)); // Ascending order
    }

    return filteredTickets;
  };

  // Render a column for each priority
  const renderTicketColumn = (priority) => {
    const groupedTickets = groupTicketsByPriority(priority);
    return (
      <div className="ticket-column">
        <h3 className="column-top">
          <div className="column-title">
            <div className="column-icon">
              {priority === 3 && <img src={High} alt="img" />}
              {priority === 2 && <img src={Medium} alt="img" />}
              {priority === 1 && <img src={Low} alt="img" />}
              {priority === 0 && <img src={NoPri} alt="img" />}
              {priority === 4 && <img src={Urgent} alt="img" />}
            </div>
            <div>{priorityLabels[priority]}</div>
            <div className="ticket-length"> {groupedTickets.length}</div>
          </div>
          <div className="column-right">
            <div>{<img src={plus} alt="img" />}</div>
            <div>{<img src={threedot} alt="img" />}</div>
          </div>
        </h3>{" "}
        {/* Display priority */}
        {groupedTickets.length > 0 ? (
          groupedTickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              <div className="card-header">
                <div className="ticket-icon">
                  <div>
                    <div>{ticket.id}</div> {/* Ticket ID */}
                    <h4>{ticket.title}</h4> {/* Ticket Title */}
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
              <div className="card-feature">Feature Request</div></div>
              {/* Replace with feature type */}
            </div>
          ))
        ) : (
          <p>No tickets with {priorityLabels[priority]} priority</p>
        )}
      </div>
    );
  };

  return (
    <div className="ticket-board">
      {renderTicketColumn(0)} {/* No priority */}
      {renderTicketColumn(4)} {/* Urgent */}
      {renderTicketColumn(3)} {/* High */}
      {renderTicketColumn(2)} {/* Medium */}
      {renderTicketColumn(1)} {/* Low */}
    </div>
  );
};

export default Priority;
