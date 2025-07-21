import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"

export const woocommerceapi = new WooCommerceRestApi({
  url: "https://dev-nextwebstore.pantheonsite.io/",
  consumerKey: "ck_e0e0bf3574a95ae23967a67621f8d769f47856d4",
  consumerSecret: "cs_3a02fadba2a1ae408349046349d113a615b05a98", 
  version: "wc/v3",
})
