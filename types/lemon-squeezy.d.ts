interface SharedModuleOptions {
  apiKey: string
  page?: number
  include?: Array<keyof typeof LemonsqueezyDataType>
}
interface SharedLemonsqueezyOptions {
  apiVersion?: "v1"
  baseUrl?: string
}
declare enum LemonsqueezyDataType {
  checkouts = "checkouts",
  discounts = "discounts",
  files = "files",
  license_key_instances = "license-key-instances",
  license_keys = "license-keys",
  order_items = "order-items",
  orders = "orders",
  products = "products",
  stores = "stores",
  subscriptions = "subscriptions",
  subscription_invoices = "subscription-invoices",
  users = "users",
  variants = "variants",
}

declare enum LemonSqueezyWebhooksEvents {
  SubscriptionCreated = "subscription_created",
  SubscriptionUpdated = "subscription_updated",
}

interface BaseLemonsqueezyResponse<
  TData,
  TLinks = {
    self: string
  }
> {
  data: TData
  errors?: Array<{
    detail: string
    status: string | number
    title: string
  }>
  jsonapi: {
    version: string
  }
  links: TLinks
}
interface PaginatedBaseLemonsqueezyResponse<
  TData,
  TLinks = {
    first: string
    last: string
  }
> extends BaseLemonsqueezyResponse<TData, TLinks> {
  meta: {
    page: {
      currentPage: number
      from: number
      lastPage: number
      perPage: number
      to: number
      total: number
    }
  }
}

interface LemonsqueezyBillingAddress {
  /**
   * A pre-filled billing address country in a ISO 3166-1 alpha-2 format
   *
   * @see https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   */
  country: string
  /**
   * A pre-filled billing address zip/postal code
   */
  zip: string
}
interface LemonsqueezyCheckoutData {
  billing_address: LemonsqueezyBillingAddress
  /**
   * An object containing any custom data to be passed to the checkout
   */
  custom?: Array<any>
  /**
   * A pre-filled discount code
   */
  discount_code?: string
  /**
   * A pre-filled email address
   */
  email: string
  /**
   * A pre-filled name
   */
  name: string
  /**
   * A pre-filled tax number
   */
  tax_number?: string
}
interface LemonsqueezyCheckoutOptions {
  /**
   * A custom hex color to use for the checkout button
   */
  button_color?: `#${string}`
  /**
   * If `true`, use the dark theme
   */
  dark?: boolean
  /**
   * If `false`, hide the product description
   */
  desc?: boolean
  /**
   * If `false`, hide the discount code field
   */
  discount?: boolean
  /**
   * If `true`, show the checkout overlay
   *
   * @docs https://docs.lemonsqueezy.com/help/checkout/checkout-overlay
   */
  embed?: boolean
  /**
   * If `false`, hide the store logo
   */
  logo?: boolean
  /**
   * If `false`, hide the product media
   */
  media?: boolean
}
interface LemonsqueezyCheckoutPreview {
  currency_rate: number
  currency: string
  discount_total_formatted: string
  discount_total_usd: number
  discount_total: number
  subtotal_formatted: string
  subtotal_usd: number
  subtotal: number
  tax_formatted: string
  tax_usd: number
  tax: number
  total_formatted: string
  total_usd: number
  total: number
}
interface LemonsqueezyProductOptions {
  /**
   * A custom description for the product
   */
  description: string
  /**
   * An array of variant IDs to enable for this checkout. If this is empty, all variants will be enabled
   */
  enabled_variants?: Array<string>
  /**
   * An array of image URLs to use as the product's media
   */
  media?: Array<string>
  /**
   * A custom name for the product
   */
  name: string
  /**
   * A custom text to use for the order receipt email button
   */
  receipt_button_text: string
  /**
   * A custom URL to use for the order receipt email button
   */
  receipt_link_url: string
  /**
   * A custom thank you note to use for the order receipt email
   */
  receipt_thank_you_note: string
  /**
   * A custom URL to redirect to after a successful purchase
   */
  redirect_url: string
}
/**
 * @docs https://docs.lemonsqueezy.com/api/checkouts#the-checkout-object
 */
