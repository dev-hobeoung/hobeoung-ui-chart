import { HeatmapExample } from './charts/heatmap/HeatMap'
import { Legend } from './legend/Legend'

function App() {
  return (
    <div className="w-[100vw] h-[100vh]">
      <HeatmapExample />
      <div className="flex">
        <Legend
          className="m-10"
          title="Legend Example"
          labels={['Label 1', 'Label 2', 'Label 3']}
          type="line"
          position="right"
        />
        <Legend
          className="m-10"
          title="Legend Example"
          labels={['Label 1', 'Label 2', 'Label 3']}
          type="text"
          position="right"
        />
        <Legend
          className="m-10"
          title="Legend Example"
          labels={['Label 1', 'Label 2', 'Label 3']}
          type="round"
          position="right"
        />
        <Legend
          className="m-10"
          title="Legend Example"
          labels={['Label 1', 'Label 2', 'Label 3']}
          type="number"
          position="right"
        />
        <Legend
          className="m-10"
          title="Legend Example"
          labels={['Label 1', 'Label 2', 'Label 3']}
          type="square"
          position="right"
        />
      </div>
    </div>
  )
}

export default App
