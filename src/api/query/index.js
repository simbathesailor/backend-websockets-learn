const QUERY_GET_ALLPRODUCTS = `
WITH product_reviews_product AS (WITH product_reviews AS  (SELECT Product.id, Product.title, Product.description, Product.created_at, Product.updated_at, Review.rating
  FROM public.product as Product
  INNER JOIN public.review as Review ON Product.id = Review.product_id)
  
SELECT id,   ROUND( AVG(rating), 1 )  as total_rating
FROM product_reviews
GROUP BY id)

SELECT Product.id, Product.title, Product.description, Product.created_at, Product.updated_at,  ProductReviewProduct.total_rating::numeric
FROM public.product as Product
  LEFT JOIN product_reviews_product as ProductReviewProduct ON Product.id = ProductReviewProduct.id
`;

exports.QUERY_GET_ALLPRODUCTS = QUERY_GET_ALLPRODUCTS;