interface LemonsqueezyCheckout {
  attributes: {
    /**
     * An object containing any prefill or custom data to be used in the checkout
     *
     * @docs https://docs.lemonsqueezy.com/help/checkout/prefilling-checkout-fields
     * @docs https://docs.lemonsqueezy.com/help/checkout/passing-custom-data
     */
    checkout_data: LemonsqueezyCheckoutData
    /**
     * An object containing checkout options for this checkout
     */
    checkout_options: LemonsqueezyCheckoutOptions
    /**
     * An ISO-8601 formatted date-time string indicating when the object was created
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    created_at: Date
    /**
     * If the value is not `null`, this represents a positive integer in cents representing the custom price of the variant
     */
    custom_price: number | null
    /**
     * An ISO-8601 formatted date-time string indicating when the checkout expires
     *
     * Can be `null` if the checkout is perpetual
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    expires_at: Date | null
    preview: LemonsqueezyCheckoutPreview
    /**
     * An object containing any overridden product options for this checkout
     */
    product_options: LemonsqueezyProductOptions
    /**
     * The ID of the store this checkout belongs to
     */
    store_id: number
    /**
     * A boolean indicating if the returned checkout object was created within test mode
     */
    test_mode: boolean
    /**
     * An ISO-8601 formatted date-time string indicating when the object was last updated
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    updated_at: Date
    /**
     * The unique URL to access the checkout
     *
     * Note: for security reasons, download URLs are signed
     *
     * If the checkout `expires_at` is set, the URL will expire after the specified time
     */
    url: string
    /**
     * The ID of the variant associated with this checkout
     */
    variant_id: number
  }
  type: LemonsqueezyDataType.checkouts
  id: string
}
interface CreateCheckoutOptions extends SharedLemonsqueezyOptions {
  /**
   * An object containing any prefill or custom data to be used in the checkout
   *
   * @docs https://docs.lemonsqueezy.com/help/checkout/prefilling-checkout-fields
   * @docs https://docs.lemonsqueezy.com/help/checkout/passing-custom-data
   */
  checkout_data?: LemonsqueezyCheckoutData
  /**
   * An object containing checkout options for this checkout
   */
  checkout_options?: LemonsqueezyCheckoutOptions
  /**
   * A positive integer in cents representing the custom price of the variant.
   *
   * Note: If the product purchased is a subscription, this custom price is used
   * for all renewal payments. If the subscription's variant changes in the
   * future (i.e. the customer is moved to a different subscription "tier") the
   * new variant's price will be used from that moment forward.
   */
  custom_price: number
  /**
   * An ISO-8601 formatted date-time string indicating when the checkout expires
   *
   * Can be `null` if the checkout is perpetual
   *
   * @see https://en.wikipedia.org/wiki/ISO_8601
   */
  expires_at?: Date | null
  /**
   * A boolean indicating whether to return a preview of the checkout.
   *
   * If `true`, the checkout will include a `preview` object with the checkout preview data.
   */
  preview?: boolean
  /**
   * An object containing any overridden product options for this checkout.
   */
  product_options?: LemonsqueezyProductOptions
  /**
   * The ID of the store this checkout belongs to.
   */
  store: string
  /**
   * The ID of the variant associated with this checkout.
   *
   * Note: by default, all variants of the related product will be shown in the checkout, with
   * your selected variant highlighted. If you want hide to other variants, you can utilise
   * the `product_options.enabled_variants` option to determine which variant(s) are
   * displayed in the checkout.
   */
  variant: string
}
export type CreateCheckoutResult =
  BaseLemonsqueezyResponse<LemonsqueezyCheckout>
interface ListAllCheckoutsOptions extends SharedLemonsqueezyOptions {
  /**
   * Only return checkouts belonging to the store with this ID
   */
  storeId?: string
  /**
   * Only return checkouts belonging to the variant with this ID
   */
  variantId?: string
}
type ListAllCheckoutsResult = PaginatedBaseLemonsqueezyResponse<
  Array<LemonsqueezyCheckout>
>
interface RetrieveCheckoutOptions extends SharedLemonsqueezyOptions {
  id: string
}
type RetrieveCheckoutResult = BaseLemonsqueezyResponse<LemonsqueezyCheckout>

/**
 * @docs https://docs.lemonsqueezy.com/api/discounts#the-discount-object
 */
