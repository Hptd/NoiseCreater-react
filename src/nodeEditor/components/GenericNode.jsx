// 通用节点组件：所有节点共用，端口/参数完全由注册表驱动。
import { memo, useState } from 'react'
import { Handle, Position } from '@xyflow/react'
import { getNodeDef } from '../graph/nodeRegistry.js'
import { nodeDocSlug } from '../graph/nodeDocSlug.js'
import { useThumbnail } from './thumbnailStore.js'
import { isPreviewData, isThumbnailData, previewSize, PREVIEW_SIZES } from './nodeKinds.js'
import { NODE_LEVEL_COMMON_KEYS, getNoiseDefaults } from '../runtime/noiseSliceRegistry.js'
import { useLang, tNode } from '../i18n/index.js'

const NODE_WIDTH = 210
const HEADER_H = 28
const ROW_H = 20
const THUMB_H = 102

function paramPortNames(data) {
  const names = [...NODE_LEVEL_COMMON_KEYS]
  if (data.type === 'noise') {
    for (const key of Object.keys(getNoiseDefaults(data.noiseName))) {
      if (!names.includes(key)) names.push(key)
    }
  }
  return names
}

function GenericNode({ id, data, selected }) {
  const def = getNodeDef(data.type, data.op)
  useLang()
  const [showParams, setShowParams] = useState(false)

  const isPreview = isPreviewData(data)
  const hasThumbnail = isThumbnailData(data)
  const thumbnail = useThumbnail(id)

  // Preview 节点：节点内的预览图直接按所选尺寸 1:1 显示。
  const previewPixel = isPreview ? previewSize(data) : 0
  const nodeWidth = isPreview ? previewPixel + 8 : NODE_WIDTH
  const thumbBox = isPreview ? previewPixel : 96
  const thumbArea = isPreview ? previewPixel + 34 : THUMB_H

  const imageInputs = (def?.inputs || []).map(input => ({ id: input.name, label: input.name }))
  const showParamPorts = data.type === 'noise' && (showParams || data.hasParamEdge)
  const inputs = [
    ...imageInputs,
    ...(showParamPorts ? paramPortNames(data).map(name => ({ id: `param:${name}`, label: `⟨${name}⟩`, param: true })) : []),
  ]
  const outputs = (def?.outputs || []).map(port => ({ id: port, label: port }))

  const bodyTop = HEADER_H + (hasThumbnail ? thumbArea : 0)
  const rowCount = Math.max(Math.max(inputs.length, outputs.length), 1)
  const bodyHeight = rowCount * ROW_H + 8
  const borderColor = data.error ? '#e05656' : selected ? '#4ea1ff' : '#3a3f44'

  return (
    <div className="nc-node" style={{ width: nodeWidth, height: bodyTop + bodyHeight, borderColor }}>
      <div className="nc-node-header" style={{ height: HEADER_H }}>
        <span className="nc-node-title" title={data.op}>{data.type === 'noise' ? (data.label || data.op) : tNode(def)}</span>
        {data.type === 'noise' && (
          <button className="nc-node-toggle" onClick={() => setShowParams(v => !v)}>
            {showParamPorts ? '−' : '+'}
          </button>
        )}
        {def && (
          <a
            className="nc-node-help nodrag nopan"
            href={`/nodeDocument/${nodeDocSlug(def)}/`}
            target="_blank"
            rel="noreferrer"
            title="节点说明"
            onMouseDown={e => e.stopPropagation()}
          >?</a>
        )}
      </div>

      {hasThumbnail && (
        <div className={`nc-node-thumb${isPreview ? ' preview' : ''}`} style={{ height: thumbArea, top: HEADER_H }}>
          {isPreview ? (
            <>
              <div className="nc-node-preview-bar nodrag">
                <select
                  className="nodrag"
                  value={data.params?.size || PREVIEW_SIZES[0]}
                  onChange={e => data.onParamChange?.('size', e.target.value)}
                >
                  {PREVIEW_SIZES.map(size => <option key={size} value={size}>{size}</option>)}
                </select>
              </div>
              {thumbnail
                ? <img src={thumbnail} alt="" draggable={false} style={{ width: thumbBox, height: thumbBox }} />
                : <span>…</span>}
            </>
          ) : (
            thumbnail ? <img src={thumbnail} alt="" draggable={false} style={{ width: 96, height: 96 }} /> : <span>…</span>
          )}
        </div>
      )}

      {inputs.map((item, i) => (
        <Handle
          key={`in-${item.id}`}
          type="target"
          position={Position.Left}
          id={item.id}
          style={{ top: bodyTop + i * ROW_H + ROW_H / 2 }}
        />
      ))}
      {outputs.map((item, i) => (
        <Handle
          key={`out-${item.id}`}
          type="source"
          position={Position.Right}
          id={item.id}
          style={{ top: bodyTop + i * ROW_H + ROW_H / 2 }}
        />
      ))}

      <div className="nc-node-body" style={{ top: bodyTop, height: bodyHeight }}>
        {inputs.map((item, i) => (
          <div className={`nc-node-row${item.param ? ' param' : ''}`} key={item.id} style={{ top: i * ROW_H }}>
            <span>{item.label}</span>
          </div>
        ))}
        {outputs.map((item, i) => (
          <div className="nc-node-row out" key={item.id} style={{ top: i * ROW_H }}>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(GenericNode)
