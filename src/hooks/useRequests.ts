import { IRequest, TNewReqCredentials } from "../interfaces/Request";
import { api } from "../services/api";

export const useRequests = () => {
  async function fetchUserRequests(): Promise<IRequest[]> {
    try {
      const res = await api.get("/user/requests");

      return res.data.payload;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function fetchAllRequests(): Promise<IRequest[]> {
    try {
      const res = await api.get("/requests/all");

      return res.data.payload;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function newReq(credentials: TNewReqCredentials) {
    try {
      const newCredentials = {
        exitID: Number(credentials.exitID),
        collectorPhone: credentials.collectorPhone,
        collectForecast: credentials.collectForecast
          .toISOString()
          .split("T")[0],
        desc: credentials.desc,
      };

      const res = await api.post("/requests/new", newCredentials);
      return res.data;
    } catch (error: any) {
      throw error.response.data.errors;
    }
  }

  async function requestCancelReq({
    id,
    reason,
  }: {
    id: string;
    reason: string;
  }) {
    try {
      const res = await api.put(`/requests/requestCancel/${id}`, reason);
      return res.data;
    } catch (error: any) {
      throw error.response.data.errors;
    }
  }
  async function cancelReq(id: string) {
    try {
      const res = await api.put(`/requests/cancel/${id}`);
      return res.data;
    } catch (error: any) {
      throw error.response.data.errors;
    }
  }
  async function deleteReq(id: string) {
    try {
      const res = await api.delete(`/requests/${id}`);
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }

  return {
    fetchUserRequests,
    fetchAllRequests,
    newReq,
    requestCancelReq,
    cancelReq,
    deleteReq,
  };
};
