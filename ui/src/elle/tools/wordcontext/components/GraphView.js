import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Button, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DefaultButtonStyle } from '../../../const/Constants';
import { GroupWork } from '@mui/icons-material';
import ModalBase from '../../../components/ModalBase';

export default function GraphView({ data }) {

  const { t } = useTranslation();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [svgState, setSvgState] = useState(null);

  const svgHeight = 475;
  const svgWidth = 1275;

  useEffect(() => {
    if (modalOpen && svgState) {
      const svg = d3.select(svgState);
      const graphData = [
        { x: 10, y: 20 },
        { x: 20, y: 25 },
        { x: 30, y: 15 },
        { x: 40, y: 30 },
        { x: 50, y: 35 }
      ];

      // Set up scales for x and y axes
      const xScale = d3.scaleLinear().domain([0, d3.max(graphData, d => d.x)]).range([0, svgWidth]);
      const yScale = d3.scaleLinear().domain([0, d3.max(graphData, d => d.y)]).range([svgHeight, 0]);

      // Add circles for each data point
      svg.selectAll('.point')
        .data(graphData)
        .enter()
        .append('circle')
        .attr('class', 'point')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', 5)
        .attr('fill', 'steelblue');

      // Add labels for each data point
      svg.selectAll('.label')
        .data(graphData)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', d => xScale(d.x))
        .attr('y', d => yScale(d.y))
        .attr('dx', 8)
        .attr('dy', -5)
        .text(d => `(${d.x}, ${d.y})`);

      const centerX = svgWidth / 2;
      const centerY = svgHeight / 2;

      // Connect main dot with lines to other dots
      svg.selectAll('.line')
        .data(graphData)
        .enter()
        .append('line')
        .attr('class', 'line')
        .attr('x1', centerX)
        .attr('y1', centerY)
        .attr('x2', d => xScale(d.x))
        .attr('y2', d => yScale(d.y))
        .attr('stroke', 'black')
        .attr('stroke-width', 1);

      // Add main dot at the center
      svg.append('circle')
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('r', 8)
        .attr('fill', 'rgba(255, 208, 253, 1)');
    }
  }, [modalOpen, data, svgState, svgHeight, svgWidth]);

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
