import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  console.log(data);

  if (data) {
    return (
      <div className="App">
        <h1>Hi</h1>
        <p>data from api is...{data.map((e: any) => e.username)}</p>
      </div>
    );
  } else {
    return <p>loading...</p>;
  }
}

export default App;
