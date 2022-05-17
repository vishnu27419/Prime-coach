import React, { memo } from "react";
import imagePlaceholder from "Custom/images/image-placeholder.png";
const Image = memo(({ image, className, style }) => (
  <div>
    <img
      src={image}
      className={className}
      alt="No_Image_Available"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = imagePlaceholder;
      }}
      style={style}
    />
  </div>
));

export default Image;
