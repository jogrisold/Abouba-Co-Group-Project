
import { Swiper, SwiperSlide } from 'swiper/'
import { useContext } from 'react'
import { StoreContext } from './StoreContext'
import { ProductCard } from './ProductCard'

export const Carousel = () => {
    const { products, companies } = useContext(StoreContext)

        return (
        <>
        <ProductCard/>
        </>
        )


}