// Apenas para exibir dados que já estão no estado
// Se os dados já estão disponíveis, não precisamos de useEffect para usá-los.

// Errado ❌:
const [text, setText] = useState("Olá");

useEffect(() => {
  console.log(text);
}, [text]); // Desnecessário


// Certo ✅:
const [text, setText] = useState("Olá");

console.log(text); // Pode ser chamado diretamente sem `useEffect`



// ---------------------------------------------------------------------



// Atualizando estado a partir de outro estado
// Se você estiver derivando um estado de outro, o useEffect não é necessário. Basta calcular o valor diretamente.

// Errado ❌:
const [price, setPrice] = useState(100);
const [total, setTotal] = useState(0);

useEffect(() => {
  setTotal(price * 1.2);
}, [price]); // Desnecessário


// Certo ✅:
const [price, setPrice] = useState(100);
const total = price * 1.2; // Sem `useEffect`


// ----------------------------------------------------------------------



// Manipulando diretamente o estado dentro do useEffect
// Se o estado pode ser atualizado diretamente dentro do evento, não precisa de useEffect.

// Errado ❌:
const [count, setCount] = useState(0);

useEffect(() => {
  setCount(count + 1);
}, [count]); // Isso cria um loop infinito!


// Certo ✅:
const [count, setCount] = useState(0);

return (
  <button onClick={() => setCount(count + 1)}>Incrementar</button>
);



// ------------------------------------------------------------------



 // Executando código na renderização sem efeitos colaterais
 // Se não há efeitos colaterais, você pode simplesmente executar o código dentro do componente.

 // Errado ❌:
 const [number, setNumber] = useState(5);
let double;

useEffect(() => {
  double = number * 2;
}, [number]); // Desnecessário

// Certo ✅:
const [number, setNumber] = useState(5);
const double = number * 2; // Sem `useEffect`
