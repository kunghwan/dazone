import Item from "./Item";

const App = () => {
  const data = "Hello world";
  return (
    <div>
      <h1>App</h1>
      <Item data={data} />
      <Item data={"1234123"} />
      <Item data="함수확인" fn={() => console.log(data)} />
    </div>
  );
};

export default App;
