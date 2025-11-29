import { useEffect, useMemo, useState } from 'react'
import { marked } from 'marked'
import { MapView } from './components/MapView'
import { spots, type Spot } from './data/spots'

type Stage = 'idle' | 'loading' | 'streaming'

const pipeline = [
  { label: 'Capture', detail: 'Snap/upload a campus photo from phone or laptop' },
  { label: 'Swin geo-locator', detail: 'Swin Transformer predicts lat/lng + confidence from the image' },
  {
    label: 'LLM enrichment',
    detail: 'Predicted coords + building cues go to GPT to craft a tailored prompt and narrative',
  },
  {
    label: 'Render',
    detail: 'Map pin drops, coordinates lock in, and we stream the Penn landmark background',
  },
]

const randomLoadingMs = () => 2600 + Math.random() * 1800

const buildStreamContent = (spot: Spot) => {
  const header = `# Prediction`
  const coords = `Lat/Lng: ${spot.lat.toFixed(4)}, ${spot.lng.toFixed(4)}`
  const facts = ['**Quick facts:**', `- ${coords}`, '- Model: Swin Transformer + retrieval postprocess'].join('\n')
  return [header, spot.narrative, `**Location note:** ${spot.background}`, facts].join('\n\n')
}

export default function App() {
  const [selectedId, setSelectedId] = useState(spots[0]?.id ?? '')
  const [stage, setStage] = useState<Stage>('loading')
  const [typedText, setTypedText] = useState('')
  const [progress, setProgress] = useState(0)

  const selected: Spot = useMemo(
    () => spots.find((spot) => spot.id === selectedId) ?? spots[0],
    [selectedId],
  )!

  const renderedMarkdown = useMemo(() => {
    if (stage === 'loading') return ''
    return marked.parse(typedText || '')
  }, [typedText, stage])

  useEffect(() => {
    if (!selected) return

    let streamTimer: ReturnType<typeof setInterval> | undefined
    let progressTimer: ReturnType<typeof setInterval> | undefined

    setStage('loading')
    setTypedText('')
    setProgress(0)

    progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(95, prev + 5 + Math.random() * 8))
    }, 260)

    const loadTimer = setTimeout(() => {
      setStage('streaming')
      if (progressTimer) clearInterval(progressTimer)
      setProgress(100)
      const text = buildStreamContent(selected)
      let index = 0
      streamTimer = setInterval(() => {
        index += 2
        setTypedText(text.slice(0, index))
        if (index >= text.length) {
          if (streamTimer) clearInterval(streamTimer)
          setStage('idle')
        }
      }, 18)
    }, randomLoadingMs())

    return () => {
      clearTimeout(loadTimer)
      if (progressTimer) clearInterval(progressTimer)
      if (streamTimer) clearInterval(streamTimer)
    }
  }, [selected])

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero__text">
          <p className="eyebrow">Image -&gt; GPS | Swin Transformer</p>
          <h1>Guess where you are @ Penn Engineering</h1>
          <p className="lede">
            Snap a pic and we&apos;ll guess your coordinates. Pick a sample on the left; after a few seconds of thinking,
            you&apos;ll see lat/lng, a description, and a map pin.
          </p>
          <div className="pill-row">
            <span className="pill pill--accent">Swin Transformer</span>
            <span className="pill">Geo retrieval</span>
            <span className="pill">Penn Engineering</span>
          </div>
        </div>
      </header>

      <div className="layout">
        <aside className="panel gallery">
          <div className="panel__header">
            <div>
              <p className="eyebrow">Sample set</p>
              <h3>Pick an image to test</h3>
              <p className="microcopy">6 starter examples.</p>
            </div>
          </div>
          <div className="gallery__grid">
            {[spots.slice(0, Math.ceil(spots.length / 2)), spots.slice(Math.ceil(spots.length / 2))].map(
              (col, idx) => (
                <div className="gallery-col" key={idx}>
                  {col.map((spot) => {
                    const active = spot.id === selected.id
                    return (
                      <button
                        key={spot.id}
                        className={`spot-card ${active ? 'spot-card--active' : ''}`}
                        onClick={() => setSelectedId(spot.id)}
                      >
                        <div className="spot-thumb">
                          <img src={spot.image} alt="sample" loading="lazy" />
                        </div>
                      </button>
                    )
                  })}
                </div>
              ),
            )}
          </div>
        </aside>

        <main className="panel details">
          <section className="card status-card">
            <div className="status-row">
              <div>
                <p className="eyebrow">Inference status</p>
                <h3>
                  {stage === 'loading'
                    ? 'Processing image...'
                    : stage === 'streaming'
                      ? 'Streaming description...'
                      : 'Complete'}
                </h3>
                <p className="microcopy">
                  Expect ~3-5 seconds while the model runs, coordinates lock in, and the markdown description streams out.
                </p>
              </div>
              <div className="progress">
                <div className="progress__bar" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="status-steps">
              {['Queue / preprocess', 'Model forward', 'Postprocess', 'Format + render'].map((label, index) => {
                const active =
                  (stage === 'loading' && index === 1) ||
                  (stage === 'streaming' && index >= 1) ||
                  stage === 'idle'
                return (
                  <div key={label} className={`status-chip ${active ? 'status-chip--active' : ''}`}>
                    <span className="dot" />
                    <span>{label}</span>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="card map-card">
            <div className="map-wrap">
              {stage === 'loading' ? (
                <div className="map-placeholder">
                  <div className="pulse-dot" />
                  <div>
                    <p className="eyebrow">Predicting coordinates</p>
                    <h3>Waiting for location...</h3>
                    <p className="microcopy">Map will render once lat/lng are ready.</p>
                  </div>
                </div>
              ) : (
                <MapView
                  lat={selected.lat}
                  lng={selected.lng}
                  zoom={selected.zoom ?? 13}
                  title={selected.title}
                />
              )}
              <div className="map-overlay">
                <div>
                  <p className="eyebrow">Predicted coordinates</p>
                  <h3>
                    {stage === 'loading'
                      ? '--.-- , --.--'
                      : `${selected.lat.toFixed(4)}, ${selected.lng.toFixed(4)}`}
                  </h3>
                  <p className="microcopy">{stage === 'loading' ? 'Locating...' : 'Coordinate locked in'}</p>
                </div>
                <div className="coordinate-box">
                  <div className="coord-label">Lat</div>
                  <div className="coord-value">
                    {stage === 'loading' ? '--.--' : selected.lat.toFixed(4)}
                  </div>
                  <div className="coord-label">Lng</div>
                  <div className="coord-value">
                    {stage === 'loading' ? '--.--' : selected.lng.toFixed(4)}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="card info-card">
            <div className="stream-header">
              <p className="eyebrow">Streaming description</p>
              <span className={`pill ${stage !== 'loading' ? 'pill--accent' : 'pill--ghost'}`}>
                {stage === 'loading' ? 'Pending' : 'Done'}
              </span>
            </div>
            <div className="stream-body">
              {stage === 'loading' ? (
                <div className="skeleton">
                  <div />
                  <div />
                  <div />
                </div>
              ) : (
                <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: renderedMarkdown }} />
              )}
            </div>
          </section>

          <section className="card pipeline-card">
            <p className="eyebrow">How it works</p>
            <h3>Image2GPS pipeline</h3>
            <p className="microcopy">
              One photo flows through four handoff stages: capture, geo inference, language enrichment, and a final
              render that drops a map pin with Penn-specific storytelling.
            </p>
            <div className="timeline">
              {pipeline.map((step, index) => (
                <div key={step.label} className="timeline__row">
                  <div className="timeline__marker">
                    <span className="timeline__index">{index + 1}</span>
                    {index < pipeline.length - 1 && <span className="timeline__connector" aria-hidden="true" />}
                  </div>
                  <div className="timeline__card">
                    <h4>{step.label}</h4>
                    <p className="microcopy">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="timeline__outcome">
              <div className="label">Outputs</div>
              <p className="microcopy">
                Locked coordinates, GPT-authored narration, and a synced map preview—ready to explore the Penn campus in
                context.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
