import { SuccResponseType } from "@/types/succResponseType";
import { request } from "@/utils/request";
import { CreateReportDto, ScoreReportDto } from "./index.type";

export function createReport(
  createReportDto: CreateReportDto
): Promise<SuccResponseType> {
  return request("/report", true, {
    body: JSON.stringify(createReportDto),
  });
}

export function scoreReport(
  scoreReportDto: ScoreReportDto
): Promise<SuccResponseType> {
  return request("/report", true, {
    method: "PATCH",
    body: JSON.stringify(scoreReportDto),
  });
}

export function deleteReport(id: number): Promise<SuccResponseType> {
  return request(`/report/${id}`, true, {
    method: "DELETE",
  });
}
