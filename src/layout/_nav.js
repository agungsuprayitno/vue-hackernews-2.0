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
      name: 'Product',
      url: '/product',
      icon: 'icon-puzzle',
      accessName: [access.GET_PRODUCT]
    },
    {
      name: 'Client',
      url: '/client',
      icon: 'icon-puzzle',
      accessName: [access.GET_CLIENT]
    },
    {
      name: 'Merchant',
      url: '/merchant',
      icon: 'icon-puzzle',
      accessName: [access.GET_MERCHANT]
    },
    {
      name: 'User',
      url: '/user',
      icon: 'icon-user',
      accessName: [access.GET_USER]
    },
    {
      name: 'Voucher',
      url: '/voucher-order',
      icon: 'icon-puzzle',
      accessName: [access.VOUCHER],
    },
    {
      name: 'Voucher',
      url: '/voucher-order',
      icon: 'icon-puzzle',
      accessName: [access.VOUCHER],
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      divider: true
    }
  ]
}
