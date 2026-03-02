function detectBOS(data){
    const len = data.length;
    if(len < 10) return "none";

    const prevHigh = data[len-3].high;
    const prevLow  = data[len-3].low;
    const lastClose = data[len-1].close;

    if(lastClose > prevHigh) return "bull";
    if(lastClose < prevLow) return "bear";
    return "none";
}

function detectLiquiditySweep(data){
    const len = data.length;
    if(len < 5) return false;

    const last = data[len-1];
    const prev = data[len-2];

    if(last.high > prev.high && last.close < prev.high)
        return "buy_liquidity";

    if(last.low < prev.low && last.close > prev.low)
        return "sell_liquidity";

    return false;
}

function detectOrderBlock(data){
    const len = data.length;
    if(len < 6) return null;

    const last = data[len-1];
    const prev = data[len-2];

    if(last.close > prev.high){
        return {type:"bullish", level:prev.low};
    }

    if(last.close < prev.low){
        return {type:"bearish", level:prev.high};
    }

    return null;
}

function detectFVG(data){
    const len = data.length;
    if(len < 3) return null;

    const c1 = data[len-3];
    const c3 = data[len-1];

    if(c3.low > c1.high){
        return {type:"bullish", gap:c3.low - c1.high};
    }

    if(c3.high < c1.low){
        return {type:"bearish", gap:c1.low - c3.high};
    }

    return null;
}
