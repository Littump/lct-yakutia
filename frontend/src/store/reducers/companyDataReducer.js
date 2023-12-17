import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyInfo: {
    name: null,
    img: null,
    allWorkers: [],
  },
  currentImg: null,
  teams: [],
};

export const companyData = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateCompanyInfo: (state, action) => {
      state.companyInfo.name = action.payload.name;
      state.companyInfo.img = action.payload.img;
      state.companyInfo.email = action.payload.email;
      state.companyInfo.username = action.payload.username;
      state.currentImg = action.payload.img;
    },
    setCurrentImg: (state, action) => {
      state.currentImg = action.payload;
    },
    setAllWorkers: (state, action) => {
      state.companyInfo.allWorkers = action.payload;
    },
    deleteCurrentImg: (state) => {
      state.currentImg = null;
    },
    setTeams: (state, action) => {
      state.teams = [...action.payload.map((el) => ({ ...el, workers: [] }))];
    },
    updateTeamReducer: (state, action) => {
      const teamId = state.teams.findIndex(
        (el) => el.id === +action.payload.teamId
      );
      state.teams[teamId] = {
        ...state.teams[teamId],
        ...action.payload.teamUpdated,
      };
    },
    deleteTeamReducer: (state, action) => {
      state.teams = [...state.teams.filter((el) => el.id !== action.teamId)];
    },
    addWorkersReducer: (state, action) => {
      let id = state.teams.findIndex((el) => +el.id == +action.payload.teamId);
      if (id !== -1) {
        state.teams[id].workers = [...action.payload.workers];
      }
    },
    updateWorker: (state, action) => {
      const teamId = state.teams.findIndex(
        (el) => el.id === +action.payload.teamId
      );
      const workerId = state.teams[teamId].workers.findIndex(
        (el) => el.id === +action.payload.workerId
      );
      if (teamId == -1 || workerId == -1)
        alert("не удалось обновить информацию о работнике");
      state.teams[teamId].workers[workerId] = {
        ...state.teams[teamId].workers[workerId],
        ...action.payload.workerUpdated,
      };
    },
  },
});

export const {
  updateCompanyInfo,
  setTeams,
  updateTeamReducer,
  addWorkersReducer,
  setCurrentImg,
  deleteCurrentImg,
  updateWorker,
  setAllWorkers,
  deleteTeamReducer,
} = companyData.actions;

export const companyDataReducer = companyData.reducer;
