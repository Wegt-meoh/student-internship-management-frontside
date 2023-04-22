import { deletePost } from "@/api/post/delete";
import { SearchPostResponseType } from "@/types/post/seach-post.dto";
import { Table, Space, Button, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

export default function PostTable({
  postList,
  tableFilters,
  fetchTableData,
}: {
  postList: SearchPostResponseType | null;
  tableFilters: {
    name: { text: string; value: string }[];
    company: { text: string; value: string }[];
    position: { text: string; value: string }[];
    teacherName: { text: string; value: string }[];
  };
  fetchTableData: () => void;
}) {
  const [tableDisabled, setTableDisabled] = useState(false);

  useEffect(() => {
    fetchTableData();
  }, []);

  const columns: ColumnsType<SearchPostResponseType[number]> = [
    {
      title: "岗位名称",
      dataIndex: "name",
      key: "name",
      filters: tableFilters.name,
      filterSearch: true,
      onFilter: (value, record) => {
        if (typeof value !== "string") return false;
        return record.name.includes(value);
      },
    },
    {
      title: "岗位地点",
      dataIndex: "position",
      key: "position",
      filters: tableFilters.position,
      filterSearch: true,
      onFilter: (value, record) => {
        if (typeof value !== "string") return false;
        return record.position.includes(value);
      },
    },
    {
      title: "所属公司",
      dataIndex: "company",
      key: "company",
      filters: tableFilters.company,
      filterSearch: true,
      onFilter: (value, record) => {
        if (typeof value !== "string") return false;
        return record.company.includes(value);
      },
    },
    {
      title: "联系电话",
      dataIndex: ["user", "phone"],
      key: "phone",
    },
    {
      title: "负责教师",
      dataIndex: ["user", "name"],
      key: "user",
      filters: tableFilters.teacherName,
      filterSearch: true,
      onFilter: (value, record) => {
        if (typeof value !== "string") return false;
        return record.user.name.includes(value);
      },
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => {
        return (
          <Space>
            <Button
              disabled={tableDisabled}
              onClick={() => {
                if (!confirm("确认删除此岗位？")) return;
                message.loading("正在删除岗位");
                setTableDisabled(true);
                deletePost(record.id)
                  .then(() => {
                    message.destroy();
                    message.success("岗位删除成功", 2);
                    fetchTableData();
                  })
                  .finally(() => {
                    setTableDisabled(false);
                  });
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      rowKey={"id"}
      loading={postList === null}
      dataSource={postList ?? []}
      columns={columns}
    />
  );
}
