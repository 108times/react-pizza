import React from "react";
import ContentLoader from "react-content-loader";

const LoadingBlock = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="130" cy="130" r="130" />
    <rect x="2" y="273" rx="5" ry="5" width="260" height="28" />
    <rect x="0" y="314" rx="6" ry="6" width="264" height="74" />
    <rect x="153" y="355" rx="0" ry="0" width="0" height="16" />
    <rect x="1" y="403" rx="5" ry="5" width="79" height="26" />
    <rect x="115" y="403" rx="19" ry="19" width="144" height="49" />
  </ContentLoader>
);

export default LoadingBlock;
