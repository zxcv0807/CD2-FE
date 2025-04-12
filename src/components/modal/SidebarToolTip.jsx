const SidebarToolToolTip = ({ text }) => {
  return (
    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-1 bg-[#6A4B85] text-white text-sm px-3 py-1 rounded-md shadow-md whitespace-nowrap">
      {text}
      {/* 왼쪽 삼각형 */}
      <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-b-6 border-r-6 border-t-transparent border-b-transparent border-r-[#6A4B85]" />
    </div>
  );
};

export default SidebarToolToolTip;