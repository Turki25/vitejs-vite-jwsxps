import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import { addMonths, subMonths } from 'date-fns';
import './App.css';
import { fetchCourses, Course } from './services/courseService';

const App: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courses = await fetchCourses();
        setCourses(courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchData();
  }, []);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="App">
      <div className="calendar-container">
        <Calendar currentMonth={currentMonth} courses={courses} />
      </div>
      <div className="navigation-buttons">
        <button onClick={prevMonth}>Previous</button>
        <button onClick={nextMonth}>Next</button>
      </div>
    </div>
  );
};

export default App;
