function detectStructure(data){
    if(data.length < 5) return "neutral";

    let highs=[], lows=[];
    data.slice(-20).forEach(c=>{
        highs.push(c.high);
        lows.push(c.low);
    });

    const hh = highs[highs.length-1] > highs[highs.length-2];
    const hl = lows[lows.length-1] > lows[lows.length-2];
    const lh = highs[highs.length-1] < highs[highs.length-2];
    const ll = lows[lows.length-1] < lows[lows.length-2];

    if(hh && hl) return "bull";
    if(lh && ll) return "bear";
    return "neutral";
}
