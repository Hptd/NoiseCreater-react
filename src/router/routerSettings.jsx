import { lazy, Suspense } from 'react'
import HomePage from '../components/HomePage.jsx'
import { createBrowserRouter } from 'react-router-dom'

// 首页保持同步加载；其余页面按路由拆包，避免 three / xyflow / jszip 进入首屏
const pageLoading = (
  <div className="page-loading" role="status" aria-live="polite">
    <span className="page-loading-spinner" aria-hidden="true" />
    <span>加载中...</span>
  </div>
)

const lazyPage = (loader) => {
  const Page = lazy(loader)
  return (
    <Suspense fallback={pageLoading}>
      <Page />
    </Suspense>
  )
}

const routers = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage />
    },

    {
      path: '/noiseDetail/:name',
      element: lazyPage(() => import('../components/NoiseDetail.jsx'))
    },
    {
      path: '/nodeEditor',
      element: lazyPage(() => import('../nodeEditor/components/NodeEditorPage.jsx'))
    },
    {
      path: '/nodeDocument',
      element: lazyPage(() => import('../nodeEditor/components/NodeDocumentPage.jsx'))
    },
    {
      path: '/nodeDocument/:slug',
      element: lazyPage(() => import('../nodeEditor/components/NodeDocumentPage.jsx'))
    },
    {
      path: '/thanksList',
      element: lazyPage(() => import('../components/ThanksPage.jsx'))
    },
    {
      path: 'updateLog',
      element: lazyPage(() => import('../components/UpdateHistory.jsx'))
    }
  ]
)
export default routers