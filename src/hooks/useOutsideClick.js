import { useEffect, useRef } from 'react';

const useOutsideClick = function (callback, listeningCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    }

    document.addEventListener('click', handleClick, listeningCapturing);

    return () =>
      document.removeEventListener('click', handleClick, listeningCapturing);
  }, [callback, listeningCapturing]);
  return ref;
};

export { useOutsideClick };
