export const getSubjectsList = (state) => {
  let selectedGrade = state.app?.gradeSelected;
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
export const getSelectedGrade = (state) => state.app.gradeSelected;
export const getSelectedLanguage = (state) => state.app.languageSelected;
