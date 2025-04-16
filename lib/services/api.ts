import axios from 'axios'

const BASE_URL = 'https://shop-api-test-v2.ezone.ly'

export const getShopId = async (referer: string) => {
  const response = await axios.get(`${BASE_URL}/shop/getRequestShopId`, {
    headers: {
      Referer: referer
    }
  })
  return response.data
}

export const getProductDetail = async (productId: string, sId: number) => {
  const response = await axios.get(`${BASE_URL}/ShopProducts/ProductDetail/${productId}`, {
    headers: {
      sId: sId
    }
  })
  console.log(response.data)
  return response.data
}