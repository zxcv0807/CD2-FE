const Input = ({ type, name, placeholder, value, onChange }) => {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 mb-2 border border-gray-300 rounded-md"
      />
    );
  };
  
  export default Input;  