# Products

## GetProduct

```bash
curl --request GET \
  --url http://localhost:3000/api/product/6040de091a2ac332d80ca788
```

## DeleteProduct

```bash
curl --request DELETE \
  --url http://localhost:3000/api/product/6041f77bb3e24b1e15e98d37
```

## FindProduct

```bash
curl --request POST \
  --url http://localhost:3000/api/product/find \
  --header 'Content-Type: application/json' \
  --data '{
 "category": "",
 "limit": 10
}'
```

## CreateProduct

```bash
curl --request POST \
  --url http://localhost:3000/api/product/create \
  --header 'Content-Type: application/json' \
  --data '{
 "image": "1.png",
 "title": "Мой продукт",
 "price": 100,
 "oldPrice": 120,
 "credit": 10,
 "description": "Описание продукта",
 "advantages": "Преимущества продукта",
 "disAdvantages": "Недостатки продукта",
 "categories": ["тест"],
 "tags": ["тег1"],
 "characteristics": [{
  "name": "Характеристика 1",
  "value": "1"
 },{
  "name": "Характеристика 2",
  "value": "2"
 }]
}'
```

## UpdateProduct

```bash
curl --request PATCH \
  --url http://localhost:3000/api/product/6041f77bb3e24b1e15e98d374 \
  --header 'Content-Type: application/json' \
  --data '{
 "image": "2.png",
 "title": "Мой продукт",
 "price": 100,
 "oldPrice": 120,
 "credit": 10,
 "description": "Описание продукта",
 "advantages": "Преимущества продукта",
 "disAdvantages": "Недостатки продукта",
 "categories": ["тест"],
 "tags": ["тег1"],
 "characteristics": [{
  "name": "Характеристика 1",
  "value": "1"
 },{
  "name": "Характеристика 2",
  "value": "2"
 }]
}'
```
