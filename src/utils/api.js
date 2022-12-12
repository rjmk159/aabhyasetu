import axios from "axios";
import { checkAUTH } from "../utils/helper";

// export const BASE_URL = 'https://kitchenitems.click/learning';
export const BASE_URL = "https://abhyasetu.in";

const getAuthorization = async () => {
  const LOGIN_TOKEN = await checkAUTH();
  if (LOGIN_TOKEN) {
    return {
      headers: { Authorization: `Bearer ${LOGIN_TOKEN}` },
    };
  }
};

export const BASE_URL_JSON = `${BASE_URL}/wp-json/wp/v2`;
export const BASE_URL_AUTH = `${BASE_URL}/wp-json/jwt-auth/v1/token`;

export const loginApp = (dataToSend) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BASE_URL_AUTH, dataToSend)
      .then((response) => {
        console.log(response.data)
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error)
        reject(error);
      });
  });
};
export const validateToken = (JWT) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL_JSON}/users/me`, {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
        error;
      });
  });
};

export const registerUser = ({
  email,
  password,
  firstName,
  lastName,
  username,
}) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/wp-json/register/subscriber`, {
        email,
        password,
        username,
        firstname: firstName,
        lastname: lastName,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateUserMeta = ({ standard, language, ID }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/wp-json/update_user/config`, {
        class: standard,
        language,
        ID,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getCoursesListBasedOnSub = (subId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL_JSON}/sfwd-courses?categories=${subId}&per_page=100`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getCoursesCategories = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL_JSON}/categories?per_page=100`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getLessonsById = async (id) => {
  const config = await getAuthorization();
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/wp-json/ldlms/v2/sfwd-lessons/?course=${id}`, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const submitFeedback = (data) => {
  return new Promise((resolve, reject) => {
    let formdata = new FormData();

    formdata.append("your-name", data.name);
    formdata.append("your-email", data.email);
    formdata.append("your-subject", data.subject);
    formdata.append("your-message", data.feedback);
    axios
      .post(
        `${BASE_URL}/wp-json/contact-form-7/v1/contact-forms/27738/feedback`,
        JSON.stringify(formdata)
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const editProfileHandler = (data) => {
  console.log("data", data);
  return new Promise((resolve, reject) => {
    let formdata = new FormData();

    formdata.append("name", data.name);
    formdata.append("email", data.email);
    // formdata.append("description", data.description);
    axios
      .post(
        `${BASE_URL}/wp-json/wp/v2/users/${data?.id}`,
        JSON.stringify(formdata)
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
