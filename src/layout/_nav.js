import * as access from './access'

export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'Products',
      wrapper: {
        element: 'span',
        attributes: {}
      },
      class: '',
      accessName: [access.PRODUCT_VOUCHER]
    },
    {
      name: 'Product',
      url: '/product',
      icon: 'icon-puzzle',
      accessName: [access.PRODUCT.PRODUCT_VOUCHER]
    },
    {
      divider: true
    }
  ]
}
