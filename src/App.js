import React, { useEffect, useState } from 'react';
import DataFetching from './dataFetchingUI';
import Loading from './loadingUI';

function App(){
    const [done,setDone] = useState(false)
    useEffect(()=>{
        setTimeout(() => {
            setDone(true)
        },2000)
    },[])
    return(
        <div>
            {done? <DataFetching/> : <Loading/>}
        </div>
    );
}

export default App;
