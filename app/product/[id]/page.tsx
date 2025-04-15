import { getProductDetail } from '@/lib/services/api'
import ProductDetail from './components/ProductDetail'

interface PageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await Promise.resolve(params)
  
  return (
    <div className="container mx-auto md:px-4 md:py-8">
      <ProductDetail productId={id} />
    </div>
  )
}