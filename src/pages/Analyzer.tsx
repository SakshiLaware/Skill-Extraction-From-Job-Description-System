import { useState } from "react";
import { extractSkills, getRoleSkills } from "../services/api";
import SkillBadge from "../components/SkillBadge";
import type { ExtractResponse } from "../types";

export default function Analyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ExtractResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze() {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
try {
  const res = await extractSkills(text);
  if (res.skills.length === 0) {
    const roleResult = await getRoleSkills(text);
    if (roleResult.matched_postings > 0) {
      setResult({
        skills: roleResult.skills.map((s) => ({ skill: s.skill, category: s.category })),
        method: `role lookup — based on ${roleResult.matched_postings} matching postings`,
      });
    } else {
      setResult(res); // stays empty, shows your existing "no skills detected" message
    }
  } else {
    setResult(res);
  }
} catch (err: any) {
  setError(err?.response?.data?.detail ?? err?.message ?? "Extraction failed");
} finally {
  setLoading(false);
}
  }

  function clearText() {
    setText("");
    setResult(null);
    setError(null);
  }

  return (
    <div className="analyzer-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .analyzer-page {
          width: 100%;
          min-height: 100vh;
          padding: 28px 32px 45px;
          background: #f5f7fa;
          color: #172033;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* ================= HEADER ================= */

        .analyzer-header {
          width: 100%;
          min-height: 130px;
          padding: 27px 30px;
          margin-bottom: 24px;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;

          border-radius: 16px;

          background: linear-gradient(
            110deg,
            #193b5c,
            #386487,
            #71869a
          );

          box-shadow:
            0 5px 18px rgba(25, 55, 85, 0.12);
        }

        .header-content {
          min-width: 0;
        }

        .header-title {
          margin: 0;
          color: white;
          font-size: 28px;
          font-weight: 700;
          line-height: 1.2;
        }

        .header-subtitle {
          margin: 9px 0 0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
        }

        .header-icon {
          width: 58px;
          height: 58px;
          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          color: white;
          font-size: 27px;

          border-radius: 14px;
          background: rgba(255, 255, 255, 0.13);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* ================= MAIN LAYOUT ================= */

        .analyzer-grid {
          width: 100%;

          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(300px, 0.75fr);

          gap: 22px;
          align-items: start;
        }

        /* ================= INPUT CARD ================= */

        .input-card {
          width: 100%;
          padding: 25px;

          background: white;

          border: 1px solid #dfe5ec;
          border-radius: 15px;

          box-shadow:
            0 3px 12px rgba(25, 45, 70, 0.05);
        }

        .card-title-row {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 7px;
        }

        .card-icon {
          width: 42px;
          height: 42px;
          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #edf3f8;
          border-radius: 10px;

          font-size: 19px;
        }

        .card-title {
          margin: 0;
          color: #1d2d42;
          font-size: 18px;
          font-weight: 600;
        }

        .card-description {
          margin: 0 0 20px 55px;
          color: #718096;
          font-size: 12px;
          line-height: 1.5;
        }

        /* ================= TEXTAREA ================= */

        .textarea-wrapper {
          position: relative;
          width: 100%;
        }

        .job-textarea {
          width: 100%;
          height: 340px;

          resize: vertical;

          padding: 17px;

          color: #26384d;
          background: #fbfcfd;

          border: 1px solid #d8e0e8;
          border-radius: 11px;

          outline: none;

          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
          line-height: 1.6;

          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .job-textarea::placeholder {
          color: #9aa7b5;
        }

        .job-textarea:focus {
          background: white;
          border-color: #4b7ca3;

          box-shadow:
            0 0 0 3px rgba(75, 124, 163, 0.1);
        }

        .textarea-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;

          margin-top: 8px;

          color: #8a98a8;
          font-size: 11px;
        }

        /* ================= BUTTONS ================= */

        .button-row {
          display: flex;
          align-items: center;
          gap: 10px;

          margin-top: 18px;
        }

        .analyze-button {
          min-width: 125px;

          padding: 11px 20px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          color: white;
          background: #356889;

          border: none;
          border-radius: 8px;

          font-size: 13px;
          font-weight: 600;

          cursor: pointer;

          transition:
            background 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .analyze-button:hover:not(:disabled) {
          background: #285876;

          transform: translateY(-1px);

          box-shadow:
            0 4px 12px rgba(53, 104, 137, 0.2);
        }

        .analyze-button:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .clear-button {
          padding: 10px 17px;

          color: #64748b;
          background: white;

          border: 1px solid #d8e0e8;
          border-radius: 8px;

          font-size: 12px;
          font-weight: 500;

          cursor: pointer;
        }

        .clear-button:hover {
          background: #f6f8fa;
        }

        /* ================= INFORMATION CARD ================= */

        .info-card {
          width: 100%;
          padding: 23px;

          background: white;

          border: 1px solid #dfe5ec;
          border-radius: 15px;

          box-shadow:
            0 3px 12px rgba(25, 45, 70, 0.05);
        }

        .info-title {
          margin: 0 0 18px;

          color: #1d2d42;
          font-size: 17px;
          font-weight: 600;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;

          padding: 14px 0;

          border-bottom: 1px solid #edf0f3;
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .info-number {
          width: 27px;
          height: 27px;
          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #356889;
          background: #edf3f8;

          border-radius: 50%;

          font-size: 11px;
          font-weight: 700;
        }

        .info-item h3 {
          margin: 0 0 4px;

          color: #33465c;
          font-size: 12px;
          font-weight: 600;
        }

        .info-item p {
          margin: 0;

          color: #7b8795;
          font-size: 11px;
          line-height: 1.5;
        }

        /* ================= ERROR ================= */

        .error-box {
          width: 100%;

          margin-top: 20px;
          padding: 14px 16px;

          color: #9b3d3d;
          background: #fff5f5;

          border: 1px solid #f0caca;
          border-radius: 10px;

          font-size: 12px;
          line-height: 1.5;
        }

        .error-title {
          margin-bottom: 4px;
          font-weight: 700;
        }

        /* ================= RESULT ================= */

        .result-card {
          width: 100%;

          margin-top: 22px;
          padding: 24px;

          background: white;

          border: 1px solid #dfe5ec;
          border-radius: 15px;

          box-shadow:
            0 3px 12px rgba(25, 45, 70, 0.05);
        }

        .result-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 15px;

          margin-bottom: 20px;
        }

        .result-heading {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .result-icon {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #356889;
          background: #edf3f8;

          border-radius: 10px;

          font-size: 19px;
        }

        .result-title {
          margin: 0;

          color: #1d2d42;
          font-size: 18px;
          font-weight: 600;
        }

        .result-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;

          color: #718096;
          font-size: 11px;
        }

        .method-badge {
          padding: 5px 9px;

          color: #416a84;
          background: #eef4f8;

          border-radius: 5px;

          font-family: monospace;
          font-size: 10px;
        }

        .skills-count {
          padding: 5px 9px;

          color: #64748b;
          background: #f3f5f7;

          border-radius: 5px;

          font-size: 10px;
        }

        .result-divider {
          height: 1px;
          width: 100%;

          margin-bottom: 18px;

          background: #edf0f3;
        }

        .skills-heading {
          margin: 0 0 12px;

          color: #526174;

          font-size: 11px;
          font-weight: 600;

          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .no-skills {
          padding: 16px;

          color: #718096;
          background: #f7f9fb;

          border: 1px dashed #d9e0e7;
          border-radius: 9px;

          font-size: 12px;
        }

        /* ================= EMPTY STATE ================= */

        .empty-result {
          margin-top: 22px;
          padding: 35px 20px;

          text-align: center;

          background: white;

          border: 1px dashed #d7dfe7;
          border-radius: 15px;
        }

        .empty-icon {
          width: 48px;
          height: 48px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin: 0 auto 12px;

          background: #edf3f8;
          border-radius: 12px;

          font-size: 21px;
        }

        .empty-result h3 {
          margin: 0 0 6px;

          color: #42556c;
          font-size: 14px;
        }

        .empty-result p {
          margin: 0;

          color: #8a98a8;
          font-size: 11px;
        }

        /* ================= LOADING ================= */

        .spinner {
          width: 14px;
          height: 14px;

          border: 2px solid rgba(255,255,255,0.45);
          border-top-color: white;

          border-radius: 50%;

          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1100px) {
          .analyzer-grid {
            grid-template-columns: 1fr;
          }

          .info-card {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
          }

          .info-title {
            grid-column: 1 / -1;
          }

          .info-item {
            border-bottom: none;
            padding: 5px 0;
          }
        }

        @media (max-width: 750px) {
          .analyzer-page {
            padding: 18px;
          }

          .analyzer-header {
            padding: 22px;
          }

          .header-title {
            font-size: 23px;
          }

          .input-card,
          .info-card,
          .result-card {
            padding: 18px;
          }

          .info-card {
            display: block;
          }

          .info-item {
            border-bottom: 1px solid #edf0f3;
            padding: 14px 0;
          }

          .info-item:last-child {
            border-bottom: none;
          }

          .job-textarea {
            height: 280px;
          }

          .result-header {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>

      {/* ================= PAGE HEADER ================= */}

      <div className="analyzer-header">
        <div className="header-content">
          <h1 className="header-title">
            Job Description Analyzer
          </h1>

          <p className="header-subtitle">
            Extract technical and professional skills from job descriptions
            using intelligent skill extraction.
          </p>
        </div>

        <div className="header-icon">
          🔍
        </div>
      </div>


      {/* ================= MAIN CONTENT ================= */}

      <div className="analyzer-grid">

        {/* ================= TEXT INPUT ================= */}

        <div className="input-card">

          <div className="card-title-row">

            <div className="card-icon">
              📝
            </div>

            <h2 className="card-title">
              Enter Job Description
            </h2>

          </div>

          <p className="card-description">
            Paste the complete job description below. The system will analyze
            the text and identify relevant skills.
          </p>


          <div className="textarea-wrapper">

            <textarea
              className="job-textarea"
              placeholder="Example:

We are looking for a Software Engineer with experience in Python, SQL, React and AWS.

The candidate should have strong programming skills and knowledge of REST APIs, databases and cloud technologies..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="textarea-footer">

              <span>
                {text.length} characters
              </span>

              <span>
                Recommended: complete job description
              </span>

            </div>

          </div>


          <div className="button-row">

            <button
              onClick={handleAnalyze}
              disabled={loading || !text.trim()}
              className="analyze-button"
            >

              {loading ? (
                <>
                  <span className="spinner" />
                  Analyzing...
                </>
              ) : (
                <>
                  🔎
                  Analyze Skills
                </>
              )}

            </button>


            {text && (
              <button
                onClick={clearText}
                className="clear-button"
              >
                Clear
              </button>
            )}

          </div>


          {/* ERROR */}

          {error && (
            <div className="error-box">

              <div className="error-title">
                Analysis Error
              </div>

              {error}

            </div>
          )}

        </div>


        {/* ================= HOW IT WORKS ================= */}

        <div className="info-card">

          <h2 className="info-title">
            How It Works
          </h2>


          <div className="info-item">

            <div className="info-number">
              1
            </div>

            <div>
              <h3>
                Enter Job Description
              </h3>

              <p>
                Paste the job posting or description into the text area.
              </p>
            </div>

          </div>


          <div className="info-item">

            <div className="info-number">
              2
            </div>

            <div>
              <h3>
                Analyze Text
              </h3>

              <p>
                Click the Analyze Skills button to process the description.
              </p>
            </div>

          </div>


          <div className="info-item">

            <div className="info-number">
              3
            </div>

            <div>
              <h3>
                Extract Skills
              </h3>

              <p>
                The system identifies relevant skills from the submitted text.
              </p>
            </div>

          </div>


          <div className="info-item">

            <div className="info-number">
              4
            </div>

            <div>
              <h3>
                View Results
              </h3>

              <p>
                Extracted skills are displayed below with their categories.
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* ================= RESULT ================= */}

      {result && (

        <div className="result-card">

          <div className="result-header">

            <div className="result-heading">

              <div className="result-icon">
                ✓
              </div>

              <div>

                <h2 className="result-title">
                  Extraction Results
                </h2>

                <div className="result-meta">

                  <span>
                    Method:
                  </span>

                  <span className="method-badge">
                    {result.method}
                  </span>

                  {result.processing_time_ms != null && (
                    <span>
                      {result.processing_time_ms.toFixed(2)} ms
                    </span>
                  )}

                </div>

              </div>

            </div>


            <div className="skills-count">
              {result.skills.length} skills detected
            </div>

          </div>


          <div className="result-divider" />


          {result.skills.length === 0 ? (

            <div className="no-skills">
              No skills were detected in this job description.
              Try providing a more detailed job description.
            </div>

          ) : (

            <>

              <p className="skills-heading">
                Extracted Skills
              </p>

              <div className="skills-container">

                {result.skills.map((s, i) => (

                  <SkillBadge
                    key={i}
                    skill={s.skill}
                    category={s.category}
                  />

                ))}

              </div>

            </>

          )}

        </div>

      )}


      {/* ================= EMPTY STATE ================= */}

      {!result && !loading && !error && (

        <div className="empty-result">

          <div className="empty-icon">
            💡
          </div>

          <h3>
            Ready to Analyze
          </h3>

          <p>
            Enter a job description above and click "Analyze Skills"
            to see the extracted skills.
          </p>

        </div>

      )}

    </div>
  );
}