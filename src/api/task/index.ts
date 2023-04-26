import { SuccResponseType } from "@/types/succResponseType";
import { request } from "@/utils/request";
import { ReportResponseVo, ReportWithSubmitUser } from "../report/index.type";
import { CreateTaskDto, TaskResponseVo } from "./index.type";

export function createTask(
  createTaskDto: CreateTaskDto
): Promise<SuccResponseType> {
  return request("/tasks", true, {
    body: JSON.stringify(createTaskDto),
  });
}

export function findAllReportUnderTheTask(
  id: number
): Promise<ReportWithSubmitUser[]> {
  return request(`/tasks/find/all/report/${id}`, true, {
    method: "GET",
  });
}

export function deleteTask(id: number): Promise<SuccResponseType> {
  return request(`/tasks/${id}`, true, {
    method: "DELETE",
  });
}

export function findOneTaskById(id: number): Promise<TaskResponseVo> {
  return request(`/tasks/${id}`, true, {
    method: "GET",
  });
}

export function findUserReportUnderTheTask(
  id: number
): Promise<ReportResponseVo> {
  return request(`/tasks/find/report/by/user/${id}`, true, {
    method: "GET",
  });
}
