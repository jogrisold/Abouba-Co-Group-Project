import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
    const [item, setItem] = useState(null);
    const itemId = useParams();
    const id = parseInt(itemId.productId);

    useEffect(()=>{
        fetch(`/api/products/${id}`)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            setItem(data.data)
        })
    }, [])

    if (item) {
        return (
            <div>test</div>

        )
    } else {
        return (
            <div>loading</div>
        )
    }
}

export default ItemDetails;