import styled from "styled-components"
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "./StoreContext";
import { BsSuitHeart } from "react-icons/bs";
import { BsCartDash } from "react-icons/bs";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import LinkHomepage from "./LinkHomepage";


const Profile = () => {

    const {products} = useContext(StoreContext);
    const {currentUser} = useContext(UserContext);
    
    const [userData, setUserData] = useState(null);
    useEffect(()=>{
        if (currentUser) {
            fetch(`api/users/${currentUser._id}`)
            .then(res=>res.json())
            .then((data)=>{
                console.log(data)
                setUserData(data.data)         
            }).then(console.log(userData))
        }
    }, [currentUser])

    // if (currentUser && userData) {
        return (
            <Center>
                <LinkHomepage/>
                <Wrapper>
                    {currentUser ?
                    <>
                                        <H1>Profile</H1>
                                        <FlexRow>
                                            <Text>{currentUser.given_name}</Text>
                                            <Surname>{currentUser.family_name}</Surname>
                                        </FlexRow>
                                        <Email>{currentUser.email}</Email>
                                        <Line></Line>            
                                        <PurchaseHistory>
                                            <H1>Purchase History</H1>
                                            {/* To do: map user's purchased items */}
                                            {userData && userData.purchaseHistory.length > 0 ?
                                            userData.purchaseHistory.map(element =>{
                                                return (
                                                    <FlexCol>
                                                    <OrderNumber>Order #: {element._id}</OrderNumber>
                                                    <div>Purchase date: {Date(element.datePurchased)}</div>
                                                    {element.products.map(e=>{
                                                        return (
                                                            <>
                                                            <div>{e.name}</div>
                                                            <div>{e.quantity} x {e.price}</div>
                                                            </>
                                                        )
                                                    })}
                                                    <div>Total: ${parseInt(element.purchaseTotal.slice(1)).toFixed(2)}</div>
                                                    <Line/>
                                                    </FlexCol>
                                                )
                                            })
                                             :
                                             <>
                                             <p>You have no purchases yet.</p>
                                             </>
                                            }
                                        </PurchaseHistory>
                                        </>
                    :
                    <p>Please <Link to ="/login" style={{color: "var(--color-secondary)"}}> login</Link> to continue</p>
                    }
                </Wrapper>
            </Center>
    
        )
    // } else {
    //     return (
    //         <Center>
    //             <LinkHomepage/>
    //             <Wrapper>
    //         <H1 style={{padding: "28px 0 0 0"}}>Profile</H1>
    //         <Line/>
    //         <FlexContainer>

    //         </FlexContainer>
    //         </Wrapper>
    //         </Center>
    //     )
    // }

}

export default Profile;

const Center= styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;
const Wrapper= styled.div`
    display: flex;
    width: 500px;
    margin: 50px;
    flex-direction: column;
    align-items: left;
    margin-top: 100px;
`;
const FlexCol = styled.div`
display: flex;
flex-direction: column;
gap: 8px;
`;
const FlexRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: top;
    align-items: top;
    text-align: top;
    margin: 10px 0 10px 0;
`;
const FlexRow2 = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: top;
    text-align: top;
    margin: 10px 0 10px 0;
`;
const ProfileImg = styled.img`
    width: 200px;
    height: 200px;
    border: 10px solid var(--color-quarternary);
    border-radius: 200px;
    object-fit:cover;
`;
const Text = styled.div`
`;
const PurchaseHistory = styled.div`
`;
const OrderNumber = styled.div`
`;
const Surname = styled.div`
    margin:  0 0 0 10px;
`;
const Email = styled.div`
    margin: 10px 0 10px 0;
`;
const Line = styled.div`
    border: 1px solid var(--color-secondary);
    margin: 10px 0 30px 0;
`;
const H1 = styled.h1`
    text-align: left;
    margin: 10px 0 10px 0;
`;
const ProductName = styled.div`

`;
const Price = styled.div`
    margin: 0 0 0 10px;
`;
const Quantity = styled.div`
    margin: 0 0 0 10px;
`;
const PurchaseTotal = styled.div`
`;
const Favorites = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1em;
    margin: 20px 0;
`;
const Favorite = styled.div`
    border: 1px solid var(--color-quarternary);
    border-radius: 10px;
    width: 250px;
    padding: 0 0 0 10px;
   

`;
const FavoriteImg = styled.img`
    width: 100px;
    text-align: top;
    margin: 10px 15px 10px 10px;
`;
const FavoriteName = styled.div`
    margin: 10px;
`;
const Cart = styled.div`
    margin: 10px;
    padding: 0 10px;
`;
const Heart = styled.div`
    margin: 10px;
    text-align: right;
    padding: 0 10px;
`;

const FlexContainer = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
height: 40vh;
`
