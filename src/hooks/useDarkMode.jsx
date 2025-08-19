// 다크모드를 적용하기 위한 커스텀 훅

import { useEffect } from "react";

export default function useDarkMode(theme) {
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
}