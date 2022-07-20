import Avatar from 'components/ui/Avatar';
import { useEffect, useState } from 'react';
import getAvatarByUsername from 'services/getAvatarByUsername';

export default function ParticipantAvatar({ username }: { username?: string | null }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>();
  useEffect(() => {
    if (!username) return;
    getAvatarByUsername(username).then(setAvatarUrl);
  }, [username]);
  return <Avatar src={avatarUrl} />;
}
