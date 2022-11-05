export const getSubjectsList = state => {
  const selectedGrade = state.app?.gradeSelected;
  return state.app?.courseCategories?.filter(
    value =>
      value.slug.indexOf('_sub') > -1 &&
      value.slug.indexOf(`_${selectedGrade}`) > -1,
  );
};

export const getCourses = state => state.app.courses;

export const getCourseDetails = state => state.app.currentCourse;

export const getCourseLessons = state => state.app.lessons;

export const getLessonDetails = state =>
  state.app.currentLesson;

export const getSelectedSubjected = state => state.app.subjectSelected;
export const getProfile = state => state.app.myProfile;
export const getIsLoading = state => state.app.isLoading;
