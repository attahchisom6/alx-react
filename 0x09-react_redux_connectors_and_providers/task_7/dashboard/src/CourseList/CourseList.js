import React, { useEffect } from "react";
import CourseListRow from './CourseListRow';
import PropTypes from 'prop-types';
import { css, StyleSheet } from "aphrodite";
import {
  unSelectCourse,
  selectCourse,
  fetchCourses,
  setCourses,
} from "../actions/courseActionCreators";
import getArrayOfCourses from "../selectors/courseSelector";

const CourseList = ({ listCourses, selectCourse, unSelectCourse, fetchCourses }) => {
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const onChangeRow = (id, checked) => {
    if (checked) {
      selectCourse(id);
    } else {
      unSelectCourse(id);
    }
  };

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
                id={ course.id }
                textFirstCell={ course.name }
                textSecondCell={ course.credit }
                isHeader={ false },
                isChecked={ course.isSelected }
                onChangeRow={ onChangeRow }
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
    margin: "40px auto 0  auto",
    border: "3px solid #DDD",
    borderCollapse: "collapse",
    borderBottom: "1.0em solid #DDD",
  },

});

CourseList.propTypes = {
  listCourses: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
  selectCourse: PropTypes.func,
  unSelectCourse: PropTypes.func,
  fetchCourses: PropTypes.func,
}

CourseList.defaultProps = {
  listCourses: [],
  selectCourse: () => {},
  unSelectCourse: () => {},
  fetchCourses: () => {},
}

const mapStateToProps = (state) => {
  return {
    listCourses: getArrayOfCourses(state);
  };

  const mapDispatchToProps = {
    selectCourse,
    unSelectCourse,
    fetchCourses,
  }
}

export default CourseList;
