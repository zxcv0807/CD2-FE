const Button = ({ text, type = "button" }) => {
    return (
      <button
        type={type}
        className="w-full p-3 bg-[#A476CC] text-white rounded-md transition cursor-pointer"
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  