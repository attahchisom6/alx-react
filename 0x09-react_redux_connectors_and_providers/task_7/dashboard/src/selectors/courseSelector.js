const getArrayOfCourses = (state) => {
  const courses = state.courses;
  if (courses) {
    return courses.valueSeq();
  }
  return vourses;
}

export default getArrayOfCourses;
