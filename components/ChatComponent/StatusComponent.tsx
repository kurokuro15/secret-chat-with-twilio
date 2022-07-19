import { useEffect, useState } from 'react';
import Circle from '../icons/Circle';

export default function StatusComponent({ status, participantIdentities: participants }: iStatus) {
  const handlerStatus: iHandlerStatus = {
    active: 'active bg-green-500 border-green-400',
    inactive: 'bg-yellow-500 border-yellow-400',
    closed: 'bg-red-500 border-red-400'
  };
  const className = handlerStatus[status];

  const [identities, setIdentities] = useState<string | number>('');

  useEffect(() => {
    const listFormatter = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });
    const string = participants.length > 3 ? participants.length : listFormatter.format(participants);
    setIdentities(string);
  }, [participants]);

  return (
    <div className="flex flex-row justify-left items-center align-middle gap-2">
      <Circle className={className} />
      <div className="font-mono"> {identities}</div>
    </div>
  );
}

export interface iHandlerStatus {
  active: string;
  inactive: string;
  closed: string;
}
interface iStatus {
  status: keyof iHandlerStatus;
  participantIdentities: Array<string>;
}