interface LemonsqueezyDiscount {
  attributes: {
    /**
     * The type of the amount. Either `percent` or `fixed`
     */
    amount_type: "percent" | "fixed"
    /**
     * The amount of discount to apply to the order
     *
     * Either a fixed amount or a percentage depending on the value of `amount_type`
     */
    amount: number
    /**
     * The discount code that can be used at checkout
     */
    code: string
    /**
     * An ISO-8601 formatted date-time string indicating when the object was created
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    created_at: Date
    /**
     * If `duration` is `repeating`, this specifies how many months the discount should apply
     */
    duration_in_months: number
    /**
     * If the discount is applied to a subscription, this specifies how often the discount should be applied.
     *
     * One of `once`, `repeating`, `forever`
     */
    duration: "once" | "repeating" | "forever"
    /**
     * An ISO-8601 formatted date-time string indicating when the discount expires
     *
     * Can be `null` if no expiration date is specified
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    expires_at: Date | null
    /**
     * Has the value `true` if the discount can only be redeemed a limited number of times
     */
    is_limited_redemptions: boolean
    /**
     * Has the value `true` if the discount can only be applied to certain products/variants
     */
    is_limited_to_products: boolean
    /**
     * If `is_limited_redemptions` is `true`, this is the maximum number of redemptions
     */
    max_redemptions: number
    /**
     * The name of the discount
     */
    name: string
    /**
     * An ISO-8601 formatted date-time string indicating when the discount is valid from
     *
     * Can be `null` if no start date is specified
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    starts_at: Date | null
    /**
     * The formatted status of the discount
     */
    status_formatted: string
    /**
     * The status of the discount. Either `draft` or `published`
     */
    status: "draft" | "published"
    /**
     * The ID of the store this discount belongs to
     */
    store_id: number
    /**
     * An ISO-8601 formatted date-time string indicating when the object was last updated
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    updated_at: Date
  }
  type: LemonsqueezyDataType.discounts
  id: string
}
interface ListAllDiscountsOptions extends SharedLemonsqueezyOptions {
  /**
   * Only return discounts belonging to the store with this ID
   */
  storeId?: number
}
type ListAllDiscountsResult = PaginatedBaseLemonsqueezyResponse<
  Array<LemonsqueezyDiscount>
>
interface RetrieveDiscountOptions extends SharedLemonsqueezyOptions {
  id: string
}
type RetrieveDiscountResult = BaseLemonsqueezyResponse<LemonsqueezyDiscount>

/**
 * @docs https://docs.lemonsqueezy.com/api/files#the-file-object
 */
interface LemonsqueezyFile {
  attributes: {
    /**
     * An ISO-8601 formatted date-time string indicating when the object was created
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    createdAt: Date
    /**
     * The unique URL to download the file. Note: for security reasons, download URLs are signed, expire after 1 hour and are rate-limited to 10 downloads per day per IP address
     */
    download_url: string
    /**
     * The file extension of the file (e.g. `pdf`)
     */
    extension: string
    /**
     * The unique identifier (UUID) for this file
     */
    identifier: string
    /**
     * The name of the file (e.g. `example.pdf`)
     */
    name: string
    /**
     * The human-readable size of the file (e.g. `5.5 MB`)
     */
    size_formatted: string
    /**
     * A positive integer in bytes representing the size of the file
     */
    size: number
    /**
     * An integer representing the order of this file when displayed
     */
    sort: number
    /**
     * The status of the file. Either `draft` or `published`
     */
    status: "draft" | "published"
    /**
     * An ISO-8601 formatted date-time string indicating when the object was last updated
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    updatedAt: Date
    /**
     * The ID of the variant this file belongs to
     */
    variant_id: number
    /**
     * The software version of this file (if one exists, e.g. `1.0.0`)
     */
    version: string
  }
  type: LemonsqueezyDataType.files
  id: string
}
interface ListAllFilesOptions extends SharedLemonsqueezyOptions {
  /**
   * Only return files belonging to the variant with this ID
   */
  variantId?: string
}
type ListAllFilesResult = PaginatedBaseLemonsqueezyResponse<
  Array<LemonsqueezyFile>
>
interface RetrieveFileOptions extends SharedLemonsqueezyOptions {
  id: string
}
type RetrieveFileResult = BaseLemonsqueezyResponse<LemonsqueezyFile>

/**
 * @docs https://docs.lemonsqueezy.com/api/license-keys#the-license-key-object
 */
interface LemonsqueezyLicenseKey {
  attributes: {
    /**
     * The activation limit of this license key
     */
    activation_limit: number
    /**
     * An ISO-8601 formatted date-time string indicating when the object was created
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    created_at: Date
    /**
     * Has the value `true` if this license key has been disabled
     */
    disabled: number
    /**
     * An ISO-8601 formatted date-time string indicating when the license key expires
     *
     * Can be null if the license key is perpetual
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    expires_at: Date | null
    /**
     * A count of the number of instances this license key has been activated on
     */
    instances_count: number
    /**
     * A “short” representation of the license key, made up of the string “XXXX-” followed by the last 12 characters of the license key
     */
    key_short: string
    /**
     * The ID of the order associated with this license key
     */
    order_id: number
    /**
     * The ID of the order item associated with this license key
     */
    order_item_id: number
    /**
     * The ID of the product associated with this license key
     */
    product_id: number
    /**
     * The formatted status of the license key
     */
    status_formatted: string
    /**
     * The status of the license key
     *
     * One of `inactive`, `active`, `expired`, `disabled`
     */
    status: "inactive" | "active" | "expired" | "disabled"
    /**
     * The ID of the store this license key belongs to
     */
    store_id: number
    /**
     * An ISO-8601 formatted date-time string indicating when the object was last updated
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    updated_at: Date
    /**
     * The email address of the customer
     */
    user_email: string
    /**
     * The full name of the customer
     */
    user_name: string
  }
  type: LemonsqueezyDataType.license_keys
  id: string
}
interface ListAllLicenseKeysOptions extends SharedLemonsqueezyOptions {
  /**
   * Only return license keys belonging to the order with this ID
   */
  orderId?: string
  /**
   * Only return license keys belonging to the order item with this ID
   */
  orderItemId?: string
  /**
   * Only return license keys belonging to the product with this ID
   */
  productId?: string
  /**
   * Only return license keys belonging to the store with this ID
   */
  storeId?: string
}
type ListAllLicenseKeysResult = PaginatedBaseLemonsqueezyResponse<
  Array<LemonsqueezyLicenseKey>
>
interface RetrieveLicenseKeyOptions extends SharedLemonsqueezyOptions {
  id: string
}
type RetrieveLicenseKeyResult = BaseLemonsqueezyResponse<LemonsqueezyLicenseKey>

/**
 * @docs https://docs.lemonsqueezy.com/api/license-key-instances#the-license-key-instance-object
 */
interface LemonsqueezyLicenseKeyInstance {
  attributes: {
    /**
     * An ISO-8601 formatted date-time string indicating when the object was created
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    created_at: Date
    /**
     * The unique identifier (UUID) for this instance
     *
     * This is the `instance_id` returned when activating a license key
     *
     * @docs https://docs.lemonsqueezy.com/help/licensing/license-api#post-v1-licenses-activate
     */
    identifier: string
    /**
     * The ID of the license key this instance belongs to
     */
    license_key_id: number
    /**
     * The name of the license key instance
     */
    name: string
    /**
     * An ISO-8601 formatted date-time string indicating when the object was last updated
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    updated_at: Date
  }
  type: LemonsqueezyDataType.license_key_instances
  id: string
}
interface ListAllLicenseKeyInstancesOptions extends SharedLemonsqueezyOptions {
  /**
   * Only return instances belonging to the license key with this ID
   */
  licenseKeyId?: string
}
type ListAllLicenseKeyInstancesResult = PaginatedBaseLemonsqueezyResponse<
  Array<LemonsqueezyLicenseKeyInstance>
>
interface RetrieveLicenseKeyInstanceOptions extends SharedLemonsqueezyOptions {
  id: string
}
type RetrieveLicenseKeyInstanceResult =
  BaseLemonsqueezyResponse<LemonsqueezyLicenseKeyInstance>

/**
 * @docs https://docs.lemonsqueezy.com/api/orders#the-order-object
 */
interface LemonsqueezyOrder {
  attributes: {
    /**
     * An ISO-8601 formatted date-time string indicating when the object was created
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    created_at: Date
    /**
     * If the order currency is USD, this will always be `1.0`.
     *
     * Otherwise, this is the currency conversion rate used to determine the cost of the order in USD at the time of purchase
     */
    currency_rate: string
    /**
     * The ISO 4217 currency code for the order (e.g. `USD`, `GBP`, etc)
     *
     * @see https://en.wikipedia.org/wiki/ISO_4217
     */
    currency: string
    /**
     * A positive integer in cents representing the total discount value applied to the order in USD
     */
    discount_total_usd: number
    /**
     * A positive integer in cents representing the total discount value applied to the order in the order currency
     */
    discount_total: number
    /**
     * The unique identifier (UUID) for this order
     */
    identifier: string
    /**
     * An integer representing the sequential order number for this store
     */
    order_number: number
    /**
     * If the order has been refunded, this will be an ISO-8601 formatted date-time string indicating when the order was refunded
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    refunded_at: Date | null
    /**
     * Has the value true if the order has been refunded
     */
    refunded: number
    /**
     * The formatted status of the order
     */
    status_formatted: string
    /**
     * The status of the order. One of `pending`, `failed`, `paid`, `refunded`
     */
    status: "pending" | "failed" | "paid" | "refunded"
    /**
     * The ID of the store this order belongs to
     */
    store_id: number
    /**
     * A positive integer in cents representing the subtotal of the order in USD
     */
    subtotal_usd: number
    /**
     * A positive integer in cents representing the subtotal of the order in the order currency
     */
    subtotal: number
    /**
     * If tax is applied to the order, this will be the name of the tax rate (e.g. `VAT`, `Sales Tax`, etc)
     */
    tax_name: string
    /**
     * If tax is applied to the order, this will be the rate of tax as a decimal percentage
     */
    tax_rate: string
    /**
     * A positive integer in cents representing the tax applied to the order in USD
     */
    tax_usd: number
    /**
     * A positive integer in cents representing the tax applied to the order in the order currency
     */
    tax: number
    /**
     * A positive integer in cents representing the total cost of the order in USD
     */
    total_usd: number
    /**
     * A positive integer in cents representing the total cost of the order in the order currency
     */
    total: number
    /**
     * An ISO-8601 formatted date-time string indicating when the object was last updated
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    updated_at: Date
    /**
     * The email address of the customer
     */
    user_email: string
    /**
     * The full name of the customer
     */
    user_name: string
  }
  type: LemonsqueezyDataType.orders
  id: string
}
interface ListAllOrdersOptions extends SharedLemonsqueezyOptions {
  /**
   * Only return orders belonging to the store with this ID
   */
  storeId?: string
  /**
   * Only return orders where the `user_email` field is equal to this email address
   */
  userEmail?: string
}
type ListAllOrdersResult = PaginatedBaseLemonsqueezyResponse<
  Array<LemonsqueezyOrder>
>
interface RetrieveOrderOptions extends SharedLemonsqueezyOptions {
  id: string
}
type RetrieveOrderResult = BaseLemonsqueezyResponse<LemonsqueezyOrder>

/**
 * @docs https://docs.lemonsqueezy.com/api/order-items#the-order-item-object
 */
interface LemonsqueezyOrderItem {
  attributes: {
    /**
     * An ISO-8601 formatted date-time string indicating when the object was created
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    created_at: Date
    /**
     * The ID of the order this order item belongs to
     */
    order_id: number
    /**
     * A positive integer in cents representing the price of this order item (in the order currency)
     *
     * Note, for “pay what you want” products the price will be whatever the customer entered at checkout
     */
    price: number
    /**
     * The ID of the product associated with this order item
     */
    product_id: number
    /**
     * The name of the product
     */
    product_name: string
    /**
     * An ISO-8601 formatted date-time string indicating when the object was last updated
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    updated_at: Date
    /**
     * The ID of the variant associated with this order item
     */
    variant_id: number
    /**
     * The name of the variant
     */
    variant_name: string
  }
  type: LemonsqueezyDataType.order_items
  id: string
}
interface ListAllOrderItemsOptions extends SharedLemonsqueezyOptions {
  /**
   * Only return order items belonging to the order with this ID
   */
  orderId?: string
  /**
   * Only return order items belonging to the product with this ID
   */
  productId?: string
  /**
   * Only return order items belonging to the variant with this ID
   */
  variantId?: string
}
type ListAllOrderItemsResult = PaginatedBaseLemonsqueezyResponse<
  Array<LemonsqueezyOrderItem>
>
interface RetrieveOrderItemOptions extends SharedLemonsqueezyOptions {
  id: string
}
type RetrieveOrderItemResult = BaseLemonsqueezyResponse<LemonsqueezyOrderItem>

/**
 * @docs https://docs.lemonsqueezy.com/api/products#the-product-object
 */
interface LemonsqueezyProduct {
  attributes: {
    /**
     * A URL to purchase this product using the Lemon Squeezy checkout
     */
    buy_now_url: string
    /**
     * An ISO-8601 formatted date-time string indicating when the object was created
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    created_at: Date
    /**
     * The description of the product in HTML
     */
    description: string
    /**
     * If this product has multiple variants, this will be a positive integer in cents representing the price of the cheapest variant.
     *
     * Otherwise, it will be `null`
     */
    from_price: null
    /**
     * A URL to the large thumbnail image for this product (if one exists).
     *
     * The image will be 1000x1000px in size
     */
    large_thumb_url: string
    /**
     * The name of the product
     */
    name: string
    /**
     * Has the value true if this is a “pay what you want” product where the price can be set by the customer at checkout
     */
    pay_what_you_want: false
    /**
     * A human-readable string representing the price of the product (e.g. `$9.99`)
     */
    price_formatted: string
    /**
     * A positive integer in cents representing the price of the product
     */
    price: number
    /**
     * The slug used to identify the product
     */
    slug: string
    /**
     * The formatted status of the product
     */
    status_formatted: string
    /**
     * The status of the product. Either `draft` or `published`
     */
    status: "draft" | "published"
    /**
     * The ID of the store this product belongs to
     */
    store_id: number
    /**
     * A URL to the thumbnail image for this product (if one exists).
     *
     * The image will be 100x100px in size
     */
    thumb_url: string
    /**
     * If this product has multiple variants, this will be a positive integer in cents representing the price of the most expensive variant.
     *
     * Otherwise, it will be `null`
     */
    to_price: null
    /**
     * An ISO-8601 formatted date-time string indicating when the object was last updated
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    updated_at: Date
  }
  type: LemonsqueezyDataType.products
  id: string
}
interface ListAllProductsOptions extends SharedLemonsqueezyOptions {
  /**
   * Only return products belonging to the store with this ID
   */
  storeId?: string
}
type ListAllProductsResult = PaginatedBaseLemonsqueezyResponse<
  Array<LemonsqueezyProduct>
>
interface RetrieveProductOptions extends SharedLemonsqueezyOptions {
  id: string
}
type RetrieveProductResult = BaseLemonsqueezyResponse<LemonsqueezyProduct>

/**
 * @docs https://docs.lemonsqueezy.com/api/stores#the-store-object
 */
interface LemonsqueezyStore {
  attributes: {
    /**
     * The URL for the store avatar
     */
    avatar_url: string
    /**
     * The full country name for the store (e.g. `United States`, `United Kingdom`, etc)
     */
    country_nicename: string
    /**
     * The ISO 3166-1 two-letter country code for the store (e.g. `US`, `GB`, etc)
     *
     * @see https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
     */
    country: string
    /**
     * An ISO-8601 formatted date-time string indicating when the object was created
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    created_at: Date
    /**
     * The ISO 4217 currency code for the store (e.g. `USD`, `GBP`, etc)
     *
     * @see https://en.wikipedia.org/wiki/ISO_4217
     */
    currency: string
    /**
     * The domain of the store in the format `{slug}.lemonsqueezy.com`
     */
    domain: string
    /**
     * The name of the store
     */
    name: string
    /**
     * The current billing plan for the store (e.g. `fresh`, `sweet`)
     */
    plan: string
    /**
     * The slug used to identify the store
     */
    slug: string
    /**
     * A positive integer in cents representing the total revenue of the store in USD in the last 30 days
     */
    thirty_day_revenue: number
    /**
     * A count of the sales made by this store in the last 30 days
     */
    thirty_day_sales: number
    /**
     * A positive integer in cents representing the total all-time revenue of the store in USD
     */
    total_revenue: number
    /**
     * A count of the all-time total sales made by this store
     */
    total_sales: number
    /**
     * An ISO-8601 formatted date-time string indicating when the object was last updated
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    updated_at: Date
    /**
     * The fully-qualified URL for the store (e.g. `https://{slug}.lemonsqueezy.com)`
     */
    url: string
  }
  id: string
  type: LemonsqueezyDataType.stores
}
interface ListAllStoresOptions extends SharedLemonsqueezyOptions {}
type ListAllStoresResult = PaginatedBaseLemonsqueezyResponse<
  Array<LemonsqueezyStore>
>
interface RetrieveStoreOptions extends SharedLemonsqueezyOptions {
  id: string
}
type RetrieveStoreResult = BaseLemonsqueezyResponse<LemonsqueezyStore>

interface LemonsqueezySubscriptionPause {
  /**
   * Defines payment pause behaviour, can be one of:
   *
   *  - `void` - If you can't offer your services for a period of time (for maintenance as an example), you can void invoices so your customers aren't charged
   *  - `free` - Offer your subscription services for free, whilst halting payment collection
   */
  mode: "void" | "free"
  /**
   * An ISO-8601 formatted date-time string indicating when the subscription will continue collecting payments
   *
   * @see https://en.wikipedia.org/wiki/ISO_8601
   */
  resumes_at: Date
}
/**
 * @docs https://docs.lemonsqueezy.com/api/subscriptions#the-subscription-object
 */
interface LemonsqueezySubscription {
  attributes: {
    /**
     * An integer representing a day of the month (`21` equals `21st day of the month`)
     *
     * This is the day of which subscription invoice payments are collected
     */
    billing_anchor: number
    /**
     * A boolean indicating if the subscription has been cancelled
     */
    cancelled: boolean
    /**
     * An ISO-8601 formatted date-time string indicating when the object was created
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    created_at: Date
    /**
     * If the subscription has been cancelled, this will be an ISO-8601 formatted date-time string indicating when the subscription expires
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    ends_at: Date | null
    /**
     * The ID of the order associated with this subscription
     */
    order_id: number
    /**
     * The ID of the order item associated with this subscription
     */
    order_item_id: number
    /**
     * An object containing the payment collection pause behaviour options for the subscription, if set
     *
     * The pause object can be null, which indicates payment collection is not paused
     */
    pause: LemonsqueezySubscriptionPause | null
    /**
     * The ID of the product associated with this subscription
     */
    product_id: number
    /**
     * The name of the product
     */
    product_name: string
    /**
     * An ISO-8601 formatted date-time string indicating the end of the current billing cycle, and when the next invoice will be issued
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    renews_at: Date
    /**
     * The formatted status of the subscription
     */
    status_formatted: string
    /**
     * The status of the subscription
     *
     * One of `on_trial`, `active`, `cancelled`, `expired`
     */
    status: "on_trial" | "active" | "cancelled" | "expired"
    /**
     * The ID of the store this subscription belongs to
     */
    store_id: number
    /**
     * A boolean indicating if the returned subscription object was created within test mode
     */
    test_mode: boolean
    /**
     * If the subscription has a free trial, this will be an ISO-8601 formatted date-time string indicating when the trial period ends
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    trial_ends_at: Date | null
    /**
     * An ISO-8601 formatted date-time string indicating when the object was last updated
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    updated_at: Date
    /**
     * An object of customer-facing URLs for managing the subscription
     */
    urls: {
      /**
       * A pre-signed URL for managing payment and billing information for the subscription
       *
       * This can be used in conjunction with Lemon.js to allow your customer to change their billing information from within your application
       *
       * The URL is valid for 24 hours from time of request
       *
       * @docs https://docs.lemonsqueezy.com/help/lemonjs/what-is-lemonjs
       */
      update_payment_method: string
    }
    /**
     * The email address of the customer
     */
    user_email: string
    /**
     * The full name of the customer
     */
    user_name: string
    /**
     * The ID of the variant associated with this subscription
     */
    variant_id: number
    /**
     * The name of the variant
     */
    variant_name: string
  }
  type: LemonsqueezyDataType.subscriptions
  id: string
}
interface ListAllSubscriptionsOptions extends SharedLemonsqueezyOptions {
  /**
   * Only return subscriptions belonging to the order with this ID
   */
  orderId?: string
  /**
   * Only return subscriptions belonging to the order item with this ID
   */
  orderItemId?: string
  /**
   * Only return subscriptions belonging to the product with this ID
   */
  productId?: string
  /**
   * Only return subscriptions belonging to the store with this ID
   */
  storeId?: string
  /**
   * Only return subscriptions belonging to the variant with this ID
   */
  variantId?: string
}
type ListAllSubscriptionsResult = PaginatedBaseLemonsqueezyResponse<
  Array<LemonsqueezySubscription>
>
interface RetrieveSubscriptionOptions extends SharedLemonsqueezyOptions {
  id: string
}
type RetrieveSubscriptionResult =
  BaseLemonsqueezyResponse<LemonsqueezySubscription>
interface UpdateSubscriptionOptions extends SharedLemonsqueezyOptions {
  /**
   * An integer representing a day of the month (`21` equals `21st day of the month`).
   * This is the day of which subscription invoice payments are collected.
   *
   * Setting this value to a valid integer (1-31) will set the billing anchor to the next occurrence of that day.
   * For example, if on the 21st of January you set the subscription billing anchor to the 1st, the next occurrence of that day is February 1st.
   * All invoices from that point on will be generated on the 1st of the month
   *
   * When setting a new billing anchor day, we calculate the next occurrence and issue a paid, prorated trial which ends on the next occurrence date.
   * When the trial ends, the customer is charged for the full prorated amount
   */
  billingAnchor?: number
  /**
   * Set as `true` to cancel the subscription.
   *
   * You can uncancel (before the `ends_at` date) by setting to `false`
   */
  cancelled?: boolean
  id: string
  /**
   * An object containing the payment collection pause behaviour options for the subscription
   */
  pause?: LemonsqueezySubscriptionPause
  /**
   * The ID of the Product Object you want to switch this subscription to.
   *
   * If set, requires a Variant Object ID
   *
   * @docs https://docs.lemonsqueezy.com/api/products
   * @docs https://docs.lemonsqueezy.com/api/variants
   */
  productId: string
  /**
   * The ID of the Variant Object you want to switch this subscription to.
   *
   * Required if `product_id` set
   *
   * @docs https://docs.lemonsqueezy.com/api/variants
   */
  variantId: string
}
type UpdateSubscriptionResult =
  BaseLemonsqueezyResponse<LemonsqueezySubscription>

/**
 * @docs https://docs.lemonsqueezy.com/api/users#the-user-object
 */
interface LemonsqueezyUser {
  attributes: {
    /**
     * A URL to the avatar image for this user. If the user has not uploaded a custom avatar, this will point to their Gravatar URL.
     */
    avatar_url: string
    /**
     * A randomly generated hex color code for the user. We use this internally as the background color of an avatar if the user has not uploaded a custom avatar.
     */
    color: string
    /**
     * An ISO-8601 formatted date-time string indicating when the object was created.
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    createdAt: Date
    /**
     * The email address of the user.
     */
    email: string
    /**
     * Has the value `true` if the user has uploaded a custom avatar image.
     */
    has_custom_avatar: boolean
    /**
     * The name of the user.
     */
    name: string
    /**
     * An ISO-8601 formatted date-time string indicating when the object was last updated.
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    updatedAt: Date
  }
  id: string
  links: {
    self: string
  }
  type: LemonsqueezyDataType.users
}
interface GetUserOptions extends SharedLemonsqueezyOptions {}
type GetUserResult = BaseLemonsqueezyResponse<LemonsqueezyUser>

type LemonsqueezyInterval = "day" | "week" | "month" | "year"
/**
 * @docs https://docs.lemonsqueezy.com/api/variants#the-variant-object
 */
interface LemonsqueezyVariant {
  attributes: {
    /**
     * An ISO-8601 formatted date-time string indicating when the object was created
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    created_at: Date
    /**
     * The description of the variant in HTML
     */
    description: string
    /**
     * Has the value `true` if this variant has a free trial period
     *
     * Only available if the variant is a subscription
     */
    has_free_trial: boolean
    /**
     * Has the value `true` if this variant should generate license keys for the customer on purchase
     */
    has_license_keys: boolean
    /**
     * If this variant is a subscription, this is the number of intervals (specified in the `interval` attribute) between subscription billings
     *
     * For example, `interval=month` and `interval_count=3` bills every 3 months
     */
    interval_count: number | null
    /**
     * If this variant is a subscription, this is the frequency at which a subscription is billed
     *
     * One of `day`, `week`, `month` or `year`
     */
    interval: LemonsqueezyInterval | null
    /**
     * Has the value `true` if license keys should never expire
     *
     * Note: If the variant is a subscription, the license key expiration will be linked to the status of the subscription (e.g. the license will expire when the subscription expires)
     */
    is_license_length_unlimited: boolean
    /**
     * Has the value `true` if license key activations are unlimited for this variant
     */
    is_license_limit_unlimited: boolean
    /**
     * Has the value `true` if this variant is a subscription
     */
    is_subscription: boolean
    /**
     * The maximum number of times a license key can be activated for this variant
     */
    license_activation_limit: number
    /**
     * The unit linked with the `license_length_value` attribute. One of `days`, `months` or `years`
     *
     * For example, `license_length_value=3` and `license_length_unit=months` license keys will expire after 3 months
     */
    license_length_unit: string
    /**
     * The number of units (specified in the `license_length_unit` attribute) until a license key expires
     */
    license_length_value: number
    /**
     * If `pay_what_you_want` is `true`, this is the minimum price this variant can be purchased for, as a positive integer in cents
     */
    min_price: number
    /**
     * The name of the variant
     */
    name: string
    /**
     * Has the value `true` if this is a “pay what you want” variant where the price can be set by the customer at checkout
     */
    pay_what_you_want: false
    /**
     * A positive integer in cents representing the price of the variant
     */
    price: number
    /**
     * The ID of the product this variant belongs to
     */
    product_id: number
    /**
     * The slug used to identify the variant
     */
    slug: string
    /**
     * An integer representing the order of this variant when displayed on the checkout
     */
    sort: number
    /**
     * The formatted status of the variant
     */
    status_formatted: string
    /**
     * The status of the variant
     *
     * Either `pending`, `draft` or `published`
     *
     * If a variant has a `pending` status, it is considered the “default” variant and is not shown as a separate option at checkout
     */
    status: "pending" | "draft" | "published"
    /**
     * If `pay_what_you_want` is `true`, this is the suggested price for this variant shown at checkout, as a positive integer in cents
     */
    suggested_price: number
    /**
     * If interval count of the free trial.
     *
     * For example, a variant with `trial_interval=day` and `trial_interval_count=14` would have a free trial that lasts 14 days
     */
    trial_interval_count: number
    /**
     * The interval unit of the free trial
     *
     * One of `day`, `week`, `month` or `year`
     */
    trial_interval: string
    /**
     * An ISO-8601 formatted date-time string indicating when the object was last updated
     *
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    updated_at: Date
  }
  type: LemonsqueezyDataType.variants
  id: string
}
interface ListAllVariantsOptions extends SharedLemonsqueezyOptions {
  /**
   * Only return variants belonging to the product with this ID
   */
  productId?: string
}
type ListAllVariantsResult = PaginatedBaseLemonsqueezyResponse<
  Array<LemonsqueezyVariant>
>
interface RetrieveVariantOptions extends SharedLemonsqueezyOptions {
  id: string
}
type RetrieveVariantResult = BaseLemonsqueezyResponse<LemonsqueezyVariant>

interface SubscriptionWebhookResponse {
  data: {
    id: string
    type: string
    links: {
      self: string
    }
    attributes: {
      urls: {
        update_payment_method: string
      }
      pause: null | any // Change `any` to the appropriate type if available
      status: string
      ends_at: null | string
      order_id: number
      store_id: number
      cancelled: boolean
      renews_at: string
      test_mode: boolean
      user_name: string
      card_brand: null | string
      created_at: string
      product_id: number
      updated_at: string
      user_email: string
      variant_id: number
      customer_id: number
      product_name: string
      variant_name: string
      order_item_id: number
      trial_ends_at: string
      billing_anchor: number
      card_last_four: null | string
      status_formatted: string
    }
    relationships: {
      order: {
        links: {
          self: string
          related: string
        }
      }
      store: {
        links: {
          self: string
          related: string
        }
      }
      product: {
        links: {
          self: string
          related: string
        }
      }
      variant: {
        links: {
          self: string
          related: string
        }
      }
      customer: {
        links: {
          self: string
          related: string
        }
      }
      "order-item": {
        links: {
          self: string
          related: string
        }
      }
      "subscription-invoices": {
        links: {
          self: string
          related: string
        }
      }
    }
  }
  meta: {
    test_mode: boolean
    event_name: string
    custom_data: {
      user_id: string
    }
  }
}

export {
  BaseLemonsqueezyResponse,
  CreateCheckoutOptions,
  CreateCheckoutResult,
  GetUserOptions,
  GetUserResult,
  LemonSqueezyWebhooksEvents,
  LemonsqueezyBillingAddress,
  LemonsqueezyCheckout,
  LemonsqueezyCheckoutData,
  LemonsqueezyCheckoutOptions,
  LemonsqueezyDataType,
  LemonsqueezyDiscount,
  LemonsqueezyFile,
  LemonsqueezyInterval,
  LemonsqueezyLicenseKey,
  LemonsqueezyLicenseKeyInstance,
  LemonsqueezyOrder,
  LemonsqueezyOrderItem,
  LemonsqueezyProduct,
  LemonsqueezyProductOptions,
  LemonsqueezyStore,
  LemonsqueezySubscription,
  LemonsqueezyUser,
  LemonsqueezyVariant,
  ListAllCheckoutsOptions,
  ListAllCheckoutsResult,
  ListAllDiscountsOptions,
  ListAllDiscountsResult,
  ListAllFilesOptions,
  ListAllFilesResult,
  ListAllLicenseKeyInstancesOptions,
  ListAllLicenseKeyInstancesResult,
  ListAllLicenseKeysOptions,
  ListAllLicenseKeysResult,
  ListAllOrderItemsOptions,
  ListAllOrderItemsResult,
  ListAllOrdersOptions,
  ListAllOrdersResult,
  ListAllProductsOptions,
  ListAllProductsResult,
  ListAllStoresOptions,
  ListAllStoresResult,
  ListAllSubscriptionsOptions,
  ListAllSubscriptionsResult,
  ListAllVariantsOptions,
  ListAllVariantsResult,
  PaginatedBaseLemonsqueezyResponse,
  RetrieveCheckoutOptions,
  RetrieveCheckoutResult,
  RetrieveDiscountOptions,
  RetrieveDiscountResult,
  RetrieveFileOptions,
  RetrieveFileResult,
  RetrieveLicenseKeyInstanceOptions,
  RetrieveLicenseKeyInstanceResult,
  RetrieveLicenseKeyOptions,
  RetrieveLicenseKeyResult,
  RetrieveOrderItemOptions,
  RetrieveOrderItemResult,
  RetrieveOrderOptions,
  RetrieveOrderResult,
  RetrieveProductOptions,
  RetrieveProductResult,
  RetrieveStoreOptions,
  RetrieveStoreResult,
  RetrieveSubscriptionOptions,
  RetrieveSubscriptionResult,
  RetrieveVariantOptions,
  RetrieveVariantResult,
  SharedLemonsqueezyOptions,
  SharedModuleOptions,
  SubscriptionWebhookResponse,
  UpdateSubscriptionOptions,
  UpdateSubscriptionResult,
}
