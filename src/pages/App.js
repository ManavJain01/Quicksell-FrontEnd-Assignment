// Importing ant components
import { Dropdown, Button, Spin } from "antd";
import { DownOutlined, BarsOutlined } from "@ant-design/icons";

// Importing React Packages
import { useEffect, useState } from "react";
import axios from "axios";

// Importing Local files
import DropdownMenu from "../components/dropdown";
import Status from "../components/status";
import User from "../components/user";
import Priority from "../components/priority";

const BaseURL = "https://api.quicksell.co/v1/internal/frontend-assignment";

const App = () => {
  // Retrieve initial values from localStorage, or default to 'Status' for grouping and 'Priority' for ordering
  const [grouping, setGrouping] = useState(
    localStorage.getItem("grouping") || "Status"
  );
  const [ordering, setOrdering] = useState(
    localStorage.getItem("ordering") || "Priority"
  );
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true); // Start loading before fetching data
    try {
      const response = await axios.get(BaseURL);
      setData(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Save the user's choice to localStorage whenever it changes
  const handleGroupingChange = (value) => {
    setGrouping(value);
    localStorage.setItem("grouping", value); // Save grouping choice to localStorage
  };

  const handleOrderingChange = (value) => {
    setOrdering(value);
    localStorage.setItem("ordering", value); // Save ordering choice to localStorage
  };

  // Custom Dropdown Content
  const dropdownContent = (
    <DropdownMenu
      grouping={grouping}
      ordering={ordering}
      onGroupingChange={handleGroupingChange}
      onOrderingChange={handleOrderingChange}
    />
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* Dropdown Positioned Above */}
      <Dropdown overlay={dropdownContent} trigger={["click"]}>
        <Button icon={<BarsOutlined />}>
          Display <DownOutlined />
        </Button>
      </Dropdown>

      {/* Section Below the Dropdown with Line */}
      <div
        style={{
          padding: "1px",
          borderBottom: "1px solid #f0f0f0",
          marginTop: "20px",
          marginLeft: "-20px",
          marginRight: "-20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#f4f4fc",
          }}
        >
          {/* Show loading spinner while fetching data */}
          {loading && (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <Spin size="large" /> {/* Ant Design loading spinner */}
            </div>
          )}
          {!loading && grouping === "Status" && <Status data={data} order={ordering} />}
          {!loading && grouping === "User" && <User data={data} order={ordering} />}
          {!loading && grouping === "Priority" && <Priority data={data} order={ordering} />}
        </div>
      </div>
    </div>
  );
};

export default App;
