import './RepList.css';

function RepList({ repData }) {
  return (
    <ul className="rep-list">
      {repData.map(item => (
        <li className="rep-list__item" key={item.repo.id}>
          <h2>{item.repo.name}</h2>
          <p>{item.repo.description}</p>
          <a href={item.repo.url}>{item.repo.url}</a>
        </li>
      ))}
    </ul>
  );
}

export default RepList;
