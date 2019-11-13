(function ($, Drupal, drupalSettings) {
    var initialized;
    base_path = drupalSettings.baseUrl;

    function init() {
        if(!initialized) {
            initialized = true;
            console.log('js');
            // Your custom JS.
            var w = 1200;
            var h = 1000;
            div = 'visualization';
            //Add svg tag to div container
            var svg = d3.select('#' + div).append("svg")
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 1400 940")

                .classed("svg-container", true)
                .classed("svg-content-responsive", true);
            //.on("click", explicitlyPosition);
            //.tick();


            //Hexagon Smart Hybrid
            /**
            var svgCanvas = svg.append('rect')
                .attr('id', 'svgCanvas')
                .attr('x', 1)
                .attr('y', 1)
                .attr('width', 800)
                .attr('height', 500)
                .style('fill', '#595959');
            */

            var xFactor = 2;
            var smartHybridHexagon = svg.append("path")
                .attr('d', function(d){
                    return 'M ' + 200*xFactor + ' ' + 100*xFactor +
                        ' L' + 250*xFactor + ' ' + 150*xFactor +
                        ' L' + 250*xFactor + ' ' + 200*xFactor +
                        ' L' + 200*xFactor + ' ' + 250*xFactor +
                        ' L' + 150*xFactor + ' ' + 200*xFactor +
                        ' L' + 150*xFactor + ' ' + 150*xFactor +
                        ' z';

                })
                .style("fill", "#3AA039")
                .on("click", function() {handleClick(0)});

            var smartHybridHexagonGroup = svg.append("g")
            smartHybridHexagonGroup.append("text")
                .style("fill", "black")
                .style("font-size", "20px")
                .attr("x", 200*xFactor)
                .attr("dy", 180*xFactor)
                .style("text-anchor", "middle")
                .text("Smart Hybrid");


            var smartEngineeringHexagon = svg.append("path")
                .attr('d', function(d){
                    return 'M ' + 150*xFactor + ' ' + 200*xFactor +
                        ' L' + 200*xFactor + ' ' + 250*xFactor +
                        ' L' + 200*xFactor + ' ' + 300*xFactor +
                        ' L' + 150*xFactor + ' ' + 350*xFactor +
                        ' L' + 100*xFactor + ' ' + 300*xFactor +
                        ' L' + 100*xFactor + ' ' + 250*xFactor +
                        ' z';

                })
                .style("fill", "#3AA0AA")
                .on("click", function() {handleClick(4)});

            var smartEngineeringHexagonGroup = svg.append("g")
                smartEngineeringHexagonGroup.append("text")
                    .style("fill", "black")
                    .style("font-size", "20px")
                    .attr("x", 150*xFactor)
                    .attr("dy", 280*xFactor)
                    .style("text-anchor", "middle")
                    .text("Service Engineering");

            var smartProductionHexagon = svg.append("path")
                .attr('d', function (d) {
                    return 'M ' + 100*xFactor + ' ' + 250*xFactor +
                        ' L' + 50*xFactor + ' ' + 200*xFactor +
                        ' L' + 50*xFactor + ' ' + 150*xFactor +
                        ' L' + 100*xFactor +  ' ' + 100*xFactor +
                        ' L' + 150*xFactor + ' ' + 150*xFactor +
                        ' L '+ 150*xFactor + ' ' + 200*xFactor +
                        ' z';
                })
                .style("fill", "#c3cec3")
                .on("click", function() {handleClick(5)});

            var smartProductionHexagonGroup = svg.append("g")
                smartProductionHexagonGroup.append("text")
                    .style("fill", "black")
                    .style("font-size", "20px")
                    .attr("x", 100*xFactor)
                    .attr("dy", 180*xFactor)
                    .style("text-anchor", "middle")
                    .text("Production Engineering");

            var smartProcessHexagon = svg.append("path")
                .attr('d', function(d){
                    return 'M' + 100*xFactor + ' ' + 100*xFactor +
                        ' L' + 100*xFactor + ' ' + 50*xFactor +
                        ' L' + 150*xFactor + ' ' + 0*xFactor +
                        ' L' + 200*xFactor + ' ' + 50*xFactor +
                        ' L' + 200*xFactor + ' ' + 100*xFactor +
                        ' L' + 150*xFactor + ' ' + 150*xFactor +
                        'z'
                })
                .style("fill", "#e3e3e3")
                .on("click", function() {handleClick(1)});

            var smartProcessHexagonGroup = svg.append("g")
                smartProcessHexagonGroup.append("text")
                    .style("fill", "black")
                    .style("font-size", "20px")
                    .attr("x", 150*xFactor)
                    .attr("dy", 80*xFactor)
                    .style("text-anchor", "middle")
                    .text("Process Engineering");

            var smartElectricalHexagon = svg.append("path")
                .attr('d', function(d){
                    return 'M' + 200*xFactor + ' ' + 50*xFactor +
                        ' L' + 250*xFactor + ' ' + 0*xFactor +
                        ' L' + 300*xFactor + ' ' + 50*xFactor +
                        ' L' + 300*xFactor + ' ' + 100*xFactor +
                        ' L' + 250*xFactor + ' ' + 150*xFactor +
                        ' L' + 200*xFactor + ' ' + 100*xFactor +
                        'z'
                })
                .style("fill", "#b3a3d7")
                .on("click", function() {handleClick(2)});

            var smartElectricalHexagonGroup = svg.append("g")
                smartElectricalHexagonGroup.append("text")
                    .style("fill", "black")
                    .style("font-size", "20px")
                    .attr("x", 250*xFactor)
                    .attr("dy", 80*xFactor)
                    .style("text-anchor", "middle")
                    .text("Smart Electrical");

            var smartSoftwareHexagon = svg.append("path")
                .attr('d', function(d){
                    return 'M' + 300*xFactor + ' ' + 100*xFactor +
                        ' L' + 350*xFactor + ' ' + 150*xFactor +
                        ' L' + 350*xFactor + ' ' + 200*xFactor +
                        ' L' + 300*xFactor + ' ' + 250*xFactor +
                        ' L' + 250*xFactor + ' ' + 200*xFactor +
                        ' L' + 250*xFactor + ' ' + 150*xFactor +
                        'z'
                })
                .style("fill", "#a4b3d7")
                .on("click", function() {handleClick(3)});

            var smartSoftwareHexagonGroup = svg.append("g")
                smartSoftwareHexagonGroup.append("text")
                    .style("fill", "black")
                    .style("font-size", "20px")
                    .attr("x", 300*xFactor)
                    .attr("dy", 180*xFactor)
                    .style("text-anchor", "middle")
                    .text("Software Engineering");

            var smartProductHexagon = svg.append("path")
                .attr('d', function(d){
                    return 'M' + 300*xFactor + ' ' + 250*xFactor +
                        ' L' + 300*xFactor + ' ' + 300*xFactor +
                        ' L' + 250*xFactor + ' ' + 350*xFactor +
                        ' L' + 200*xFactor + ' ' + 300*xFactor +
                        ' L' + 200*xFactor + ' ' + 250*xFactor +
                        ' L' + 250*xFactor + ' ' + 200*xFactor +
                        'z'
                })
                .style("fill", "#d4a3e7")
                .on("click", function() {handleClick(6)});

            var smartProductHexagonGroup = svg.append("g")
                smartProductHexagonGroup.append("text")
                    .style("fill", "black")
                    .style("font-size", "20px")
                    .attr("x", 250*xFactor)
                    .attr("dy", 280*xFactor)
                    .style("text-anchor", "middle")
                    .text("Product Engineering");

        }
    }



    function handleClick(term_id) {
        console.log(term_id);

        $.ajax({
            url: base_path + '/hybride_ws/models/' + term_id,
            cache: false,
            success: function (data) {
                methods_display(data);
            }
        });

    }

    function methods_display(data) {
        //alert(data);
        $('#block-hybridewsblock').html('<h2>Methoden in dieser Phase</h2>' + data);
    }
    Drupal.behaviors.hybride_ws_wissenskarte = {
        attach: function (context, settings) {
            init();
        }
    }
}(jQuery, Drupal, drupalSettings));
