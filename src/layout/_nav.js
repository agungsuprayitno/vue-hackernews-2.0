import * as access from './access'

export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary'
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
      name: 'Voucher Order',
      url: '/voucher-order',
      icon: 'icon-puzzle',
      accessName: [access.GET_VOUCHER_ORDER],
      badge: {
        variant: 'primary'
      }
    },
    {
      divider: true
    }
  ]
}
