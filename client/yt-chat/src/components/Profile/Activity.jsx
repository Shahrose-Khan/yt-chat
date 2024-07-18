import React, { useEffect, useState, useRef } from "react";
import ActivityMap from "./ActivityMap";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./Activity.css";

function Activity() {
  const [data, setData] = useState([]);
  let totalTranslateX = 0;

  let endDate = new Date();
  endDate.setDate(endDate.getDate());
  let startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  startDate.setDate(startDate.getDate());
  endDate = endDate.toISOString().slice(0, 10);
  startDate = new Date(startDate.setFullYear(new Date().getFullYear() - 1))
    .toISOString()
    .slice(0, 10);

  const heatmapRef = useRef(null);

  useEffect(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);

    const randomData = [];
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      randomData.push({
        date: new Date(d).toISOString().slice(0, 10),
        count: Math.floor(Math.random() * 5),
      });
    }

    setData(randomData);
  }, []);

  useEffect(() => {
    if (heatmapRef.current) {
      const weekdayLabels = heatmapRef.current.querySelectorAll(
        ".react-calendar-heatmap-weekday-label"
      );
      weekdayLabels.forEach((label) => {
        const currentY = Number(label.getAttribute("y"));
        const currentX = Number(label.getAttribute("x"));
        const newY = currentY + 4;
        label.setAttribute("x", currentX.toString());
        label.setAttribute("y", newY.toString());
      });
      const monthLabels = heatmapRef.current.querySelectorAll(
        ".react-calendar-heatmap-month-label"
      );
      monthLabels.forEach((label, index) => {
        const currentY = Number(label.getAttribute("y"));
        const currentX = Number(label.getAttribute("x"));
        const newX = currentX + 42 + 21 * index;
        label.setAttribute("x", newX.toString());
        label.setAttribute("y", currentY.toString());
      });
    }
  }, []);

  return (
    <div>
      <h1>Activity</h1>
      <ActivityMap />
    </div>
  );
}

export default Activity;
