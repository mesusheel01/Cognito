import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import { RecoilRoot } from 'recoil'
import { SnackbarProvider } from 'notistack'

const App = () => {
  return (
    <SnackbarProvider>
        <RecoilRoot>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    </SnackbarProvider>
  )
}

export default App
