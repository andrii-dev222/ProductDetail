'use client'
import { Almarai } from 'next/font/google'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Star from '@/components/icons/Star'
import MoneyBill from '@/components/icons/MoneyBill'
import CartPlus from '@/components/icons/CartPlus'
import Image from 'next/image'
import RelatedProducts from '@/components/RelatedProducts'
import type { ProductVariant, ProdctImage, RelatedProduct } from '@/lib/interfaces';
import { setShopId } from '@/lib/store/shopSlice'

const almarai_bold = Almarai({
    weight: '700',
    subsets: ['latin'],
    display: 'swap',
})

interface ProductDetailProps {
    product: any;
    relatedProducts: RelatedProduct[];
    shopId: number;
}

export default function ProductDetail({ product, relatedProducts, shopId }: ProductDetailProps) {
    const dispatch = useDispatch()

    useEffect(() => {
        if (shopId) {
            dispatch(setShopId(shopId))
        }
    }, [dispatch, shopId])

    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>({ size: '', color: '' })
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        if (shopId) {
            dispatch(setShopId(shopId))
        }
    }, [dispatch, shopId])

    const isFirstImage = currentImageIndex === 0;
    const isLastImage = !!product ? (!product.ProductImages.length || currentImageIndex ===  product.ProductImages.length - 1) : true;
    const handleNextImage = () => {
        if (!isLastImage) {
            setCurrentImageIndex(prev => prev + 1);
        }
    }

    const handlePrevImage = () => {
        if (!isFirstImage) {
            setCurrentImageIndex(prev => prev - 1);
        }
    }

    return (
        product !== undefined ? <div className={`max-w-6xl mx-auto mt-4 ${almarai_bold.className}`}>
            <div className="p-6 mb-4 flex flex-col md:flex-row gap-8 card">
                {/* Product Images */}
                <div className="md:w-1/2">
                    <div className="relative bg-gray-50 rounded-lg aspect-square w-full">
                        <Image
                            src={`https://ik.imagekit.io/a01bjbmceb/${product.ProductImages.length > 0 ? "Prods/" + product.ProductImages[currentImageIndex].Src : "no-img300x300.png" }`}
                            alt={product.Name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                        <div
                            onClick={handlePrevImage}
                            className={`absolute left-4 top-1/2 transform -translate-y-1/2 
                            ${isFirstImage ? 'opacity-50 cursor-default' : 'cursor-pointer'} swiper-button swiper-button-prev`}>
                        </div>

                        <div
                            onClick={handleNextImage}
                            className={`absolute right-4 top-1/2 transform -translate-y-1/2 
                            ${isLastImage ? 'opacity-50 cursor-default' : 'cursor-pointer'} swiper-button swiper-button-next`}></div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2">
                            {product.ProductImages.map((_: ProdctImage, index: number) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="md:w-1/2 text-right">
                    {/* Price Section */}
                    <div className="flex flex-row-reverse justify-end items-center gap-3">
                        <span className={`text-2xl text-red-600 ${almarai_bold.className}`}>{product.SPrice} د.ل</span>
                        <span className={`text-2xl line-through ${almarai_bold.className}`}>{product.Caprice} د.ل</span>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="text-right mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className="text-gray-400 cursor-pointer">
                                        <Star />
                                    </span>
                                ))}
                            </div>
                        </div>
                        <p className="text-sm">التقييمات (0) كتابة تعليق</p>
                    </div>
                    <hr className="my-6 h-0.5 border-t-0 bg-gray-300" />
                    {product.ProductOptions.length > 0 && product.ProductOptions.map((variant: any) => {
                        return (
                            <div key={variant.OptId} className="mb-4">
                                <h3 className="text-lg mb-2">{variant.CatName}</h3>
                                <div className="flex flex-row gap-3">
                                    {variant.Items.map((item: any) => (
                                        variant.CatId !== 50 ? (
                                            <div
                                                key={`size-${item.ItemName}`}
                                                onClick={() => setSelectedVariant({ ...selectedVariant, size: item.ItemName.toString() })}
                                                className={`p-1 rounded-full ${selectedVariant.size === item.ItemName.toString()
                                                    ? 'border-red-500 border-2 border-dashed'
                                                    : 'border-0'
                                                    }`}
                                            >
                                                <button
                                                    key={item.ItemName}
                                                    className='w-12 h-12 rounded-full border cursor-pointer'
                                                >
                                                    {item.ItemName}
                                                </button>
                                            </div>
                                        ) : (
                                            <div
                                                key={`color-${item.BcolorHex}`}
                                                onClick={() => setSelectedVariant({ ...selectedVariant, color: item.BcolorHex.toString() })}
                                                className={`p-1 rounded-full leading-none ${selectedVariant.color === item.BcolorHex.toString()
                                                    ? 'border-red-500 border-2 border-dashed'
                                                    : 'border-0'
                                                    }`}
                                            >
                                                <button
                                                    key={item.BcolorHex}
                                                    className='w-12 h-12 cursor-pointer rounded-full border'
                                                    style={{ backgroundColor: item.BcolorHex }}
                                                />
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        )
                    })}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <div className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex justify-center items-center gap-2 cursor-pointer">
                            <span>أضف للسلة</span>
                            <CartPlus />
                        </div>
                        <div className="w-full py-3 text-white rounded-lg btn-danger flex justify-center items-center gap-2 cursor-pointer">
                            <span> إشتري الآن</span>
                            <MoneyBill />
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Description Card */}
            <div className="bg-white rounded-lg p-6 card mb-6">
                <div className="text-right">
                    <h2 className="text-xl font-bold mb-4">تفاصيل المنتج</h2>
                    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: product.Description }} />
                </div>
            </div>

            {/* Related Products */}
            {
                relatedProducts.length > 0 && (
                    <RelatedProducts products={relatedProducts} />
                )
            }
        </div> : <div className='flex items-center justify-center w-screen h-screen'>Product Not Found</div>
    )
}