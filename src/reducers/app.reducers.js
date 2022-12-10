import { createSlice } from "@reduxjs/toolkit";
import {
  getLessonsById,
  getCoursesCategories,
  getCoursesListBasedOnSub,
} from "../utils/api";
import { getSelectedSubjected } from "./selectors";

export const initialState = {
  courses: [],
  lessons: [],
  subjects: [],

  instructors: [],
  myProfile: {},

  languageSelected: "english",
  gradeSelected: "11",
  subjectSelected: -1,
  currentCourse: -1,
  currentLesson: -1,

  media: [],
  isLoading: false,
};
const { actions, reducer } = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setSubjects: (state, { payload }) => {
      state.subjects = payload;
    },
    setCourses: (state, { payload }) => {
      state.courses = payload;
    },
    setLesson: (state, { payload }) => {
      state.lessons = payload;
    },
    // *************

    setSelectedSubject: (state, { payload }) => {
      state.subjectSelected = payload;
    },
    setCurrentCourse: (state, { payload }) => {
      state.currentCourse = payload;
    },
    setCurrentLesson: (state, { payload }) => {
      state.currentLesson = payload;
    },
    setGrade: (state, { payload }) => {
      state.gradeSelected = payload;
    },
    setLanguage: (state, { payload }) => {
      state.languageSelected = payload;
    },

    // *************
    setInstructors: (state, { payload }) => {
      state.instructors = payload;
    },
    setMedia: (state, { payload }) => {
      state.media = payload;
    },
    setMyProfile: (state, { payload }) => {
      state.myProfile = payload;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});
export const {
  setCourses,
  setLesson,
  setSubjects,

  setInstructors,
  setMyProfile,

  setGrade,
  setLanguage,
  setCurrentCourse,
  setCurrentLesson,
  setSelectedSubject,

  setMedia,
  setIsLoading,
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
export const fetchCoursesList = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const subId = getSelectedSubjected(state);
    dispatch(setIsLoading(true));
    const res = await getCoursesListBasedOnSub(subId);
    dispatch(setCourses(res));
    dispatch(setIsLoading(false));
    return true;
  } catch (error) {
    return true;
  }
};

export const fetchLessonsBasedOnCurrentCourse =
  (courseId) => async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const res = await getLessonsById(courseId);
      dispatch(setLesson(res));
      dispatch(setIsLoading(false));
      return true;
    } catch (error) {
      return true;
    }
  };
