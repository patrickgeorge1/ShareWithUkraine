import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { withHooksKC } from './utils/withHooksKC';
import Home from './components/Home';
import AskForHelp from './components/AskForHelp';
import AskForShelter from './components/AskForShelter';
import AskForGoods from './components/AskForGoods';
import AskForTransport from './components/AskForTransport';
import NotFound from './components/Notfound';
import Requests from './components/Requests';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/askforhelp' element={<AskForHelp />} />
            <Route exact path='/askforhelp/shelter' element={<AskForShelter />} />
            <Route exact path='/askforhelp/goods' element={<AskForGoods />} />
            <Route exact path='/askforhelp/transport' element={<AskForTransport />} />
            <Route exact path='/requests' element={<Requests />} />
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </div>
      </BrowserRouter >
    </div >
  );
}

export default withHooksKC(App);
