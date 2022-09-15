import { Navigate, Route, Routes } from 'react-router-dom';
import '../styles/app.scss';
import { getSessionId } from '../utils/getSessionId';
import Canvas from './Canvas';
import SettingBar from './SettingBar';
import ToolBar from './ToolBar';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path='/:id'
          element={<>
            <ToolBar />
            <SettingBar />
            <Canvas />
          </>}
        />
        <Route path="*" element={<Navigate to={getSessionId()} replace />} />
      </Routes>
    </div>
  );
}

export default App;
