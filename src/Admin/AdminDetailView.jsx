import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/admin.css';

const AdminDetailView = () => {
  const { type, uid } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/${type}/${uid}`)
      .then(res => res.json())
      .then(setData);
  }, [type, uid]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="admin-detail">
      <h2>{type.toUpperCase()} Details</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      {data.beforeImage && (
        <div>
          <h4>Before Image:</h4>
          <img src={data.beforeImage} alt="Before" className="detail-img" />
        </div>
      )}
      {data.afterImage && (
        <div>
          <h4>After Image:</h4>
          <img src={data.afterImage} alt="After" className="detail-img" />
        </div>
      )}
    </div>
  );
};

export default AdminDetailView;
