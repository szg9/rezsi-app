import * as ReactDOM from 'react-dom';
import DWChart from 'react-datawrapper-chart'

export default function Graph() {
    return (
        <div>
            <div className="graphs">
                <h1>Villany</h1>
                <div className='graph-container'>
                    <DWChart title="Chart" src="https://datawrapper.dwcdn.net/VkPne/" />
                    <DWChart title="Chart" src="https://datawrapper.dwcdn.net/G0k8m/" />
                </div>
                <h1>Gáz</h1>
                <div className='graph-container'>
                    <DWChart title="Chart" src="https://datawrapper.dwcdn.net/XKhNd/" />
                    <DWChart title="Chart" src="https://datawrapper.dwcdn.net/NZIxE/" />
                </div>
            </div>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Graph />, rootElement);

