import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"

export const WooCommerce = new WooCommerceRestApi({
  url: "http://localhost/headless",
  consumerKey: "ck_26f5985f12a7236733fc77c8b9c867584f3630b7",
  consumerSecret: "cs_76e0b00d36daf3fed44a7bb2d5645fb1281bd2e4", 
  version: "wc/v3",
})
