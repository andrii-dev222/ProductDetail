export interface ProductVariant {
    size: string;
    color: string;
}

export interface ProdctImage {
    Id: number;
    Position: number;
    Src: string;
}

export interface RelatedProduct {
    Caprice: string;
    CoverImg: string;
    Id: number;
    IsDiscounted: boolean;
    IsVariant: boolean;
    Name: string;
    NoQtySell: boolean;
    Qty: number
    Sprice: string;
}