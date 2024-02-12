fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ctether%2Cbinancecoin%2Cavalanche-2%2Caxie-infinity&vs_currencies=usd&include_24hr_change=true')
  .then(res => res.json())
  .then(json => {
    const container = document.querySelector('.container')
    const coins = Object.getOwnPropertyNames(json)

    const desiredOrder = ['bitcoin', 'ethereum', 'tether', 'binancecoin', 'avalanche-2', 'axie-infinity']

    const coinShortNames = {
      'bitcoin': 'BTC',
      'ethereum': 'ETH',
      'tether': 'USDT',
      'binancecoin': 'BNB',
      'avalanche-2': 'AVAX',
      'axie-infinity': 'AXS'
    }

    const coinDisplayNames = {
      'bitcoin': 'BITCOIN',
      'ethereum': 'ETHEREUM',
      'tether': 'TETHER',
      'binancecoin': 'BNB',
      'avalanche-2': 'AVALANCHE',
      'axie-infinity': 'AXIE INFINITY'
    }

    const sortedCoins = coins.sort((a, b) => {
      const aIndex = desiredOrder.indexOf(a)
      const bIndex = desiredOrder.indexOf(b)
      return aIndex - bIndex
    })

    for (let coin of sortedCoins) {
      const coinInfo = json[`${coin}`]
      const price = parseFloat(coinInfo.usd.toFixed(3))
      const priceChangePercent = parseFloat(coinInfo.usd_24h_change).toFixed(2);

      const coinShortName = coinShortNames[coin]
      const coinDisplayName = coinDisplayNames[coin]

      container.innerHTML += `
        <div class="coin ${priceChangePercent < 0 ? 'falling' : 'rising'}">
          <div class="coin-logo">
            <img src="Images/${coin}.png">
          </div>
          <div class="coin-name">
            <h3>${coinDisplayName}</h3>
            <span>/${coinShortName}</span>
          </div>
          <div class="coin-price">
            <span class="price">$${price}</span>
            <span class="change">${priceChangePercent}% /24h</span>
          </div>
        </div>
      `
    }
  })
