import './App.css';
import useAxios from "./useAxios";

function App() {
    const {loading, data, error, refetch} = useAxios({url:"https://yts.mx/api/v2/list_movies.json"});

    console.log(`loading: ${loading}, data: , error: ${error}`)

    return (
        <div className="App" style={{ height: "1000vh"}}>
            <h1>{data && data.status}</h1>
            <h2>{loading ? "Loading" : "Load Complete"}</h2>
            <button onClick={refetch}>Refetch</button>
        </div>
    );
}

export default App;
