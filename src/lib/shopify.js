const domain  = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyData(query) {
  //TODO: Check why env variables are not working
  //const URL = `https://${domain}/admin/api/2020-07/graphql.json`;

  const URL = `https://musicfolder-cad.myshopify.com/api/2021-10/graphql.json`;

  const options = {
    endpoint: URL,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': 'd83339091aedba4d465f6dc044bd6bc9',
    },
    body: JSON.stringify({
      query,
    }),
  };

  try {
    const response = await fetch(URL, options). then(res => res.json());
    console.log(response);
    return response
  } catch (error) {
    console.error(error);
    throw new Error("Product not fetched", error);
  }
}

export async function getProducts() {
  const query = `
    query {
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 250) {
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyData(query);
  return data.data.products.edges || [];
}

export async function getProduct (handle) {
  const query = `
    query {
      productByHandle(handle: "${handle}") {
        id
        title
        handle
        description
        images(first: 250) {
          edges {
            node {
              src
            }
          }
        }
      }
    }
  `;

  const data = await shopifyData(query);
  return data.data.productByHandle;
}

export async function getCollectionByHandle (handle) {
  const query = `
    query {
      collectionByHandle(handle: "${handle}") {
        id
        title
        handle
        description
        products(first: 250) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 250) {
                edges {
                  node {
                    originalSrc
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyData(query);
  console.log(data);
  return data.data.collectionByHandle;
}

