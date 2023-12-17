import React from 'react';
import CourseListRow from './CourseListRow';
import CourseShape from './CourseShape';
import PropTypes from 'prop-types';
import { css, StyleSheet } from "aphrodite";

const CourseList = ({ listCourses }) => {
  return (
    <table className={ css(styles.Table) }>
      <thead>
        <CourseListRow textFirstCell="Available courses" isHeader={ true } />
        <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={ true } />
      </thead>
      <tbody>
        {
          listCourses && listCourses.length > 0 ? (
            listCourses.map((course) => ( 
              <CourseListRow
                key={ course.id }
                textFirstCell={ course.name }
                textSecondCell={ course.credit }
                isHeader={ false }
              />
            ))
          ) : (
            <CourseListRow textFirstCell='No course available yet' isHeader={ false } />
          )
        }
      </tbody>
    </table>
  );
}

const styles = StyleSheet.create({
  Table: {
    width: "90vw",
    margin: "0 5vw",
    border: "3px solid #DDD",
    borderBottom: "1.0em solid #DDD",
  },

});

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(CourseShape),
}

CourseList.defaultProps = {
  listCourses: [],
}

export default CourseList;
