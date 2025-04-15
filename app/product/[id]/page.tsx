import { getProductDetail } from '@/lib/services/api'
import ProductDetail from './components/ProductDetail'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  
  return (
    <ProductDetail productId={id} />
  )
}