import { useCallback, useRef } from 'react';

export function useDoubleClick(
  onSingleClick?: () => void,
  onDoubleClick?: () => void,
  delay = 250
) {
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleClick = useCallback(() => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      onDoubleClick?.();
    } else {
      clickTimeout.current = setTimeout(() => {
        onSingleClick?.();
        clickTimeout.current = null;
      }, delay);
    }
  }, [onSingleClick, onDoubleClick, delay]);

  return handleClick;
}