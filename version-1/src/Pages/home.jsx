import React from "react";
import { useState } from "react";
import CardList from "../Components/CardList";
import '../App.css';

function Home ({data}) {
const [countries, setCountries] = useState(null);
    useEffect(() => {
        if (data) {
            setCountries(data)
            console.log(data, 'countries')
        }
        console.log('useEffect ran');
        } , [data])

    return(
        <div id="home">
        
        <CardList data={data} />
        </div>
    )
}

export default Home;