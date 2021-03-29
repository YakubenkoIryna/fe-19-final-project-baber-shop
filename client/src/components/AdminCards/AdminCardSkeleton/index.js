import React from "react";
import { Skeleton } from "antd";

import "./styles.less";

const AdminCardSkeleton = () => {
  return (
    <div className={'admin-card-skeleton'}>
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </div>
  );
};

export default AdminCardSkeleton;
