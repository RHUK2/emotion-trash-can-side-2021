import React from 'react';

import './ImageBox.scss';

const ImageBox = props => {
  const { files } = props;
  return (
    <div className="imagebox">
      {files.map((file, index) => {
        return (
          <img
            className="imagebox__image"
            key={index}
            src={file.fileUrl}
            alt={file.fileName}
            title={file.fileName}
          />
        );
      })}
    </div>
  );
};

export default ImageBox;
