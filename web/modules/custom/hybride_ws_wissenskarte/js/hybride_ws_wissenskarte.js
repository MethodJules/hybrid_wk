(function ($, Drupal, drupalSettings) {
    var initialized;
    const hexJson = drupalSettings.hybride_ws_wissenskarte.hexJson;
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

  function initSvg() {
    if(!initialized) {
      initialized = true;

      let hexjson = hexJson;

      // Set the size and margins of the svg
      var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = 1050 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

      // Create the svg element
      var svg = d3
        .select("#visualization")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Render the hexes
      var hexes = d3.renderHexJSON(hexjson, width, height);

      // Bind the hexes to g elements of the svg and position them
      var hexmap = svg
        .selectAll("g")
        .data(hexes)
        .enter()
        .append("g")
        .attr("display", function(hex) {return (hex.type === 'method') ? 'none' : 'inline';})
        .attr("class", function(hex) {
          if (hex.type === 'discipline') {
            return 'discipline' + hex.tid + ' ' + hex.type;
          } else {
            return 'group' + hex.groupid + ' ' + hex.type;
          }})
        .attr("transform", function(hex) {
          return "translate(" + hex.x + "," + hex.y + ")";});

      // Draw the polygons around each hex's center
      hexmap
        .append("polygon")
        .attr("points", function(hex) {return hex.points;})
        .attr("stroke", "white")
        .attr("stroke-width", "2")
        .attr("class", "wrap")
        .attr("fill", function(hex) {
          if (hex.type === 'discipline') {
            return "#e3e3e3"
          } else {
            return hex.color;
          }})
        .on("click", function(hex) {handleClick(hex)});


      // Add the hex codes as labels
      hexmap
        .append("text")
        .append("tspan")
        .attr("text-anchor", "middle")
        .attr("class", "wrap")
        .text(function(hex) {return hex.name;});


      d3.select("svg").transition()
        .duration(0)
        .attr("transform", "translate(-100 -100) scale(2)");

      d3.selectAll("svg text").transition()
        .duration(0)
        .attr("transform", "scale(0.6)");

    }
  }

  // Handles click events of different hex types.
  function handleClick(hex) {

    // If you click on a discipline hex, show/hide associated method hexes.
    if (hex.type === 'discipline') {
      if ($('.group' + hex.tid + ':visible').length === 0) {
        zoomOut();
        $('.discipline' + hex.tid + ' polygon').attr('fill', hex.color);
      } else {
        $('.discipline' + hex.tid + ' polygon').attr('fill', '#e3e3e3');
      }
      $('.group' + hex.tid).fadeToggle(200,
        function() {if ($('.method:visible').length === 0) {
          $('.discipline' + hex.tid + ' polygon').attr('fill', '#e3e3e3');
          zoomIn();
        }

        d3.selectAll('text tspan').each(wrap)
      });

      // The 'Hybrid Smart' center hex shows/hides all methods hexes on click.
    } else if (hex.type === 'center') {

      // no method hexes are visible => show them all and zoom out
      if ($('.method:visible').length === 0) {
        $('.method').fadeIn(1000);
        d3.selectAll('text tspan').each(wrap);
        zoomOut();
        d3.selectAll('.discipline polygon').attr('fill',function(hex) {
          return hex.color;
        })

        // at least one method hex is visible => hide them all and zoom in
      } else {
        $('.method').fadeOut(200);
        zoomIn();
        d3.selectAll('.discipline polygon').attr('fill','#e3e3e3');
      }

      // if you click a method hex open the associated method page
    } else if (hex.type === 'method') {
      window.location.assign(hex.url);
    }
  }

  // Zooms out to fit the whole svg with all method hexes.
  function zoomOut() {
    d3.select("svg").transition()
      .duration(750)
      .attr("transform", "scale(1)");
    d3.selectAll("svg text").transition()
      .duration(750)
      .attr("transform", "scale(0.6)");
  }

  // Zooms in on the 'Smart Hybrid' and discipline hexes
  function zoomIn() {
    d3.select("svg").transition()
      .duration(750)
      .attr("transform", "translate(-100 -100) scale(2)");
    d3.selectAll("svg text").transition()
      .duration(750)
      .attr("transform", "scale(0.5)");
  }

  // Shortens text to fit inside the hex
  function wrap() {
    var self = d3.select(this),
      textLength = self.node().getComputedTextLength(),
      text = self.text();
    while (textLength > (100 *10/6 - 2 * 0) && text.length > 0) {
      text = text.slice(0, -1);
      self.text(text + '...');
      textLength = self.node().getComputedTextLength();
    }
  }

  function methods_display(data) {
    //alert(data);
    $('#block-hybridewsblock').html('<h2>Methoden in dieser Phase</h2>' + data);
  }

  Drupal.behaviors.hybride_ws_wissenskarte = {
    attach: function (context, settings) {
      //init();
      initSvg();
    }
  }
}(jQuery, Drupal, drupalSettings));
