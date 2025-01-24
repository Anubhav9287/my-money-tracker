import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getTransactions().then((transactions) => {
      setTransactions(transactions);
    });
  });

  async function getTransactions() {
    const url = `${apiUrl}/transactions`;
    const response = await fetch(url);
    return await response.json();
  }

  async function addNewTransaction(ev) {
    console.log("test");
    ev.preventDefault();
    console.log(apiUrl);
    const url = `${apiUrl}/transaction`;
    const price = name.split(" ")[0];
    console.log(JSON.stringify({ name, description, datetime, price }));
    await fetch(url, {
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
        setName("");
        setDatetime("");
        setDescription("");
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

  let balance = 0;
  for (const transaction of transactions) {
    balance += transaction.price;
  }
  const [integerPart, decimalPart] = balance.toFixed(2).split(".");

  return (
    <main>
      <h1>
        ${integerPart}
        <span>.{decimalPart}</span>
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
        {transactions.length > 0 &&
          transactions.map((transaction, index) => (
            <div className="transaction" key={transaction.id || index}>
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                <div
                  className={
                    "price " + (transaction.price > 0 ? "green" : "red")
                  }
                >
                  {transaction.price}
                </div>
                <div className="datetime">{transaction.datetime}</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
