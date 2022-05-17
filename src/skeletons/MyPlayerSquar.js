import React from "react";
import ContentLoader from "react-content-loader";

const MyPlayerSquarSkeleton = (props) => (
  <ContentLoader
    speed={2}
    // width={1000}
    height={160}
    viewBox="0 0 2100 200"
    backgroundColor="#282828"
    foregroundColor="#3F3F3F"
    {...props}
  >
    <rect x="5" y="56" rx="3" ry="3" width="2100" height="90" />
  </ContentLoader>
);

export default MyPlayerSquarSkeleton;
