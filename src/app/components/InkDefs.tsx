// The SVG filters behind the hand-made look, plus the handful of CSS rules
// that point at them. Rendered once, from the root layout, because the header
// button uses #rough on every route.
//
// - #rough gives the yellow shapes and the stamps their uneven printed edge.
// - #boil1..3 are three tracings of the same line. InkEffects.tsx swaps a
//   class on <html> (b1, b2, b3) about six times a second, so drawn lines
//   breathe like hand-made animation. Never applied to body text.
//
// The rules live here, inline, instead of in styles/margins.css: a
// fragment-only url(#id) in an external stylesheet has not always resolved
// against the page in every browser, and a filter that fails to resolve can
// hide the element it is on. Inline, it is a same-document reference by
// construction.
const filterRules = `
.cta::before,.build::before,.stamp{filter:url(#rough)}
html.b1 .boil,html.b1 .draw{filter:url(#boil1)}
html.b2 .boil,html.b2 .draw{filter:url(#boil2)}
html.b3 .boil,html.b3 .draw{filter:url(#boil3)}
html.b1 .cta::before,html.b1 .build::before,html.b1 .stamp{filter:url(#rough) url(#boil1)}
html.b2 .cta::before,html.b2 .build::before,html.b2 .stamp{filter:url(#rough) url(#boil2)}
html.b3 .cta::before,html.b3 .build::before,html.b3 .stamp{filter:url(#rough) url(#boil3)}
`

export default function InkDefs() {
  return (
    <>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
        focusable="false"
      >
        <filter id="rough" x="-5%" y="-20%" width="110%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".035"
            numOctaves="3"
            seed="7"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="2.4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        {/* Low-frequency noise and a displacement of about one pixel, so
            lines breathe instead of jittering. */}
        <filter id="boil1" x="-30%" y="-80%" width="160%" height="260%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".024"
            numOctaves="2"
            seed="3"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="2.4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="boil2" x="-30%" y="-80%" width="160%" height="260%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".024"
            numOctaves="2"
            seed="14"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="2.6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="boil3" x="-30%" y="-80%" width="160%" height="260%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".024"
            numOctaves="2"
            seed="29"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="2.2"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <style dangerouslySetInnerHTML={{ __html: filterRules }} />
    </>
  )
}
