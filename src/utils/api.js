import axios from "axios";

// export const BASE_URL = 'https://kitchenitems.click/learning';
export const BASE_URL = "https://abhyasetu.in";



export const BASE_URL_JSON = `${BASE_URL}/wp-json/wp/v2`;
export const BASE_URL_AUTH = `${BASE_URL}/wp-json/jwt-auth/v1/token`;

export const loginApp = (dataToSend) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BASE_URL_AUTH, dataToSend)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const validateToken = (JWT) => {

  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL_AUTH}/validate`, {}, {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
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

export const updateUserMeta = (data, jwt) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/wp-json/update/metadata`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getCoursesListBasedOnSub = (subId, page) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL_JSON}/sfwd-courses?categories=${subId}&page=${page}&orderby=date`)
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
export const getLessonsById = async (id, jwt) => {

  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/wp-json/ldlms/v2/sfwd-lessons/?course=${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const submitFeedback = (data, jwt) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },

    };
    axios
      .post(
        `${BASE_URL}/wp-json/add/feedback`, { ...data },
        config
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const editProfileHandler = (data, jwt) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${BASE_URL}/wp-json/update/subscriber`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteProfileHandler = (data, jwt) => {
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data: { ...data }
  };
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASE_URL}/wp-json/delete/subscriber`, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
