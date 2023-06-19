import { useState, useCallback } from 'react'
import { useScreenSize } from './media-query'

export function useMenuPatch() {
  const { isSmall, isLarge } = useScreenSize()
  const [enabled, setEnabled] = useState(isSmall || isLarge )
  const onMenuReady = useCallback(() => {
    if (!enabled) {
      return
    }

    setTimeout(() => setEnabled(false))
  }, [enabled])

  return [enabled ? 'pre-init-blink-fix' : '', onMenuReady]
}
