import { useState } from 'react';
import { UPLOAD_MODE } from '../configs';
import { getLocalDBInstance } from '../Database';
import { formatDateFull } from '../utils';

const db = getLocalDBInstance();

const Config = () => {
  const [file, setFile] = useState('');
  const [uploadMode, setUploadMode] = useState(UPLOAD_MODE.REPLACE);

  const downloadData = () => {
    const data = db.exportData();
    const url = URL.createObjectURL(data);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `json-paisa-${formatDateFull()}`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(url);
  };

  const uploadData = () => {
    if (!file) {
      return;
    }

    if (file.type !== 'application/json') {
      alert('File should be a JSON file');
      return;
    }

    if (file.size > 1024 * 1024) {
      alert('File size should be less than 1MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        db.importData(data);

        alert('Data imported successfully');
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="config">
      <div className="row row-col">
        <div className="row">
          <h3>Upload Data</h3>
        </div>
        <div className="row">
          <input onChange={(e) => setFile(e.target.files[0])} type="file" />
        </div>
        <div className="row">
          <select
            value={uploadMode}
            onChange={(e) => setUploadMode(e.target.value)}
          >
            <option value={UPLOAD_MODE.REPLACE}>replace</option>
            <option value={UPLOAD_MODE.UPDATE}>update</option>
          </select>
        </div>
        <div className="row">
          <button onClick={uploadData}>upload</button>
        </div>
      </div>
      <div className="row row-v-center">
        <h3>Download Data</h3>
        <button onClick={downloadData} className="right">
          download
        </button>
      </div>
    </div>
  );
};

export default Config;
