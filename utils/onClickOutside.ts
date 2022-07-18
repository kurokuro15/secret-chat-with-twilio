import { RefObject } from 'react';

function onClickOutside(ref: RefObject<HTMLElement>, action: (wasClikInside: boolean) => void) {
  const callback = (evt: MouseEvent) => {
    const el = evt.target;
    const isClickInside = ref.current?.contains(el instanceof Node ? el : null);

    if (!isClickInside) {
      action(false);
      document.removeEventListener('mousedown', callback, true);
    }
  };
  document.addEventListener('mousedown', callback, true);
}

export default onClickOutside;
