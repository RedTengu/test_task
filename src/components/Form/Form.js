import './Form.css';

function Form({ children, setFetching }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setFetching(true);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

export default Form;