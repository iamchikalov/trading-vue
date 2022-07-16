import parseCandle from "@/utils/utils"

export const candlesLevelsSocket = new WebSocket(
    (window.location.protocol === 'https:' ? 'wss://' : 'ws://')
    + "213.189.220.102:8000"
    + '/ws/charts/'
);
export const DensitiesSocket = new WebSocket(
    (window.location.protocol === 'https:' ? 'wss://' : 'ws://')
    + "213.189.220.102:8000"
    + '/ws/densitys/'
);

export function getCandlesLevels(event, vm, coin = 'BTC', timeframe = '5m') {
    const data = JSON.parse(event.data)
    console.log(data)

    const candlesArr = vm.ohlcv ? vm.ohlcv : []
    const candles = data.candle_sticks_lvl[coin][timeframe].candle_sticks
    console.log('data.candle_sticks_lvl', data.candle_sticks_lvl)
    const levels = JSON.parse(JSON.stringify(data.candle_sticks_lvl[coin][timeframe].levels))
    const coinsArr = Object.entries(data.candle_sticks_lvl).map(([key]) => key)

    if (!candlesArr.length) {
        candles.forEach((l) => {
            let a = parseCandle(l)
            candlesArr.push(a)
        })
    } else {
        if (parseInt(candles[candles.length - 1][6]) !== candlesArr[candlesArr.length - 1][0]) {
            let a = parseCandle(candles[candles.length - 1])
            candlesArr.push(a)
        } else {
            candlesArr[candlesArr.length - 1][1] = parseFloat(candles[candles.length - 1][1])
            candlesArr[candlesArr.length - 1][2] = parseFloat(candles[candles.length - 1][2])
            candlesArr[candlesArr.length - 1][3] = parseFloat(candles[candles.length - 1][3])
            candlesArr[candlesArr.length - 1][4] = parseFloat(candles[candles.length - 1][4])
        }
    }
    vm.ohlcv = candlesArr
    vm.array = coinsArr

    const levels_settings = levels.map((level) => ({
        y: [level],
        color: '#0bf5f5',
        label: [String(level)],
        dotted: true
    }))
    if (vm.onchart && vm.onchart.length > 0)
        vm.onchart[0].settings = [vm.onchart[0].settings[0], vm.onchart[0].settings[1], ...levels_settings]
}

export function getDensities( event, vm, coin) {
    const data = JSON.parse(event.data)

    const density_up = []
    const density_low = []
    const density_label_up = []
    const density_label_low = []

    density_up[0] = data.densitys[coin].ask[0]
    density_low[0] = data.densitys[coin].bid[0]
    density_label_up[0] = String(density_up[0])
    density_label_low[0] = String(density_low[0])

    vm.onchart[0].settings[0].y = density_up
    vm.onchart[0].settings[1].y = density_low
    vm.onchart[0].settings[0].label = density_label_up
    vm.onchart[0].settings[1].label = density_label_low
}

