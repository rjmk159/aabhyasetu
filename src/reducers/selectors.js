export const getSubjectsList = (state) => {
  let selectedGrade = state.app?.gradeSelected;
  console.log(
    "🚀 ~ file: selectors.js ~ line 3 ~ getSubjectsList ~ selectedGrade",
    selectedGrade
  );
  return state.app?.subjects?.filter(
    (value) => value.name.includes(`-${selectedGrade}`) && value
  );
};

export const getCourses = (state) => state.app.courses;

export const getCourseDetails = (state) => state.app.currentCourse;

export const getCourseLessons = (state) => state.app.lessons;

export const getLessonDetails = (state) => state.app.currentLesson;

export const getSelectedSubjected = (state) => state.app.subjectSelected;
export const getProfile = (state) => state.app.myProfile;
export const getIsLoading = (state) => state.app.isLoading;
