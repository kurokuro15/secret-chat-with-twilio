import { useEffect, useState } from 'react';
import Circle from './icons/Circle';

export default function StatusComponent({ status, participants }: iStatus) {
  console.log('participants', participants);
  const handlerStatus: { active: string; inactive: string; closed: string; default: string } = {
    active: 'active bg-green-500 border-green-400',
    inactive: 'bg-yellow-500 border-yellow-400',
    closed: 'bg-red-500 border-red-400',
    default: ''
  };
  const [member, setMember] = useState<string | number>('');
  const className = status ? handlerStatus[status] : handlerStatus.default;
  useEffect(() => {
    const formatter = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });

    const handlerMembers = (array: Array<string | null>) => {
      return array.length > 3 ? array.length : formatter.format(array);
    };

    setMember(handlerMembers(participants));
  }, [participants]);

  return (
    <div className="flex flex-row justify-left items-center align-middle gap-2">
      <Circle className={className} />
      <div className="font-mono"> {member}</div>
    </div>
  );
}

interface handlerStatus {
  active: string;
  inactive: string;
  closed: string;
  default: string;
}
interface iStatus {
  status: keyof handlerStatus;
  participants: (string | null)[];
}
