const CACHE_TIME = 60000;

async function fetchOHLC(pair, tf){
    const key = `${pair}_${tf}`;
    const cached = localStorage.getItem(key);

    if(cached){
        const obj = JSON.parse(cached);
        if(Date.now() - obj.time < CACHE_TIME){
            return obj.data;
        }
    }

    const symbol = pair.replace("/","").toLowerCase();
    const url = `https://stooq.com/q/d/l/?s=${symbol}&i=${tf}`;

    const res = await fetch(url);
    const text = await res.text();

    const rows = text.split("\n").slice(1,-1);
    const data = rows.map(r=>{
        const p=r.split(",");
        return {
            open:parseFloat(p[1]),
            high:parseFloat(p[2]),
            low:parseFloat(p[3]),
            close:parseFloat(p[4])
        }
    });

    localStorage.setItem(key, JSON.stringify({time:Date.now(), data}));
    return data;
}
