import "./App.css";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");

  function addNewTransaction(ev) {
    console.log("test");
    ev.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log(apiUrl);
    const url = `${apiUrl}/transaction`;
    const price = name.split(" ")[0];
    console.log(JSON.stringify({ name, description, datetime, price }));
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.substring(price.length + 1),
        description,
        datetime,
        price,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          // Throw an error if the HTTP status is not OK
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Check if the response body is empty
        if (response.headers.get("content-length") === "0") {
          console.log("No content in response body");
          return null; // Return null if there's no content
        }

        return response.json(); // Parse JSON if body exists
      })
      .then((data) => {
        if (data) {
          console.log("Result:", data);
        } else {
          console.log("No JSON data returned");
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });

    console.log(url);
  }
  return (
    <main>
      <h1>
        $400<span>.00</span>
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder={"+200 new Samsung TV"}
            required
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(ev) => setDatetime(ev.target.value)}
            required
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder={"description"}
            required
          />
        </div>
        <button type="submit">Add new Transaction</button>
      </form>
      <div className="transactions">
        <div className="transaction">
          <div className="left">
            <div className="name">New Samsung TV</div>
            <div className="description">It was time of new TV</div>
          </div>
          <div className="right">
            <div className="price red">-$500</div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
        </div>
        <div className="transaction">
          <div className="left">
            <div className="name">New Apple Job</div>
            <div className="description">It was time of new TV</div>
          </div>
          <div className="right">
            <div className="price green">+$8000</div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
        </div>
        <div className="transaction">
          <div className="left">
            <div className="name">IPhone</div>
            <div className="description">It was time of new TV</div>
          </div>
          <div className="right">
            <div className="price red">-$1500</div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
        </div>
        <div className="transaction">
          <div className="left">
            <div className="name">Garmin Watch</div>
            <div className="description">It was time of new Watch</div>
          </div>
          <div className="right">
            <div className="price red">-$600</div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
