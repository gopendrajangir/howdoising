import { useState, useEffect } from 'react';

function useMenu(menuRef: React.RefObject<HTMLElement>, btnRef: React.RefObject<HTMLButtonElement>) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function bodyClickListener(e: MouseEvent) {
      let target = e.target as any;

      while (target != null) {
        if (target === menuRef.current) {
          return;
        } else if (target === btnRef.current) {
          setShow(!show);
          return;
        }
        target = target.parentElement;
      }
      setShow(false);
    }

    document.addEventListener('click', bodyClickListener);

    return () => {
      document.removeEventListener('click', bodyClickListener);
    }
  }, [show]);

  return [show, setShow] as const;
}

export default useMenu;