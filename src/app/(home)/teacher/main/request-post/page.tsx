"use client";

import { findAllRequestPostUnderTheTeacher } from "@/api/requestPost";
import { FindAllRequestPostUnderTheTeacherResponseVo } from "@/api/requestPost/index.type";
import { Button, List, Space } from "antd";
import { useEffect, useState } from "react";

export default function Page() {
  const [listData, setListData] =
    useState<FindAllRequestPostUnderTheTeacherResponseVo>([]);

  const [listLoading, setListLoading] = useState(true);

  async function fetchTableData() {
    setListLoading(true);
    const data = await findAllRequestPostUnderTheTeacher();
    setListData(data);
    setListLoading(false);
  }

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <div>
      <List
        dataSource={listData}
        loading={listLoading}
        renderItem={(item, index) => {
          return (
            <List.Item actions={[<Button>check</Button>]}>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.requestUser.name}</a>}
                description={item.requestUser.class}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
}
