import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/constants/api";

export const managerAPI = createApi({
  reducerPath: "managerAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL, credentials: "include" }),
  endpoints: (build) => ({
    signin: build.mutation({
      query: ({ username, password }) => ({
        url: `auth/token/login/`,
        method: "POST",
        body: {
          username,
          password,
        },
      }),
    }),
    signup: build.mutation({
      query: ({ username, password, email, logo, name }) => {
        const form_data = new FormData();
        form_data.append("logo", logo, logo.path);
        form_data.append("username", username);
        form_data.append("password", password);
        form_data.append("email", email);
        form_data.append("name", name);

        return {
          url: `auth/users/`,
          method: "POST",
          body: form_data,
        };
      },
    }),
    getMe: build.query({
      query: () => ({
        url: `auth/users/me/`,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    updateMe: build.mutation({
      query: ({ username, email, logo, name }) => {
        const form_data = new FormData();
        if (logo.path !== undefined) {
          form_data.append("logo", logo, logo?.path);
        }
        form_data.append("username", username);
        form_data.append("email", email);
        form_data.append("name", name);
        return {
          url: `auth/users/me/`,
          method: "PATCH",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: form_data,
        };
      },
    }),
    addTeam: build.mutation({
      query: ({ head_name, head_contact, description, name }) => {
        return {
          url: `departments/`,
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: {
            name,
            head_name,
            head_contact,
            description,
          },
        };
      },
    }),
    getTeams: build.query({
      query: () => {
        return {
          url: `departments/`,
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    getTeam: build.query({
      query: (teamId) => {
        return {
          url: `departments/${teamId}/`,
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    deleteTeam: build.mutation({
      query: (teamId) => {
        return {
          url: `departments/${teamId}/`,
          method: "DELETE",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    updateTeam: build.mutation({
      query: ({ teamId, name, head_name, head_contact, description }) => {
        return {
          url: `departments/${teamId}/`,
          method: "PATCH",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: {
            name,
            head_name,
            head_contact,
            description,
          },
        };
      },
    }),
    getWorkers: build.query({
      query: (teamId) => {
        return {
          url: `departments/${teamId}/get_employees/`,
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    getAllWorkers: build.query({
      query: () => {
        return {
          url: `employees/`,
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    getWorker: build.query({
      query: (workerId) => {
        return {
          url: `employees/${workerId}`,
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    addWorker: build.mutation({
      query: ({ workerInfo }) => {
        return {
          url: `employees/`,
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: workerInfo,
        };
      },
    }),
    updateWorker: build.mutation({
      query: ({ workerId, workerInfo }) => {
        return {
          url: `employees/${workerId}/`,
          method: "PATCH",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: workerInfo,
        };
      },
    }),
    deleteWorker: build.mutation({
      query: (workerId) => {
        return {
          url: `employees/${workerId}/`,
          method: "DELETE",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    addEmployeesByCSV: build.mutation({
      query: (csv_file) => {
        const csrfToken = document.cookie.match(/csrftoken=([^ ;]+)/)[1];
        const form_data = new FormData();
        form_data.append("csv_file", csv_file, csv_file?.path);

        return {
          url: `file_employees/`,
          method: "POST",
          body: form_data,
          headers: {
            "X-CSRFToken": csrfToken,
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    addMessagesByCSV: build.mutation({
      query: (csv_file) => {
        const csrfToken = document.cookie.match(/csrftoken=([^ ;]+)/)[1];
        const form_data = new FormData();
        form_data.append("csv_file", csv_file, csv_file?.path);

        return {
          url: `file_messages/`,
          method: "POST",
          body: form_data,
          headers: {
            "X-CSRFToken": csrfToken,
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    recalculateCompany: build.mutation({
      query: () => {
        return {
          url: `auth/users/recalculate/`,
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    recalculateTeam: build.mutation({
      query: (teamId) => {
        return {
          url: `departments/${teamId}/recalculate/`,
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    recalculateWorker: build.mutation({
      query: (workerId) => {
        return {
          url: `employees/${workerId}/recalculate/`,
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
  }),
});
export async function downloadEmployeesCSV() {
  const response = await fetch(`${API_URL}file_employees/`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
  if (response.status == 200) {
    const blob = await response.blob();
    const download_url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = download_url;
    link.download = "employees";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
export async function downloadMessagesCSV() {
  const response = await fetch(`${API_URL}file_messages/`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
  if (response.status == 200) {
    const blob = await response.blob();
    const download_url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = download_url;
    link.download = "messages";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

export const {
  useSigninMutation,
  useSignupMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useAddTeamMutation,
  useGetTeamsQuery,
  useDeleteTeamMutation,
  useGetTeamQuery,
  useUpdateTeamMutation,
  useAddWorkerMutation,
  useGetWorkersQuery,
  useDeleteWorkerMutation,
  useGetWorkerQuery,
  useUpdateWorkerMutation,
  useGetAllWorkersQuery,
  useRecalculateCompanyMutation,
  useRecalculateTeamMutation,
  useRecalculateWorkerMutation,
  useAddEmployeesByCSVMutation,
  useAddMessagesByCSVMutation,
} = managerAPI;

export const {
  signin,
  signup,
  getMe,
  updateMe,
  addTeam,
  getTeams,
  deleteTeam,
  updateTeam,
  deleteWorker,
  getTeam,
  getWorker,
  addWorker,
  addEmployeesByCSV,
  getWorkers,
  getAllWorkers,
  addMessagesByCSV,
  updateWorker,
  recalculateCompany,
  recalculateTeam,
  recalculateWorker,
} = managerAPI.endpoints;
