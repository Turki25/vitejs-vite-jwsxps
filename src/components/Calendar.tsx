import React from 'react';
import {
  startOfMonth,
  startOfWeek,
  format,
  addDays,
  isSameMonth,
} from 'date-fns';
import './Calendar.css';

export interface Course {
  course: string;
  examDate: Date;
}

interface CalendarProps {
  currentMonth: Date;
  courses: Course[];
}

const Calendar: React.FC<CalendarProps> = ({ currentMonth, courses }) => {
  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon">chevron_left</div>
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end">
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = 'eee';
    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    for (let week = 0; week < 4; week++) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);

        const dayCourses = courses.filter(
          (course) =>
            format(course.examDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
        );

        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart) ? 'disabled' : ''
            }`}
            key={day.toString()}
          >
            <div className="day-number">{formattedDate}</div>
            <div className="courses">
              {dayCourses.map((course, index) => (
                <div key={index} className="course">
                  {course.course}
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body">{rows}</div>;
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
