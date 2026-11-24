import api from "./api";

export const getNotebooks = (params) => {
    return api.get("/notebooks", { params });
};

export const createNotebook = (data) => {
    return api.post("/notebooks", data);
};

export const updateNotebook = (id, data) => {
    return api.patch(`/notebooks/${id}`, data);
};

export const updateLastVisited = (id) => {
    return api.patch(`/notebooks/${id}/visit`);
};

export const deleteNotebook = (id) => {
    return api.delete(`/notebooks/${id}`);
};