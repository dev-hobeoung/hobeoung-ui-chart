import ChartContainer from './container/ChartContainer'

function App() {
  return (
    <div className="w-[100vw] h-[100vh]">
      {/* Heatmap */}
      <ChartContainer title="Chart Container Example">
        <ChartContainer.Legend
          className="m-10"
          title="Legend Example"
          labels={['Label 1', 'Label 2', 'Label 3']}
          type="square"
          position="top"
        />
        <ChartContainer.Heatmap
          width={600}
          height={300}
          numRows={10}
          numCols={10}
          data={[[10, 20, 30, 40], [50, 60, 70, 80, 100]]}
          backgroundColor='#e6e6e6'
          xAxisLabel='가나다'
          yAxisLabel='라마바'
        />
      </ChartContainer>
      {/* Pie */}
      <ChartContainer title="Chart Container Example">
        <ChartContainer.Legend
          className="m-10"
          title="Legend Example"
          type="square"
          position="top"
        />
        <ChartContainer.Pie
          data={[
            { label: 'A', value: 100 },
            { label: 'B', value: 200 },
            { label: 'C', value: 300 },
          ]}
          isHalf
        />
      </ChartContainer>
    </div>
  )
}

export default App
