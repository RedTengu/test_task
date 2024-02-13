// Plugin GQ
import { Octokit } from "https://esm.sh/@octokit/core";
import { paginateGraphql } from "https://esm.sh/@octokit/plugin-paginate-graphql";
// React
import { useEffect, useState } from 'react';
// Components
import Form from '../Form/Form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import RepList from '../RepList/RepList';
// Variables
import { SECRET_KEY } from "../../utils/constants";
// CSS
import './App.css';

function App() {
  const [repData, setRepData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [cursor, setCursor] = useState(null);
  const [fetching, setFetching] = useState(false); 

const searchQuery = async () => {
  const MyOctokit = Octokit.plugin(paginateGraphql);
  const octokit = new MyOctokit({ auth: SECRET_KEY });

  await octokit.graphql.paginate(
    `query paginate($cursor: String) {
      search(type: REPOSITORY, query: """${searchInput} in:name""", first: 10, after: $cursor) {
        repos: edges {
          repo: node {
            ... on Repository {
              id
              url
              name
              description
            }
          }
        }
        pageInfo {
          endCursor
        }
      }
    }`,
    {
      cursor: cursor
    }
  )
    .then(res => {
      setCursor(res.search.pageInfo.endCursor);
      setRepData([...repData, ...res.search.repos]);
    })
    .finally(() => setFetching(false))
    .catch(err => console.log(err))
}

  // Чтобы запросы разных имен не наслаивались друг к другу
  // Довольно грубо, но как временное решение
  useEffect(() => {
    setRepData([]);
  }, [searchInput])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, []);

  useEffect(() => {
    if(fetching) {
      searchQuery();
    }
  }, [fetching]);

  const scrollHandler = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true);
    }
  }

  return (
    <div className="app">
      <Form setFetching={setFetching}>
        <Input type="text" placeholder="Введите запрос" setSearchInput={setSearchInput} />
        <Button type="submit">Найти</Button>
      </Form>
      <RepList repData={repData} />
    </div>
  );
}

export default App;
