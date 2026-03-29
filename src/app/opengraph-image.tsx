import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "DefenseBudget Dash — Compare Global Military Spending by Country";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F8F9FC",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: "#3B5998",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#1A1D23",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            DefenseBudget Dash
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#6B7280",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Compare Global Military Spending by Country
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#3B5998",
              fontFamily: "monospace",
              marginTop: 32,
            }}
          >
            $2.2 Trillion
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#9CA3AF",
              fontFamily: "system-ui, sans-serif",
              marginTop: 8,
            }}
          >
            40+ Nations · Interactive Charts · Free & Open Data
          </div>
        </div>

        {/* Bottom bar chart decoration */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 80,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ width: 300, height: 8, borderRadius: 4, backgroundColor: "#3B5998", opacity: 0.8 }} />
          <div style={{ width: 220, height: 8, borderRadius: 4, backgroundColor: "#3B5998", opacity: 0.6 }} />
          <div style={{ width: 160, height: 8, borderRadius: 4, backgroundColor: "#3B5998", opacity: 0.4 }} />
          <div style={{ width: 110, height: 8, borderRadius: 4, backgroundColor: "#3B5998", opacity: 0.3 }} />
          <div style={{ width: 70, height: 8, borderRadius: 4, backgroundColor: "#3B5998", opacity: 0.2 }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
