import ChartContainer from './container/ChartContainer'

function App() {
  return (
    <div className="w-[100vw] h-[100vh]">
      {/* Heatmap */}
      <ChartContainer title="Chart Container Example">
        <ChartContainer.Legend
          className="m-10"
          title="Legend Example"
          type="square"
          position="bottom"
        />
        <ChartContainer.Heatmap
          width={600}
          height={400}
          numRows={10}
          numCols={10}
          data={[
            { label: 'test', value: 100, x: 1, y: 1 },
            { label: 'test', value: 200, x: 2, y: 1 },
            { label: 'test', value: 300, x: 1, y: 3 },
            { label: 'test', value: 400, x: 4, y: 1 },
            { label: 'test', value: 500, x: 1, y: 1 },
            { label: 'test1', value: 300, x: 1, y: 3 },
            { label: 'test1', value: 400, x: 4, y: 1 },
            { label: 'test1', value: 500, x: 1, y: 1 },
            { label: 'test2', value: 200, x: 2, y: 3 },
            { label: 'test2', value: 300, x: 4, y: 3 },
            { label: 'test2', value: 400, x: 4, y: 5 },
            { label: 'test2', value: 500, x: 8, y: 9 },
          ]}
          xAxisLabel='가나다'
          yAxisLabel='라마바'
          variant={"instance12"}
        />
      </ChartContainer>
      {/* Pie */}
      <div className="flex">
        <ChartContainer title="Chart Container Example">
          <ChartContainer.Legend
            className="m-10"
            title="Legend Example"
            type="square"
            position="bottom"
          />
          <ChartContainer.Pie
            data={[
              { label: 'A', value: 100 },
              { label: 'B', value: 200 },
              { label: 'C', value: 300 },
            ]}
            isHalf
          >
            <ChartContainer.Pie.Label>
              <div>테스트1</div>
              <div>테스트2</div>
            </ChartContainer.Pie.Label>
          </ChartContainer.Pie>
        </ChartContainer>
        <ChartContainer title="Chart Container Example">
          <ChartContainer.Legend
            className="m-10"
            title="Legend Example"
            type="number"
            position="right"
          />
          <ChartContainer.Pie
            data={[
              { label: 'A', value: 100 },
              { label: 'B', value: 20 },
              { label: 'C', value: 30 },
            ]}
          >
            <ChartContainer.Pie.Label>
              테스트
            </ChartContainer.Pie.Label>
          </ChartContainer.Pie>
        </ChartContainer>
        <ChartContainer title="Chart Container Example">
          <ChartContainer.PiePercent
            value={100}
            total={300}
          >
            <ChartContainer.PiePercent.Label>
              테스트asdasdasd
            </ChartContainer.PiePercent.Label>
          </ChartContainer.PiePercent>
        </ChartContainer>
      </div>
      {/* Grid */}
      <div className="flex">
        <ChartContainer title="Chart Container Example">
          <ChartContainer.Grid
            data={[
              { label: 'A', value: 100 },
              { label: 'B', value: 200 },
              { label: 'C', value: 300 },
            ]}
          />
        </ChartContainer>
        <ChartContainer title="Chart Container Example">
          <ChartContainer.GridOver
            data={[1,2,3,4,10,23,43,45,45,56]}
            useSort
          />
        </ChartContainer>
      </div>
    </div>
  )
}

export default App
