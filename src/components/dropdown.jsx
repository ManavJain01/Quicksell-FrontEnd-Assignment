// DropdownMenu.js
import { Select } from 'antd';

const { Option } = Select;

const DropdownMenu = ({ grouping, ordering, onGroupingChange, onOrderingChange }) => {
  return (
    <div style={{ padding: '10px 20px', backgroundColor: 'white', borderRadius: '10px' }}>
      <div style={{ marginBottom: '15px' }}>
        <span style={{ marginRight: '10px' }}>Grouping</span>
        <Select defaultValue={grouping} style={{ width: 120 }} onChange={onGroupingChange}>
          <Option value="Status">Status</Option>
          <Option value="User">User</Option>
          <Option value="Priority">Priority</Option>
        </Select>
      </div>
      <div>
        <span style={{ marginRight: '10px' }}>Ordering</span>
        <Select defaultValue={ordering} style={{ width: 120 }} onChange={onOrderingChange}>
          <Option value="Priority">Priority</Option>
          <Option value="Title">Title</Option>
        </Select>
      </div>
    </div>
  );
};

export default DropdownMenu;
