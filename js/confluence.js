function atr(data){
    let sum=0;
    for(let i=1;i<data.length;i++){
        const tr = Math.max(
            data[i].high - data[i].low,
            Math.abs(data[i].high - data[i-1].close),
            Math.abs(data[i].low - data[i-1].close)
        );
        sum+=tr;
    }
    return sum/(data.length-1);
}

function wavePhase(data){
    const recent = data.slice(-5);
    const up = recent.every(c=>c.close > recent[0].close);
    const down = recent.every(c=>c.close < recent[0].close);
    if(up) return "impulse";
    if(down) return "impulse";
    return "correction";
}

function confluence(structure, wave, volatility){
    let score=0;

    if(structure==="bull") score+=30;
    if(structure==="bear") score+=30;

    if(wave==="impulse") score+=20;
    if(volatility>0.002) score+=20;

    if(score>100) score=100;
    return score;
}
