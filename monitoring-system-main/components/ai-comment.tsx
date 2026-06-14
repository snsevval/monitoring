import { Sparkles, ArrowRight } from "lucide-react"

function NeuralOrb() {
  const nodes = [
    [40, 20], [62, 30], [70, 52], [58, 72], [34, 74], [22, 54], [30, 32],
    [46, 46], [52, 58], [38, 54],
  ]
  return (
    <svg viewBox="0 0 92 92" className="size-24 shrink-0">
      <circle cx="46" cy="46" r="40" fill="var(--primary)" opacity="0.08" />
      <circle cx="46" cy="46" r="40" fill="none" stroke="var(--primary)" strokeWidth="0.6" opacity="0.3" />
      {nodes.map((a, i) =>
        nodes.slice(i + 1).map((b, j) => {
          const d = Math.hypot(a[0] - b[0], a[1] - b[1])
          if (d > 30) return null
          return (
            <line
              key={`${i}-${j}`}
              x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]}
              stroke="var(--primary)" strokeWidth="0.5" opacity="0.4"
            />
          )
        }),
      )}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.4 : 1.6} fill="var(--primary)" />
      ))}
    </svg>
  )
}

export function AiComment() {
  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-primary" />
        <h2 className="text-sm font-semibold tracking-wide">AI YORUM</h2>
      </div>
      <div className="mt-3 flex gap-3">
        <NeuralOrb />
        <div className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
          <p>
            Son 7 günlük analizlere göre Akdeniz bölgesinde orman yangını riski artış
            göstermektedir.
          </p>
          <p>
            Özellikle Antalya ve Mersin çevresinde sıcaklık anomalisi tespit edilmiştir.
          </p>
        </div>
      </div>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
        Bitki sağlığı açısından İç Anadolu&apos;da{" "}
        <span className="font-medium text-foreground">%12</span>&apos;lik bir düşüş
        gözlemlenmiştir.
      </p>
      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-primary/40 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10">
        Detaylı Rapor Oluştur
        <ArrowRight className="size-4" />
      </button>
    </section>
  )
}
