import { getProductDetail, getShopId } from '@/lib/services/api'
import ProductDetail from './components/ProductDetail'
import { headers } from 'next/headers'

interface PageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  const headersList = await headers()
  const referer = headersList.get('host') || ''
  
  const shopIdResponse = await getShopId(referer)
  const productData = await getProductDetail(id, shopIdResponse.Data.Id)

  return (
    <ProductDetail 
      product={productData.Data.Product} 
      relatedProducts={productData.Data.RelatedProducts || []}
      shopId={shopIdResponse.Data.Id}
    />
  )
}