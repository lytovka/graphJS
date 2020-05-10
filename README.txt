class Graph() {
    highlightSector(sectors, color) sectors - array or solo num, color - string of "#FFFFFF" format or "#FFF" format

    dehighlightSector() - opposing to highlightSector() 

    adjustLevels() - set the radiuses of lie and agro circles (dashed red and blue circles)

    highlight(trait) trait - string, any of the trait ids, given in the technical task

    dehighlight() - opposing to highlight()

    highlightIssues() - highlight the points out of norm 

    dehighlightIssues() - opposing to highlightIssues()

    buildPoints() - process information given in the JSON object, convert to polygon points

    buildPolygon() - set polygon`s attributes, points included and animate

    refreshPolygon() - called through a helper function everytime there is a change to the JSON object. Adjusts the polygon
    and effects accordingly to new parameters from JSON object
}

helpers:
    someData - JSON object with variables
    graph - graph instance initialization
    auxiliery functions reacting to buttons pressed