import {useState} from 'react';
import uuid from 'uuid';
export default () => {
  const [currUuid, setUuid] = useState('');
  const _generateUUID = () => {
    setUuid(uuid.v4());
  };
  return [currUuid, _generateUUID];
};
