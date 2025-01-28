import { useState, useEffect } from "react";

const App = () => {
  const [resourceType, setResourceType] = useState("posts"); // armezena as propriedades do tipo de recurso
  const [data, setData] = useState([]);

  // Fazendo o fetch dos dados sempre que o resourceType mudar
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/${resourceType}`);
      const result = await response.json(); // armazena todos os resultados do parametro fornecido
      setData(result);
    };

    fetchData();
  }, [resourceType]);

  // Função para trocar o tipo de recurso
  const changeResourceType = (type) => {
    setResourceType(type);
  };

  return (
    <div>
      <h1>{resourceType}</h1>

      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <button onClick={() => changeResourceType("posts")}>Posts</button>
        <button onClick={() => changeResourceType("comments")}>Comments</button>
        <button onClick={() => changeResourceType("todos")}>Todos</button>
      </div>

      <div>
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                {resourceType === "posts" && item.title}
                {resourceType === "comments" && item.body}
                {resourceType === "todos" && item.title}
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default App;

