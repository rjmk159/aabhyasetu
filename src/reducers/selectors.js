export const getSubjectList = (state) => {
  let grade = state.app?.profile.settings.class;
  return state.app?.subject.list?.filter(
    (value) => value?.name?.includes(`-${grade}`)
  );
};
export const getSelectedSubject = (state) => state.app.subject.selected;

export const getCoursesList = (state) => state.app.course.list;
export const getSelectedCourse = (state) => state.app.course.selected;
export const getCoursePage = (state) => state.app.course.page;

export const getCourseLessons = (state) => state.app.lesson.list;
export const getSelectedLession = (state) => state.app.lesson.selected;


export const getProfileDetails = (state) => state.app.profile.details;
export const getProfileAuth = (state) => state.app.profile.auth;
export const getProfileSettings = (state) => state.app.profile.settings;


