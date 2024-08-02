import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChatHistory } from "../features/message/messageSlice";
function History() {
  const history = useSelector((state) => state.history);

  const dispatch = useDispatch();
  const handleItemClick = (historyId) => {
    dispatch(fetchChatHistory(historyId));
  };

  const groupedHistory = history.history.reduce((acc, item) => {
    const timestamp = new Date(item.timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    let dateLabel;
    if (timestamp.toDateString() === today.toDateString()) {
      dateLabel = "Today";
    } else if (timestamp.toDateString() === yesterday.toDateString()) {
      dateLabel = "Yesterday";
    } else if (timestamp > lastWeek) {
      dateLabel = "Last Week";
    } else if (timestamp > lastMonth) {
      dateLabel = "Last Month";
    } else if (timestamp > thirtyDaysAgo) {
      dateLabel = "Before 30 Days";
    } else {
      // Default to formatted date
      dateLabel = timestamp.toLocaleDateString();
    }

    acc[dateLabel] = acc[dateLabel] || [];
    acc[dateLabel].push(item);
    return acc;
  }, {});

  // Sort items within each group in descending order of time
  for (const key in groupedHistory) {
    groupedHistory[key].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
  }

  return (
    <>
      <p className="section">
        <i className="fa fa-calendar"></i> History
      </p>
      <div className="history">
        {Object.entries(groupedHistory).map(([date, items]) => (
          <div key={date} className="sub-section">
            <p>{date}</p>
            <ul className="history-list">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href="#"
                    className={`menu-item ${
                      history.selectedHistory === item.id ? "selected" : ""
                    }`}
                    onClick={() => handleItemClick(item.id)}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default History;
