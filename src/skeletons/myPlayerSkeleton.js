import React from "react";
import ContentLoader from "react-content-loader";

const MyPlayerSkeleton = (props) => (
  <ContentLoader
    speed={2}
    // width={100}
    height={60}
    viewBox="0 0 400 160"
    backgroundColor="#282828"
    foregroundColor="#3F3F3F"
    {...props}
  >
    <rect x="0" y="26" rx="3" ry="3" width="400" height="100" />
    {/* <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> */}
    {/* <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
    <circle cx="20" cy="20" r="20" /> */}
  </ContentLoader>
);

export default MyPlayerSkeleton;
