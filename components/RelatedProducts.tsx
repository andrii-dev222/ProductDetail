import Image from 'next/image'
import Link from 'next/link'
import { RelatedProduct } from '@/lib/interfaces'

export default function RelatedProducts({ products }: { products: RelatedProduct[] }) {
    return (
        <div className="bg-white rounded-lg p-6 mt-4 card">
            <h2 className="text-xl font-bold mb-6 text-right">منتجات ذات صلة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((product) => (
                    <Link href={`/product/${product.Id}`} key={product.Id}>
                        <div className="group cursor-pointer">
                            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                                <Image
                                    src={`https://ik.imagekit.io/a01bjbmceb/Prods/${product.CoverImg}`}
                                    alt={product.Name}
                                    fill
                                    className="object-contain group-hover:scale-105 transition-transform duration-200"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                            </div>
                            <div className="mt-2 text-right">
                                <h3 className="text-sm font-medium">{product.Name}</h3>
                                <div className="flex justify-end gap-2 mt-1">
                                    <span className="text-red-600 font-bold">{product.Caprice} د.ل</span>
                                    {product.Sprice && (
                                        <span className="text-gray-500 line-through">{product.Sprice} د.ل</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}