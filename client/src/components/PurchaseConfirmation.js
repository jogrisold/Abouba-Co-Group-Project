import {BsFillCartCheckFill} from 'react-icons/bs'
import styled from 'styled-components';
import LinkHomepage from './LinkHomepage';

const PurchaseConfirmation = () =>{
    return (
    <Wrapper>
        <HomepageLink/>
        <CartIcon/>
        <Text>Your order has been confirmed!</Text>
    </Wrapper>
    )
}

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 2rem;
height: 400px;
`

const HomepageLink = styled(LinkHomepage)`
color: var(--color-secondary);
`

const CartIcon = styled(BsFillCartCheckFill)`
font-size: 8rem;
color: var(--color-secondary);`

const Text = styled.h3`
font-size: 30px;
`

export default PurchaseConfirmation;