import React from "react"
import Header from "./Header"
import "../styles/App.css"
import Title from "./Title"
import Content from "./Content"
import Spacer from "./Spacer"
function App() {
  return (
    <div>
      <Spacer />
      <Header />
      <Title />
      <Content />
    </div>
  );
}

export default App;
