class Graph {
    constructor(id,data) {
        this.target = document.getElementById(id);
        this.graphData = data;

        this.poly = document.getElementById("polyStats");
        this.points = "";
        
        this.lineTraits = ["extravert","spont","aggres","rigid","introvers","senzitiv","trevozhn","labil"];
        this.fullLinesPoints = [["999.5","119.5"],["1621.75","377.25"],["1879.5","999.5"],["1621.75","1621.75"],
                                ["999.5","1879.5"],["377.25","1621.75"],["119.5","999.5"],["377.25","377.25"]];
        this.pointLinesPoints = []; 

        this.adjustLevels();
        this.buildPolygon();
        console.log(this.pointLinesPoints);
    }

    highlightSector(sectors, color) {
        var allSectors = this.target.getElementsByClassName("segment");
        if ( typeof color === 'string' && /^#([0-9A-F]{3}){1,2}$/i.test(color)) {
            if (Array.isArray(sectors)) {
                for (const sector in sectors) {
                    if (sectors[sector] >= 1 && sectors[sector] <= 8) {
                        allSectors[sectors[sector]-1].style.fill = color;
                        allSectors[sectors[sector]-1].setAttribute("fill-opacity", "0.5");
                    }
                    else {
                        console.log(sectors[sector], " is out of bounds")
                    }
                } 
            }
            else if (Number.isInteger(sectors) && sectors >= 1 && sectors <= 8) {
                allSectors[sectors-1].style.fill = color;
                allSectors[sectors-1].setAttribute("fill-opacity", "0.5");
            }
            else {
                console.log("invalid sector num")
            }
        }
        else {
            console.log("invalid color input")
        }
    }

    adjustLevels() {
        var aggr = this.target.getElementsByClassName("agro");
        var lie = this.target.getElementsByClassName("lie");

        if (this.graphData.agro > 0 && this.graphData.agro <= 9) {
            var aggrLevel = (this.graphData.agro * 89.11).toString();
            aggr[0].setAttribute("r", aggrLevel);

            aggr[0].setAttribute("stroke-width","6");

            var aggrDash = ((2 * Math.PI * aggrLevel)/60);
            aggr[0].setAttribute("stroke-dasharray", aggrDash.toString());

            var aggrOffset = aggrDash / 2 
            aggr[0].setAttribute("stroke-dashoffset", aggrOffset.toString());
        }
        else if (this.graphData.agro == 0) {
            aggr[0].setAttribute("r", "0");
        }

        if (this.graphData.lie > 0 && this.graphData.lie <= 9) {
            var lieLevel = (this.graphData.lie * 89.11).toString();
            lie[0].setAttribute("r", lieLevel);

            lie[0].setAttribute("stroke-width","6");

            var lieDash= ((2 * Math.PI * lieLevel)/60).toString();
            lie[0].setAttribute("stroke-dasharray", lieDash);

            var lieOffset = lieDash / 2 
            lie[0].setAttribute("stroke-dashoffset", lieOffset.toString());
        }
        else if (this.graphData.lie == 0) {
            lie[0].setAttribute("r", "0");
        }
    }

