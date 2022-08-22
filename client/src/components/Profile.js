import styled from "styled-components"
import { useEffect } from "react";
import { useContext } from "react";
import { StoreContext } from "./StoreContext";
import { BsSuitHeart } from "react-icons/bs";
import { BsCartDash } from "react-icons/bs";
import { UserContext } from "./UserContext";


const Profile = () => {

    const {products} = useContext(StoreContext);
    const {currentUser} = useContext(UserContext)

    return (
        <Center>
            <Wrapper>
                <ProfileImg src = "https://geekireland.com/wp-content/uploads/2018/11/maxresdefault-2-1024x576.jpg"/>
                <H1>Profile</H1>
                <FlexRow>
                    <Text>Jotaro</Text>
                    <Surname>Jostar</Surname>
                </FlexRow>
                <Email>jotaro.jostar@jojo.jo</Email>
                <Line></Line>            

                <PurchaseHistory>
                    <H1>Purchase History</H1>
                    {/* To do: map user's purchased items */}
                    <OrderNumber>Order #: -confirmation-id-</OrderNumber>
                    <FlexRow>
                        <ProductName>Star Platinum Super Cool Stand</ProductName>
                        <Price>$1,000</Price>
                        <Quantity>1</Quantity>
                    </FlexRow>
                    <OrderNumber>Order #: -confirmation-id-</OrderNumber>
                    <FlexRow>
                        <ProductName>Tacky Hat</ProductName>
                        <Price>$200.56</Price>
                        <Quantity>1</Quantity>
                    </FlexRow>
                    <PurchaseTotal>Purchase total: $1,200.56</PurchaseTotal>
                    <Line></Line>  
                    <H1>Favorites</H1>
                    <Favorites>
                    {/* To do: map user's favorited products */}
                        <Favorite>
                            <FlexRow2>
                                <FavoriteImg src = {products.length > 0 ? products[0].imageSrc : ""}/>
                                <Heart>
                                    <BsSuitHeart size = {20}/>
                                </Heart>
                            </FlexRow2>
                            <FlexRow>
                                <FavoriteName>{products.length > 0 ? products[0].name : ""}</FavoriteName>
                                <Cart>
                                    <BsCartDash size = {20} />
                                </Cart>
                            </FlexRow>
                        </Favorite>

                    </Favorites>

                </PurchaseHistory>
            </Wrapper>
        </Center>

    )
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
`;
const FlexCol = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
margin: 10px 0;
width: 30%;
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
