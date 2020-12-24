import * as d3 from 'd3'

import './style.css'

const fetchData = async () => {
  const response = await fetch(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  )
  const body = await response.json()
  return body.data
}

const draw = (data) => {
  const w = 900
  const h = 460

  const padding = 50

  const yData = data.map((i) => i[1])
  const yScale = d3
    .scaleLinear()
    .domain([d3.min(yData), d3.max(yData)])
    .range([h - padding, padding])

  const transformXData = (d) => new Date(d[0])
  const xData = data.map((i) => transformXData(i))
  const xScale = d3
    .scaleTime()
    .domain([xData[0], xData[xData.length - 1]])
    .range([padding, w - padding])

  console.log([xData[0], xData[xData.length - 1]], xScale())

  const svg = d3.select('body').append('svg').attr('width', w).attr('height', h)

  const yAxis = d3.axisLeft(yScale)
  const xAxis = d3.axisBottom(xScale).ticks(5)

  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d) => xScale(transformXData(d)))
    .attr('y', (d) => yScale(d[1]) - padding)
    .attr('width', (d) => 5)
    .attr('height', (d) => h - yScale(d[1]))

  svg
    .append('g')
    .attr('transform', 'translate(' + padding + ',0)')
    .call(yAxis)

  svg
    .append('g')
    .attr('transform', `translate(0,${h - padding})`)
    .call(xAxis)
}

fetchData().then((data) => {
  console.log(data)
  draw(data)
})
