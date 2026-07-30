import api from "./api";

export const ReportProfileService = {
  create: async (data: {
    reported_user_id: number;
    reason: string;
    description?: string;
  }) => {
    const res = await api.post("/report-profiles", data);
    return res.data;
  },
  status: async (reportedUserId: number) => {
    const res = await api.get(`/report-profiles/status/${reportedUserId}`);
    return res.data;
  },
  getSubmittedReports: async () => {
    const res = await api.get("/report-profiles/my-reports");
    return res.data;
  },
  getReceivedReports: async () => {
    const res = await api.get("/report-profiles/received-reports");
    return res.data;
  },
};
