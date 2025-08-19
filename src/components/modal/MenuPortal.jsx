// 사이드바에서 모달을 띄우기 위한 컴포넌트

import { createPortal } from 'react-dom';

const MenuPortal = ({ children }) => {
  return createPortal(children, document.body);
};

export default MenuPortal;