    highlight(trait) {
        if (typeof trait === 'string') {
            var cases = ["lie","agro","extravert","spont","aggres","rigid","introvers","senzitiv","trevozhn","labil"]
            if (cases.includes(trait)) {
                this.adjustLevels();
                switch (trait) {
                    case cases[0]:
                        var lieLevel = (this.graphData.lie * 89.11).toString();
                        this.target.getElementsByClassName(cases[0])[0].setAttribute("stroke-dasharray",(3 * Math.PI * lieLevel).toString());
                        this.target.getElementsByClassName(cases[0])[0].setAttribute("stroke-width","16");
                        break;
                    case cases[1]:
                        var aggrLevel = (this.graphData.agro * 89.11 ).toString();
                        this.target.getElementsByClassName(cases[1])[0].setAttribute("stroke-dasharray",(3 * Math.PI * aggrLevel).toString());
                        this.target.getElementsByClassName(cases[1])[0].setAttribute("stroke-width","16");
                        break;
                    /* ADD LINE HIGHLIGHT */
                    default:
                        document.getElementById("lineFull").setAttribute("stroke-width","20");
                        document.getElementById("lineFull").setAttribute("x2",this.fullLinesPoints[this.lineTraits.indexOf(trait)][0]);
                        document.getElementById("lineFull").setAttribute("y2",this.fullLinesPoints[this.lineTraits.indexOf(trait)][1]);

                        document.getElementById("linePoint").setAttribute("stroke-width","20");
                        document.getElementById("linePoint").setAttribute("x2",this.pointLinesPoints[this.lineTraits.indexOf(trait)][0]);
                        document.getElementById("linePoint").setAttribute("y2",this.pointLinesPoints[this.lineTraits.indexOf(trait)][1]);
                }
            }
            else {
                console.log("this trait does not exist on this graph");
            }
        }
        else {
            console.log("input should be string")
        }
    }
    buildPolygon() {
        var traitIndex = 1;
        for (const trait in this.lineTraits) {
            var side = this.graphData[this.lineTraits[trait]] * 89.11 * (Math.sqrt(2) / 2);
            var xpoint = 1000;
            var ypoint = 1000;
            switch(traitIndex) {
                case 1:
                    traitIndex++;
                    ypoint -= this.graphData[this.lineTraits[trait]] * 89.11;
                    this.points = this.points.concat(xpoint.toString(),", ",ypoint.toString()," ");
                    this.pointLinesPoints.push([xpoint.toString(),ypoint.toString()]);
                    break;
                case 2:
                    traitIndex++; 
                    ypoint -= side;
                    xpoint += side;
                    this.points = this.points.concat(xpoint.toString(),", ",ypoint.toString()," ");
                    this.pointLinesPoints.push([xpoint.toString(),ypoint.toString()]);
                    break;
                case 3:
                    traitIndex++;
                    xpoint += this.graphData[this.lineTraits[trait]] * 89.11;
                    this.points = this.points.concat(xpoint.toString(),", ",ypoint.toString()," ");
                    this.pointLinesPoints.push([xpoint.toString(),ypoint.toString()]);
                    break;   
                case 4:
                    traitIndex++;
                    ypoint += side;
                    xpoint += side;
                    this.points = this.points.concat(xpoint.toString(),", ",ypoint.toString()," ");
                    this.pointLinesPoints.push([xpoint.toString(),ypoint.toString()]);
                    break;
                case 5:
                    traitIndex++;
                    ypoint += this.graphData[this.lineTraits[trait]] * 89.11;
                    this.points = this.points.concat(xpoint.toString(),", ",ypoint.toString()," ");
                    this.pointLinesPoints.push([xpoint.toString(),ypoint.toString()]);
                    break;
                case 6:
                    traitIndex++;
                    ypoint += side;
                    xpoint -= side;
                    this.points = this.points.concat(xpoint.toString(),", ",ypoint.toString()," ");
                    this.pointLinesPoints.push([xpoint.toString(),ypoint.toString()]);
                    break;
                case 7:
                    traitIndex++;
                    xpoint -= this.graphData[this.lineTraits[trait]] * 89.11;
                    this.points = this.points.concat(xpoint.toString(),", ",ypoint.toString()," ");
                    this.pointLinesPoints.push([xpoint.toString(),ypoint.toString()]);
                    break;
                case 8:
                    traitIndex++;
                    ypoint -= side;
                    xpoint -= side;
                    this.points = this.points.concat(xpoint.toString(),", ",ypoint.toString()," ");
                    this.pointLinesPoints.push([xpoint.toString(),ypoint.toString()]);
                    break;
                default: 
                    console.log("error wrong point");
            }
        }

        this.poly.setAttribute("points", this.points);
        this.poly.setAttribute("fill","#212121");
        this.poly.setAttribute("fill-opacity","0.1")
        this.poly.setAttribute("stroke", "#000");
        this.poly.setAttribute("stroke-width", "15");

        
    }
}

someData = {"lie":2,"agro":6,"extravert":2,"spont":6,"aggres":7,"rigid":6,"introvers":6,"senzitiv":5,"trevozhn":7,"labil":5}
graph = new Graph("graph", someData);

document.getElementById("btn1").addEventListener("click", refreshPoly);

function refreshPoly() {
    var traits = ["lie","agro","extravert","spont","aggres","rigid","introvers","senzitiv","trevozhn","labil"];
    for (var trait in traits) {
        someData[traits[trait]] = document.getElementById(traits[trait]).value;
    }
    graph = new Graph("graph", someData);
}