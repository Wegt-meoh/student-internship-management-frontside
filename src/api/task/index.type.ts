export type TaskResponseVo = {
  id: number;
  title: string;
  description: string;
  attachmentUrl: string;
  createDate: string;
};

export type CreateTaskDto = {
  title: string;
  description: string;
  postId: number;
  attachmentUrl: string;
};
