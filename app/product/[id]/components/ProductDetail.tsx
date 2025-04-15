'use client'
import { Almarai } from 'next/font/google'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetail, getShopId } from '@/lib/services/api'
import { setShopId } from '@/lib/store/shopSlice'
import type { RootState } from '@/lib/store/store'
import Star from '@/components/icons/Star'
import MoneyBill from '@/components/icons/MoneyBill'
import CartPlus from '@/components/icons/CartPlus'
import Image from 'next/image'

interface ProductVariant {
    size: string;
    color: string;
}

interface ProdctImage {
    Id: number;
    Position: number;
    Src: string;
}

const almarai_bold = Almarai({
    weight: '700',
    subsets: ['latin'],
    display: 'swap',
})

export default function ProductDetail({ productId }: { productId: string }) {
    const dispatch = useDispatch()
    const sId = useSelector((state: RootState) => state.shop.sId)
    const [product, setProduct] = useState<any>(null)
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>({ size: '', color: '' })
    const [loading, setLoading] = useState(true)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const initializeShopId = async () => {
            try {
                const referer = `localhost:58961`
                const shopIdResponse = await getShopId(referer)
                dispatch(setShopId(shopIdResponse.Data.Id))
            } catch (error) {
                console.error('Failed to get shop ID:', error)
            }
        }

        if (!sId) {
            initializeShopId()
        }
    }, [dispatch, sId])

    useEffect(() => {
        const fetchProduct = async () => {
            if (!sId) return
            try {
                const productData = await getProductDetail(productId, sId)
                setProduct(productData.Data.Product)
            } catch (error) {
                console.error('Failed to fetch product:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [productId, sId])

    if (loading) {
        return <div className="flex justify-center items-center h-screen">...</div>
    }

    if (!product) {
        return <div>Product not found</div>
    }

    const isFirstImage = currentImageIndex === 0;
    const isLastImage = currentImageIndex === product.ProductImages.length - 1;

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
        <div className={`max-w-6xl mx-auto mt-4 ${almarai_bold.className}`}>
            <div className="p-6 mb-4 flex flex-col md:flex-row gap-8 card">
                {/* Product Images */}
                <div className="md:w-1/2">
                    <div className="relative bg-gray-50 rounded-lg aspect-square w-full">
                        <Image
                            src={`https://ik.imagekit.io/a01bjbmceb/Prods/${product.ProductImages[currentImageIndex].Src}`}
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
                        <span className={`text-2xl text-red-600 ${almarai_bold.className}`}>450 د.ل</span>
                        <span className={`text-2xl line-through ${almarai_bold.className}`}>600 د.ل</span>
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
                    {/* Size Selection */}
                    <div className="mb-8">
                        <h3 className="text-lg mb-4">رقم</h3>
                        <div className="flex flex-row gap-3">
                            {[37, 38, 39, 40].map((size) => (
                                <div
                                    key={`size-${size}`}
                                    onClick={() => setSelectedVariant({ ...selectedVariant, size: size.toString() })}
                                    className={`p-1 rounded-full ${selectedVariant.size === size.toString()
                                        ? 'border-red-500 border-2 border-dashed'
                                        : 'border-0'
                                        }`}
                                >
                                    <button
                                        key={size}
                                        className='w-12 h-12 rounded-full border cursor-pointer'
                                    >
                                        {size}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Color Selection */}
                    <div className="mb-8">
                        <h3 className="text-lg mb-4">ألوان متاحة</h3>
                        <div className="flex flex-row gap-3">
                            {['red', 'gray', 'black'].map((color) => (
                                <div
                                    key={`color-${color}`}
                                    onClick={() => setSelectedVariant({ ...selectedVariant, color: color.toString() })}
                                    className={`p-1 rounded-full leading-none ${selectedVariant.color === color.toString()
                                        ? 'border-red-500 border-2 border-dashed'
                                        : 'border-0'
                                        }`}
                                >
                                    <button
                                        key={color}
                                        className='w-12 h-12 cursor-pointer rounded-full border'
                                        style={{ backgroundColor: color }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <div className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex justify-center items-center gap-2 cursor-pointer">
                            <span>أضف للسلة</span>
                            <CartPlus />
                        </div>
                        <div className="w-full py-3 text-white rounded-lg btn-danger flex justify-center items-center gap-2 cursor-pointer">
                            <span> إشتري الآن</span>
                            <MoneyBill/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Description Card */}
            <div className="bg-white rounded-lg p-6 card">
                <div className="text-right">
                    <h2 className="text-xl font-bold mb-4">تفاصيل المنتج</h2>
                    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: product.Description }} />
                </div>
            </div>
        </div>
    )
}