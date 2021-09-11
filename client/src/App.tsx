import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api");
      const data = await response.json();
      setData(data.msg);
    };

    fetchData();
  }, []);

  if (data) {
    return (
      <div className="App">
        <h1>Hi</h1>
        <p>data from api is...{data}!!!</p>
      </div>
    );
  } else {
    return <p>loading...</p>;
  }
}

export default App;
