import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  body?: string;
}

const App = () => {
  const [resourceType, setResourceType] = useState("posts");
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    const controller = new AbortController(); // Criando o controlador de abort
    const signal = controller.signal;

    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`, { signal })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Erro ao buscar os dados:", error);
        }
      });

     // Cleanup: aborta a requisição anterior ao mudar o resourceType ou desmontar
    return () => controller.abort();
  }, [resourceType]);

  // para definir quando vai mudar
  // useEffect(() => {
  //   alert(`Mudanças detectadas!`)
  // })



  // useEffect com cleanup (desmontagem do componente)
  // useEffect(() => {
  // console.log("Componente montado!");

  // return () => {
  //   console.log("Componente desmontado!");
  //   };
  // }, [data]);

  const changeResourceType = (type: string) => {
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
          {data.map((item, index) => (
            <li key={item.id || index}>
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




// useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`https://jsonplaceholder.typicode.com/${resourceType}`);
//       const result = await response.json(); // armazena todos os resultados do parametro fornecido
//       setData(result);
//     };

//     fetchData();
//   }, [resourceType]);