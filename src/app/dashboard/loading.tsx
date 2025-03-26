'use client'
export default function Loading() {
  return (
    <>
      <div className="middle">
        <div className="bar bar1">L</div>
        <div className="bar bar2">O</div>
        <div className="bar bar3">A</div>
        <div className="bar bar4">D</div>
        <div className="bar bar5">I</div>
        <div className="bar bar6">N</div>
        <div className="bar bar7">G</div>
      </div>

      <style jsx>{`
        .middle {
          top: 50%;
          left: 55%;
          transform: translate(-50%, -55%);
          position: absolute;
          display: flex;
          gap: 5px; /* Space between bars */
        }

        .bar {
          width: 10px;
          height: 50px;
          display: inline-block;
          line-height: 50px;
          font-weight: bold;
          transform-origin: center;
          border-top-right-radius: 100px;
          border-bottom-left-radius: 100px;
          box-shadow: 5px 10px 20px inset rgba(255, 23, 25, 0.5);
          animation: loader 1.2s linear infinite;
        }

        .bar1 { animation-delay: 0.1s; }
        .bar2 { animation-delay: 0.2s; }
        .bar3 { animation-delay: 0.3s; }
        .bar4 { animation-delay: 0.4s; }
        .bar5 { animation-delay: 0.5s; }
        .bar6 { animation-delay: 0.6s; }
        .bar7 { animation-delay: 0.7s; }

        @keyframes loader {
          0% {
            transform: scaleY(0.1);
            background: transparent;
          }
          50% {
            transform: scaleY(1);
            background: #e74c3c;
          }
          100% {
            transform: scaleY(0.1);
            background: transparent;
          }
        }
      `}</style>
    </>
  );
}
