const R = (window as any).__RISE_SDK__?.React
if (!R) throw new Error('React not found')
export default R
export const { useState, useEffect, useCallback, useRef, useMemo } = R
