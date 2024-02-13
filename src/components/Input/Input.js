import './Input.css';

function Input({type, placeholder, setSearchInput}) {
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  }

  return (
    <input 
      className="input"
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      required />
  );
}

export default Input;