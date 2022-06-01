let charts = []
let chartsData = {
    'BTC': {
        'ohlcv': [],
        'ImpLineLower': [0],
        'ImpLineUpper': [0],
        'LowerLabel': [''],
        'UpperLabel': [''],
    },
    'ETH': {
        'ohlcv': [],
        'ImpLineLower': [0],
        'ImpLineUpper': [0],
        'LowerLabel': [''],
        'UpperLabel': [''],
    },
    'BCH': {
        'ohlcv': [],
        'ImpLineLower': [0],
        'ImpLineUpper': [0],
        'LowerLabel': [''],
        'UpperLabel': [''],
    },
}

function generateChart(data) {
    console.log(data)
    const [ImpLine] = [
        {
            name: "ImpLineUpper",
            type: "ImportantLevel",
            data: [],
            settings: {
                color_imp_level: "#00ff17",
                label_imp_level: data['UpperLabel'],
                imp_level: data['ImpLineUpper'],
            }
        },
        {
            name: "ImpLineLower",
            type: "ImportantLevel",
            data: [],
            settings: {
                color_imp_level: "#d70808",
                label_imp_level: data['LowerLabel'],
                imp_level: data['ImpLineLower'],
            }
        },
    ]
    return {
        chart: {
            type: 'Candles',
            data: data['ohlcv']
        },
        onchart: [ImpLine],
    };
}

function getCoinData(coin, event) {
    const data = JSON.parse(event.data)
    const candle_sticks_lvl = data.candle_sticks_lvl
    const candles = candle_sticks_lvl[coin]['5m'].candle_sticks
    const levels = candle_sticks_lvl[coin]['5m'].levels

    candles.forEach((l) => {
        const d = l

        const open = parseFloat(d[1])
        const high = parseFloat(d[2])
        const low = parseFloat(d[3])
        const close = parseFloat(d[4])

        if (isNaN(open)) {
            return
        }

        const date = parseInt(d[6])
        chartsData[coin]['ohlcv'].push([date, open, high, low, close])
    });

    let ImpLineLower = [levels[0]]
    let ImpLineUpper = [levels[levels.length - 1]]
    let LowerLabel = [String(ImpLineLower[0])]
    let UpperLabel = [String(ImpLineUpper[0])]

    chartsData[coin]['ImpLineLower'] = ImpLineLower
    chartsData[coin]['ImpLineUpper'] = ImpLineUpper
    chartsData[coin]['LowerLabel'] = LowerLabel
    chartsData[coin]['UpperLabel'] = UpperLabel
}


const socket1 = new WebSocket(
    (window.location.protocol === 'https:' ? 'wss://' : 'ws://')
    + "213.189.220.102:8000"
    + '/ws/charts/'
);

socket1.onmessage = function (event) {
    getCoinData('BTC', event)
    getCoinData('ETH', event)
    getCoinData('BCH', event)
}

charts.push(generateChart(chartsData['BTC']));
charts.push(generateChart(chartsData['ETH']));
charts.push(generateChart(chartsData['BCH']));

export default charts
