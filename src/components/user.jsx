import { useState } from "react";
import "./user.css";
import propic from "../icons_FEtask/profile-circle-svgrepo-com.svg"
import plus from '../icons_FEtask/add.svg';
import threedot from '../icons_FEtask/3 dot menu.svg';

const User = ({ data, order }) => {
  const [tickets, setTickets] = useState(data.tickets);
  const [users, setUsers] = useState(data.users);

  // Group tickets by user ID
  const groupTicketsByUser = (userId) => {
    const filteredTickets = tickets.filter(
      (ticket) => ticket.userId === userId
    );

    // Sort tickets based on the 'order' prop
    if (order === "Priority") {
      // Assuming 'priority' is a numeric field
      return filteredTickets.sort((a, b) => b.priority - a.priority); // Descending order
    } else if (order === "Title") {
      return filteredTickets.sort((a, b) => a.title.localeCompare(b.title)); // Ascending order
    }

    return filteredTickets;
  };

  // Render a column for each user
  const renderTicketColumn = (user, columnTitle) => {
    const groupedTickets = groupTicketsByUser(user.id);
    return (
      <div key={user.id} className="ticket-column">
        <h3 className="column-top">
          <div className="column-title"> 
          <div>{<img src={propic} height="20px" alt="img" />}</div>
          <div className="column-text">{columnTitle}</div>
          <div className="ticket-length"> {groupedTickets.length}</div>
          </div>
          
          <div className="column-right">
            <div>{<img src={plus} alt="img" />}</div>
            <div>{<img src={threedot} alt="img" />}</div>
          </div>
        </h3>
        {groupedTickets.map((ticket) => (
          <div key={ticket.id} className="ticket-card">
            <div className="card-header">
              <div className="ticket-icon">
                <div>
                  <div>{ticket.id}</div>
                  <h4>{ticket.title}</h4>
                </div>
                
              </div>
            </div>
            {/* <div className="priority">Priority: {ticket.priority}</div> */}
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
      {users.map((user) => renderTicketColumn(user, user.name))}
    </div>
  );
};

export default User;
