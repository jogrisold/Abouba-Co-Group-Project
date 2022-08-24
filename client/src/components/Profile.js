//**************************************************************** */
// Imports
//**************************************************************** */

// React dependencies
import styled from "styled-components"
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Local component dependencies
import { UserContext } from "./UserContext";
import LinkHomepage from "./LinkHomepage";

// It's your profile! 
const Profile = () => {

    //**************************************************************** */
    // Constants
    //**************************************************************** */

    // Use context to bring in the current user that is logged in
    const {currentUser} = useContext(UserContext);
    
    // Create a state to store the user's data
    const [userData, setUserData] = useState(null);
    
    //**************************************************************** */
    // Functions
    //**************************************************************** */

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

        return (
            <Center>
                <Wrapper>
                <LinkHomepage/>
                {/* If there is a current user (i.e. the user has logged in) */}
                    {currentUser 
                    //Then return their profile
                    ?   <>
                        <H1>Profile</H1>
                        <Line></Line> 
                        <FlexRow>
                            <Name><Bold>Name:</Bold> {currentUser.given_name}</Name>
                            <Surname>{currentUser.family_name}</Surname>
                        </FlexRow>
                        <Email><Bold>Email: </Bold> {currentUser.email}</Email>
                                   
                        <PurchaseHistory>
                            <H1>Purchase History</H1>
                            <Line></Line> 
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
                                    <Total>Total: ${parseInt(element.purchaseTotal.slice(1)).toFixed(2)}</Total>
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
                // Otherwise, direct the user to login first
                : <p>Please <Link to ="/login" style={{color: "var(--color-secondary)"}}> login</Link> to continue</p>
                }
            </Wrapper>
        </Center>
        )
}

// Export the component for use in /profile
export default Profile;

//**************************************************************** */
// Styled Components
//**************************************************************** */

const Center= styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: 18px;
    font-family: var(--font-body);
`;
const Wrapper= styled.div`
    display: flex;
    width: 70%;
    flex-direction: column;
    align-items: left;
    margin-top: 100px;
`;
const Name = styled.div`
    font-size: 20px;
`;
const Surname = styled.div`
    margin:  0 0 0 10px;
    font-size: 20px;
`;
const Email = styled.div`
    margin: 10px 0 10px 0;
    font-size: 20px;
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
const Bold = styled.span`
    font-weight: 800;
    margin-right: 2px;
`;
const Total = styled.div` 
    font-weight: 800;
    margin: 10px 0;
`;
const PurchaseHistory = styled.div`

`;
const OrderNumber = styled.div`
    font-weight: 800;
    margin: 0 0 10px;
`;

const Line = styled.div`
    border: 1px solid var(--color-secondary);
    margin: 10px 0 30px 0;
`;
const H1 = styled.h1`
    text-align: left;
    margin: 40px 0 10px 0;
    font-size: 30px !important;
`;