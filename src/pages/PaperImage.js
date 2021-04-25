import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import './PaperImage.scss';

const useDragAndDrop = () => {
  const dragdropElement = useRef();
  const inputFileElement = useRef();
  const [files, setFiles] = useState([]);

  const handleDrop = event => {
    event.preventDefault();
    const saveFiles = [];
    if (event.dataTransfer.items) {
      if (event.dataTransfer.items.length > 3) {
        // eslint-disable-next-line no-alert
        alert('이미지 파일 첨부는 최대 3장까지 가능합니다.');
        return -1;
      }
      Array.prototype.forEach.call(event.dataTransfer.items, item => {
        if (item.type.split('/')[0] !== 'image') {
          // eslint-disable-next-line no-alert
          alert('이미지 파일만 가능합니다.');
          return -1;
        }
        const file = item.getAsFile();
        saveFiles.push({
          fileName: file.name,
          fileUrl: URL.createObjectURL(file)
        });
      });
    } else {
      if (event.dataTransfer.files.length > 3) {
        // eslint-disable-next-line no-alert
        alert('이미지 파일 첨부는 최대 3장까지 가능합니다.');
        return -1;
      }
      Array.prototype.forEach.call(event.dataTransfer.files, file => {
        if (file.type.split('/')[0] === 'image') {
          // eslint-disable-next-line no-alert
          alert('이미지 파일만 가능합니다.');
          return -1;
        }
        saveFiles.push({
          fileName: file.name,
          fileUrl: URL.createObjectURL(file)
        });
      });
    }
    setFiles(saveFiles);
  };

  const handleDragover = event => {
    event.preventDefault();
  };

  useEffect(() => {
    const target = dragdropElement.current;
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

  const handleChange = event => {
    const saveFiles = [];
    if (!event.target.files) return -1;
    if (event.target.files.length > 3) {
      // eslint-disable-next-line no-alert
      alert('이미지 파일 첨부는 최대 3장까지 가능합니다.');
      return -1;
    }
    Array.prototype.forEach.call(event.target.files, file => {
      saveFiles.push({
        fileName: file.name,
        fileUrl: URL.createObjectURL(file)
      });
    });
    setFiles(saveFiles);
  };

  useEffect(() => {
    const target = inputFileElement.current;
    if (target) {
      target.addEventListener('change', handleChange);
    }
    return () => {
      if (target) {
        target.removeEventListener('change', handleChange);
      }
    };
  }, []);

  return { dragdropElement, inputFileElement, files };
};

const PaperImage = props => {
  const { dragdropElement, inputFileElement, files } = useDragAndDrop();
  const [state] = useState(props.location.state);
  if (!state) {
    // eslint-disable-next-line no-alert
    alert('홈으로 이동합니다.');
    props.history.push('/');
    return -1;
  }
  if (state.dataTo === '' || state.dataFrom === '' || state.text === '') {
    // eslint-disable-next-line no-alert
    alert('3가지 항목 모두 작성해주세요.');
    props.history.push('/1');
    return -1;
  }
  return (
    <div className="paperimage">
      <h4 className="paperimage__message">지우고 싶은 사진이 있나요?</h4>
      <div className="wrapper">
        <label htmlFor="input-type" ref={dragdropElement} className="dropbox">
          <input
            ref={inputFileElement}
            id="input-type"
            type="file"
            accept="image/*"
            multiple
          ></input>
          {files.length !== 0 ? (
            <div className="dropbox__images">
              {files.map((file, index) => (
                <img key={index} title={file.fileName} src={file.fileUrl} alt={file.fileName} />
              ))}
            </div>
          ) : (
            <p>
              이미지 파일을 넣어주세요.<br></br>(드래그드롭 or 클릭)<br></br>(최대 3장)<br></br>
              (필수 아님)
            </p>
          )}
        </label>
        <div className="move-button">
          <Link to="/1">
            <button className="move-button__previous">prev</button>
          </Link>
          <Link
            to={{
              pathname: '/3',
              state: {
                ...state,
                files
              }
            }}
          >
            <button className="move-button__next">next</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaperImage;
