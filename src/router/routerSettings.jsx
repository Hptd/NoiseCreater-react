import HomePage from '../components/HomePage.jsx'
import ThanksPage from '../components/ThanksPage.jsx'
import NoiseDetail from '../components/NoiseDetail.jsx'
import UpdateHistory from '../components/UpdateHistory.jsx'
import { createBrowserRouter } from 'react-router-dom'

const routers = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage />
    },

    {
      path: '/noiseDetail/:name',
      element: <NoiseDetail />
    },
    {
      path: '/thanksList',
      element: <ThanksPage />
    },
    {
      path: 'updateLog',
      element: <UpdateHistory />
    }
  ]
)
export default routers