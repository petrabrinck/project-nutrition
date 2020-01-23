import React from 'react'
import { useSelector } from 'react-redux'
//this component Product, whill show the product when we fetched it
import styled from 'styled-components'

const ProductHeading = styled.div`
    display: flex;
    flex-direction: row;
    // width: 500px;
    justify-content: center;
`
//this component Product, whill show the product when we fetched it
export const Product = () => {
    const product = useSelector(state => state.products.product)

    // if we dont have a product at all, we dont want to show anything, return null
    if (!product) return null
    // if we get a product, we want to show it
    console.log('product', product)


    return (
        <>
            <ProductHeading>
                <h1>Product</h1>
            </ProductHeading>

            {/* first checking that we get the product in the fetch && then show the picture of the product */}
            <img src={product.product && product.product.image_url} alt="" />

        </>
    )
}


