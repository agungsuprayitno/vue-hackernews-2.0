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
      // accessName: [access.PRODUCT]
    },
    {
      name: 'Client',
      url: '/client',
      icon: 'icon-puzzle',
      // accessName: [access.CLIENT]
    },
    {
      name: 'Merchant',
      url: '/merchant',
      icon: 'icon-puzzle',
      // accessName: [access.MERCHANT]
    },
    {
      name: 'User',
      url: '/user',
      icon: 'icon-user',
      // accessName: [access.USER]
    },
    {
      name: 'Voucher',
      url: '/voucher-order',
      icon: 'icon-puzzle',
      // accessName: [access.VOUCHER],
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
