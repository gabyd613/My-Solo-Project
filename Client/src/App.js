// import server.js code here to be bundled
import './styles.css';
import { useState } from "react";
import React from "react";
import {
  useNavigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import MyPhoto from "../public/pair-programming.jpg";

// create app component
const App = () => {
  // enter JSX 
  return (
    <div>
      <h1> Find a Pair Programming Partner! </h1>
      {/* enables listening for changes in browser URL and renders matching components */}
      <Router>
       {/* contains route elements that give different paths */}
        <Routes>
        {/* path === url we want to match, element === the react component to be rendered when path matches */}
          <Route path="" element={<NameBox />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

// create namebox component
const NameBox = () => {
  // set the state of namestate, give it a default message and an updater
  const [nameState, setNameState] = useState("Find your partner here!");
  // use the usenavigate hook to allow yourself the ability to change 'route' (ex. from '' to '/search') 
  // cannot use usenavigate directly because it can only be called at top level of component (not in handler functions within the component)
  let navigate = useNavigate();
  // create a function that gets triggered when onclick of the button w/ id of findpartner is clicked
  const handleClick = () => {
    // console.log("button clicked!");
    // navigate to the /search route when button clicks
    navigate("/search");
  };
  return (
    <div>
      <button id='findpartner' className="clickMe" onClick={handleClick}>
        {nameState}
      </button>
    </div>
  );
};

// create searchpage component
const SearchPage = () => {
  // usestate to set namedata to an empty object 
  const [nameData, setNameData] = useState({});
  // usestate to deal with selected partners name (picked from the nameData result of fetch request)
  const [name, setName] = useState("");
  // usestate to set the usertopic to focus on
  const [userTopic, setUserTopic] = useState("");
  // usestate to store inputted users name
  const [inputName, setInputName] = useState("");

  // create function to handle typing in the name input field (passed into input as onchange handler)
  const handleInputChange = (event) => {
    // update input name with value typed in by user
    setInputName(event.target.value);
  };

  // create function to handle user clicking topic
  const handleSelectChange = (event) => {
    // use usestate setter function to update usertopic with the clicked topic
    setUserTopic(event.target.value);
    console.log("Selected Topic:", event.target.value); // Log the selected topic
  };

  // create function to handle clicking the submit button
  const handleNameClick = async () => {
    try {
      // can set up rerouting 8080 to 3000
      // fetch request sends request to /send endpoint which responds w stuff in json file
      const response = await fetch("http://localhost:3000/search");
      // parse the data, store it in responsejson
      const responseJson = await response.json();
      // update state w info in json file
      setNameData(responseJson);
      // get array of names from the json object that are stored in the selected usertopic
      const namesArr = responseJson[userTopic];
      // check if the names array exists and isnt empty
      if (namesArr && Array.isArray(namesArr) && namesArr.length > 0) {
        // randomly select and index to pick from the array 
        const index = Math.floor(Math.random() * namesArr.length);
        // use setname to pick a name at the randomly selected index
        setName(namesArr[index]);
      }
      // catch errors that might happen during fetch request/parsing of json file
    } catch (err) {
      console.log("error getting names:", err);
    }
  };

  console.log(name);
  return (
    <div>
      <a class='entername'>Enter your name here: </a>
      <input class='nameinput' type="text" onChange={handleInputChange}></input>
      <br />
      <br />
      <label>Select your desired subject here: </label>
      <select class='topic' id="topic" value={userTopic} onChange={handleSelectChange}>
        <option value="blank"></option>
        <option value="react">React</option>
        <option value="redux">Redux</option>
        <option value="node">Node</option>
        <option value="express">Express</option>
        <option value="sql">SQL</option>
        <option value="mongodb">MongoDB</option>
        <option value="jest">Jest</option>
        <option value="ajax">Ajax</option>
      </select>
      <button className="name" onClick={handleNameClick}>
        Submit
      </button>
      {name && (
        <div>
          <h2>
            you and your <br/>
            selected partner: <br/>
             {name} + {inputName}
          </h2>
        </div>
      )}
    </div>
  );
};

export default App;
