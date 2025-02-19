import React from "react";
import Skeleton from "@mui/material/Skeleton";

const StatsSkeleton: React.FC = () => (
  <>
    <Skeleton variant="rectangular" width={500} height={80} />
    <Skeleton variant="rectangular" width={500} height={80} />
    <Skeleton variant="rectangular" width={500} height={80} />
  </>
);

export default StatsSkeleton;