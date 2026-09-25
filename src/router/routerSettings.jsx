import HomePage from '../components/HomePage.jsx'
import ThanksPage from '../components/ThanksPage.jsx'
import NoiseDetail from '../components/NoiseDetail.jsx'
import UpdateHistory from '../components/UpdateHistory.jsx'
import NodeEditorPage from '../nodeEditor/components/NodeEditorPage.jsx'
import NodeDocumentPage from '../nodeEditor/components/NodeDocumentPage.jsx'
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
      path: '/nodeEditor',
      element: <NodeEditorPage />
    },
    {
      path: '/nodeDocument',
      element: <NodeDocumentPage />
    },
    {
      path: '/nodeDocument/:slug',
      element: <NodeDocumentPage />
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