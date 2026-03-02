function confluenceEngine(structure, bos, liquidity, ob, fvg, atrVal){

    let score = 0;

    if(structure==="bull") score+=20;
    if(structure==="bear") score+=20;

    if(bos==="bull") score+=20;
    if(bos==="bear") score+=20;

    if(liquidity) score+=15;

    if(ob) score+=10;
    if(fvg) score+=10;

    if(atrVal>0.002) score+=10;

    if(score>100) score=100;
    return score;
}
