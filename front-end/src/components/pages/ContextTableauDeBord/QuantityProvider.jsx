import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const QuantityContext = createContext();

const QuantityProvider = (props) => {
    const [quantities, setQuantities] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios({
          method: "GET",
          url: "https://appkwilu2.herokuapp.com/detail_produits",
        }).then((res) => {
            setQuantities(res.data);
            setLoading(false);
        });
      }, [setQuantities]);

    return ( 
        <QuantityContext.Provider value={{ quantities }}>
            {props.children}
        </QuantityContext.Provider>
     );
}
 
export default QuantityProvider;