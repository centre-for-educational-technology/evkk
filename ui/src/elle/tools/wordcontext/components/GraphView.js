import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Button, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DefaultButtonStyle } from '../../../const/Constants';
import { GroupWork } from '@mui/icons-material';
import ModalBase from '../../../components/ModalBase';

export default function GraphView({ data, keyword }) {

  const { t } = useTranslation();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [svgState, setSvgState] = useState(null);

  const svgHeight = 475;
  const svgWidth = 1275;
  const svgEdgePadding = 20;

  const minRadiusRange = 5;
  const maxRadiusRange = 20;

  useEffect(() => {
    if (modalOpen && svgState && data) {
      const svg = d3.select(svgState);

      // Normalize scores to the range [0, 1]
      const maxScore = d3.max(data, d => d.score);
      const minScore = d3.min(data, d => d.score);
      const normalizedData = data.map(d => ({
        ...d,
        normalizedScore: (d.score - minScore) / (maxScore - minScore)
      }));

      normalizedData.forEach((d, i) => {
        const { x, y, radius } = getCoordinatesAndRadius(d, i);
        addCirclesAndLines(svg, radius, x, y);
      });

      // Doing a second loop is necessary to avoid text from being drawn over by subsequent circles
      normalizedData.forEach((d, i) => {
        const { x, y, radius } = getCoordinatesAndRadius(d, i);
        addLabelsAndAdjustPositions(svg, radius, x, y, d);
      });

      addMainDotData(svg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen, data, keyword, svgState, svgHeight, svgWidth]);

  // Calculate radius for each data point using normalized scores
  const normalizedRadius = d3.scaleLinear()
    .domain([0, 1]) // Normalized score range
    .range([minRadiusRange, maxRadiusRange]); // Output radius range

  const getCoordinatesAndRadius = (d, i) => {
    // Calculate the maximum dominance value (leftOccurrences or rightOccurrences)
    const maxDominance = d3.max(data, d => Math.max(d.leftOccurrences, d.rightOccurrences));

    // Set up scales for x and y axes with padding
    const xScale = d3.scaleLinear().domain([0, maxDominance]).range([svgEdgePadding, svgWidth - svgEdgePadding]);
    const yScale = d3.scaleLinear().domain([0, data.length - 1]).range([svgEdgePadding, svgHeight - svgEdgePadding]);

    const leftRatio = d.leftOccurrences / (d.leftOccurrences + d.rightOccurrences);

    // Calculate the position based on the ratio of leftOccurrences to rightOccurrences
    const x = xScale(maxDominance * (1 - leftRatio)); // Adjusted calculation to mirror the coordinates to the correct side (left or right)

    // Calculate y-coordinate to evenly space points along the y-axis
    const y = yScale(i);

    // Determine circle radius based on the normalized score
    const radius = normalizedRadius(d.normalizedScore);

    return { x, y, radius };
  };

  const addCirclesAndLines = (svg, radius, x, y) => {
    // Add lines connecting each circle to the main dot
    // Drawing lines before circles is important, otherwise they would be drawn on top of the circles
    svg.append('line')
      .attr('x1', svgWidth / 2)
      .attr('y1', svgHeight / 2)
      .attr('x2', x)
      .attr('y2', y)
      .attr('stroke', 'rgba(128, 128, 128, 0.5)')
      .attr('stroke-width', 1);

    // Draw circles for each data point
    svg.append('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', radius)
      .attr('fill', 'rgb(255, 208, 253)');
  };

  const addLabelsAndAdjustPositions = (svg, radius, x, y, d) => {
    // Add labels for each data point
    const label = svg.append('text')
      .attr('x', x)
      .attr('y', y)
      .text(d.collocate);

    // Adjust label position based on circle position
    if (x === svgWidth / 2) {
      // If circle is in the center of the canvas
      if (y < svgHeight / 2) {
        // If circle is in the upper half, place the text below it at the center
        label.attr('text-anchor', 'middle')
          .attr('dy', radius * 2);
      } else {
        // If circle is in the lower half, place the text above it at the center
        label.attr('text-anchor', 'middle')
          .attr('dy', -radius * 2);
      }
    } else if (y < svgHeight / 2) {
      if (x < svgWidth / 2) { // Top left quadrant
        label.attr('dx', radius)
          .attr('dy', radius);
      } else { // Top right quadrant
        label.attr('text-anchor', 'end')
          .attr('dx', -radius)
          .attr('dy', radius);
      }
    } else {
      if (x < svgWidth / 2) { // Bottom left quadrant
        label.attr('dx', radius)
          .attr('dy', -radius);
      } else { // Bottom right quadrant
        label.attr('text-anchor', 'end')
          .attr('dx', -radius)
          .attr('dy', -radius);
      }
    }
  };

  const addMainDotData = (svg) => {
    // Add main dot at the center
    svg.append('circle')
      .attr('cx', svgWidth / 2)
      .attr('cy', svgHeight / 2)
      .attr('r', 10)
      .attr('fill', 'rgb(156, 39, 176)');

    // Add label for the main dot
    svg.append('text')
      .attr('x', svgWidth / 2)
      .attr('y', svgHeight / 2 - 30)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .attr('font-weight', 'bold')
      .attr('font-size', '25px')
      .text(keyword);
  };

  const handleClick = () => {
    setTooltipOpen(false);
    setModalOpen(true);
  };

  return (
    <Tooltip
      title={t('collocates_graph')}
      open={tooltipOpen}
      placement="top"
    >
      <Button
        style={DefaultButtonStyle}
        variant="contained"
        onClick={handleClick}
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={() => setTooltipOpen(false)}
      >
        <GroupWork fontSize="large" />
      </Button>
      <ModalBase
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        innerClassName="graph-modal"
        title="collocates_graph"
      >
        <svg
          ref={setSvgState}
          height={svgHeight}
          width={svgWidth}
        />
      </ModalBase>
    </Tooltip>
  );
}
