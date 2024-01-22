import { createSlice } from "@reduxjs/toolkit";
import {
  getLessonsById,
  getCoursesCategories,
  getCoursesListBasedOnSub,
} from "../utils/api";
import { getCourses, getCoursesList, getProfileAuth, getSelectedSubject, getSelectedSubjected } from "./selectors";

export const initialState = {
  subject: {
    list: [],
    selected: null,
  },
  course: {
    list: [],
    selected: null,
    page: 1,
  },
  lesson: {
    list: [],
    selected: null,
    page: 1,
  },
  profile: {
    details: {
    },
    auth: {
      token: null,
      lastLogin: null
    },
    settings: {
      language: 'english',
      class: '11'
    }
  },
  media: [],
};
const { actions, reducer } = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    /* Main Listing */
    setSubjects: (state, { payload }) => {
      state.subject.list = payload;

      // state.course.list = [];
      state.lesson.list = [];
      state.course.page = 1;
      state.lesson.page = 1;
    },
    setCourses: (state, { payload }) => {
      state.course.list = payload;

      state.lesson.list = [];
      state.lesson.page = 1;
    },
    setLesson: (state, { payload }) => {
      state.lesson.list = payload;
    },

    /* currently Selected */
    setSelectedSubject: (state, { payload }) => {
      state.subject.selected = payload;
      state.course.list = []; // TO DO
      state.lesson.list = [];
      state.lesson.page = 1;
      state.course.page = 1;
    },
    setSelectedCourse: (state, { payload }) => {
      state.course.selected = payload;
      state.lesson.page = 1;
    },
    setSelectedLesson: (state, { payload }) => {
      state.lesson.selected = payload;
    },

    /* Pagination */
    setCoursePage: (state, { payload }) => {
      state.course.page = payload;
    },

    /* Profile */
    setMyProfile: (state, { payload }) => {
      state.profile.details = { name: payload.user_display_name, id: payload.user_id, email: payload.user_email, firstName: payload.firstname, lastName: payload.lastname };
      state.profile.auth = { token: payload.token, lastLogin: Date.now() };
      // state.profile.settings = { class: payload.class_ || '11', language: payload.language || 'english' }
      state.profile.settings = { class: payload.class_, language: payload.language }
    },
    setProfileDetails: (state, { payload }) => {
      state.profile.details = { ...state.profile.details, ...payload };
    },
    setGrade: (state, { payload }) => {
      state.profile.settings.class = payload;
    },
    setLanguage: (state, { payload }) => {
      state.profile.settings.language = payload;
    },

    /* App */
    doLogout: (state) => {
      state.profile = initialState.profile,
        state.subject = initialState.subject,
        state.course = initialState.subject,
        state.lesson = initialState.lesson
    },

    /* Others */
    setInstructors: (state, { payload }) => {
      state.instructors = payload;
    },
    setMedia: (state, { payload }) => {
      state.media = payload;
    },

  },
});
export const {
  setSubjects,
  setCourses,
  setLesson,


  setSelectedSubject,
  setSelectedCourse,
  setSelectedLesson,

  setCoursePage,

  setMyProfile,
  setProfileDetails,
  setGrade,
  setLanguage,
  doLogout,

  setInstructors,
  setMedia



} = actions;

export default reducer;

export const fetchSubjects = () => async (dispatch) => {
  try {
    const res = await getCoursesCategories();
    dispatch(setSubjects(res.data));
    return true;
  } catch (error) {
    return true;
  }
};
export const fetchCoursesList = (page = 1) => async (dispatch, getState) => {
  try {
    const state = getState();
    const selectedSubjected = getSelectedSubject(state);
    const currentCourse = getCoursesList(state);
    if (page > Math.ceil(selectedSubjected.count / 10)) {
      return false;
    }

    dispatch(setCoursePage(page + 1));
    const res = await getCoursesListBasedOnSub(selectedSubjected.id, page);
    if (page === 1) {
      dispatch(setCourses(res));
    } else {
      dispatch(setCourses([...currentCourse, ...res]));
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const fetchLessonsBasedOnCurrentCourse =
  (courseId) => async (dispatch, getState) => {
    try {
      const state = getState();
      const profileAuth = getProfileAuth(state)
      const res = await getLessonsById(courseId, profileAuth.token);
      dispatch(setLesson(res));
      return true;
    } catch (error) {
      return true;
    }
  };
