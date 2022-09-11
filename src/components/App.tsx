import '../styles/app.scss';
import Canvas from './Canvas';
import SettingBar from './SettingBar';
import ToolBar from './ToolBar';

const App = () => {
  return (
    <div className="app">
      <ToolBar />
      <SettingBar />
      <Canvas />
    </div>
  );
}

export default App;
