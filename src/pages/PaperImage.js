import React, { useEffect, useRef, useState } from 'react';

import './PaperImage.scss';

const useDragAndDrop = () => {
  const element = useRef();
  const [files, setFiles] = useState([]);

  const handleDrop = event => {
    event.preventDefault();

    const fileData = [];

    if (event.dataTransfer.items) {
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        if (event.dataTransfer.items[i].kind === 'file') {
          const file = event.dataTransfer.items[i].getAsFile();
          fileData.push({
            fileName: file.name,
            fileUrl: URL.createObjectURL(file)
          });
        }
      }
    } else {
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        const file = event.dataTransfer.files[i];
        fileData.push({
          fileName: file.name,
          fileUrl: URL.createObjectURL(file)
        });
      }
    }
    setFiles(...fileData);
    console.log(files);
  };

  const handleDragover = event => {
    event.preventDefault();
  };

  useEffect(() => {
    const target = element.current;
    if (target) {
      target.addEventListener('drop', handleDrop);
      target.addEventListener('dragover', handleDragover);
    }
    return () => {
      if (target) {
        target.removeEventListener('drop', handleDrop);
        target.removeEventListener('dragover', handleDragover);
      }
    };
  }, []);

  return [element, files];
};

const PaperImage = props => {
  const [boxElement, files] = useDragAndDrop();
  const {
    location: { state: dataTo, dataFrom, text }
  } = props;
  return (
    <div className="PaperImage">
      <h4 className="PaperImage__message">지우고 싶은 사진이 있나요?</h4>
      <div ref={boxElement} className="PaperImage__drop-box">
        drag & drop
      </div>
    </div>
  );
};

export default PaperImage;
