import React from "react";

const Dashboard: React.FC = () => {
  const skills = [
    { name: "Python", value: 82 },
    { name: "SQL", value: 74 },
    { name: "Java", value: 68 },
    { name: "JavaScript", value: 61 },
    { name: "AWS", value: 55 },
    { name: "React", value: 49 },
  ];

  const categories = [
    {
      name: "Software Development",
      jobs: 782,
      percentage: 91,
    },
    {
      name: "Data & Analytics",
      jobs: 614,
      percentage: 76,
    },
    {
      name: "Project Management",
      jobs: 438,
      percentage: 57,
    },
    {
      name: "Cloud & Infrastructure",
      jobs: 326,
      percentage: 43,
    },
    {
      name: "Other Roles",
      jobs: 252,
      percentage: 33,
    },
  ];

  const locations = [
    {
      name: "New York",
      jobs: 342,
    },
    {
      name: "San Francisco",
      jobs: 286,
    },
    {
      name: "London",
      jobs: 241,
    },
    {
      name: "Toronto",
      jobs: 198,
    },
    {
      name: "Bangalore",
      jobs: 176,
    },
  ];

  const recentJobs = [
    {
      title: "Software Engineer",
      category: "Software Development",
      location: "New York",
      skills: ["Python", "SQL", "AWS"],
    },
    {
      title: "Data Analyst",
      category: "Data & Analytics",
      location: "London",
      skills: ["Python", "Excel", "SQL"],
    },
    {
      title: "Full Stack Developer",
      category: "Software Development",
      location: "Toronto",
      skills: ["React", "JavaScript", "Node.js"],
    },
    {
      title: "Machine Learning Engineer",
      category: "Data & Analytics",
      location: "San Francisco",
      skills: ["Python", "TensorFlow", "SQL"],
    },
  ];

  return (
    <div className="dashboard-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
        }

        .dashboard-page {
          width: calc(100vw - 200px);
          min-width: 0;
          min-height: 100vh;

          margin-left: 0;
          padding: 24px 30px 40px;

          background: #f5f7fa;
          color: #172033;

          font-family: Arial, Helvetica, sans-serif;
        }

        /* ================= HEADER ================= */

        .dashboard-header {
          width: 100%;
          min-height: 105px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 24px 28px;
          margin-bottom: 24px;

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

        .header-left {
          min-width: 0;
        }

        .header-left h1 {
          margin: 0;

          color: white;

          font-size: 28px;
          font-weight: 700;
          line-height: 1.2;
        }

        .header-left p {
          margin: 8px 0 0;

          color: rgba(255, 255, 255, 0.9);

          font-size: 13px;
        }

        .header-badge {
          flex-shrink: 0;

          padding: 10px 16px;

          color: white;

          font-size: 12px;

          background: rgba(255, 255, 255, 0.13);

          border: 1px solid rgba(255, 255, 255, 0.2);

          border-radius: 9px;
        }

        /* ================= STAT CARDS ================= */

        .stats-grid {
          width: 100%;

          display: grid;

          grid-template-columns:
            repeat(4, minmax(0, 1fr));

          gap: 18px;

          margin-bottom: 24px;
        }

        .stat-card {
          min-width: 0;
          min-height: 150px;

          padding: 20px;

          background: white;

          border: 1px solid #dfe5ec;

          border-radius: 14px;

          box-shadow:
            0 3px 12px rgba(25, 45, 70, 0.05);

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);

          box-shadow:
            0 7px 20px rgba(25, 45, 70, 0.08);
        }

        .stat-top {
          display: flex;

          align-items: center;

          justify-content: space-between;
        }

        .stat-title {
          margin: 0;

          color: #64748b;

          font-size: 12px;

          font-weight: 600;
        }

        .stat-icon {
          width: 40px;
          height: 40px;

          display: flex;

          align-items: center;

          justify-content: center;

          background: #edf3f8;

          border-radius: 10px;

          font-size: 18px;
        }

        .stat-value {
          margin: 13px 0 5px;

          color: #152238;

          font-size: 27px;

          font-weight: 700;
        }

        .stat-description {
          margin: 0;

          color: #66809a;

          font-size: 11px;
        }

        .positive {
          color: #4b7b5d;
        }

        /* ================= MAIN GRID ================= */

        .content-grid {
          width: 100%;

          display: grid;

          grid-template-columns:
            minmax(0, 1.5fr)
            minmax(0, 1fr);

          gap: 20px;

          margin-bottom: 20px;
        }

        .dashboard-card {
          width: 100%;
          min-width: 0;

          padding: 21px;

          background: white;

          border: 1px solid #dfe5ec;

          border-radius: 14px;

          box-shadow:
            0 3px 12px rgba(25, 45, 70, 0.04);
        }

        .card-header {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 20px;
        }

        .card-header h2 {
          margin: 0;

          color: #1d2d42;

          font-size: 17px;

          font-weight: 600;
        }

        .card-header span {
          color: #8090a3;

          font-size: 11px;
        }

        /* ================= CATEGORY SECTION ================= */

        .category-list {
          display: flex;

          flex-direction: column;

          gap: 17px;
        }

        .category-row {
          width: 100%;
        }

        .category-info {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 7px;
        }

        .category-name {
          color: #42556c;

          font-size: 12px;
        }

        .category-number {
          color: #52677e;

          font-size: 11px;

          font-weight: 600;
        }

        .progress-background {
          width: 100%;
          height: 9px;

          background: #eaf0f4;

          border-radius: 20px;

          overflow: hidden;
        }

        .progress-fill {
          height: 100%;

          background: #4b7ca3;

          border-radius: 20px;
        }

        /* ================= SKILLS SECTION ================= */

        .skills-list {
          display: flex;

          flex-direction: column;

          gap: 16px;
        }

        .skill-row {
          display: grid;

          grid-template-columns:
            90px
            minmax(0, 1fr)
            40px;

          align-items: center;

          gap: 10px;
        }

        .skill-name {
          color: #42556c;

          font-size: 12px;
        }

        .skill-progress {
          width: 100%;
          height: 8px;

          background: #eaf0f4;

          border-radius: 20px;

          overflow: hidden;
        }

        .skill-progress-fill {
          height: 100%;

          background: #6b92ad;

          border-radius: 20px;
        }

        .skill-percentage {
          color: #627287;

          font-size: 11px;

          text-align: right;
        }

        /* ================= LOCATION ================= */

        .location-list {
          display: flex;

          flex-direction: column;
        }

        .location-row {
          display: flex;

          align-items: center;

          justify-content: space-between;

          padding: 14px 0;

          border-bottom:
            1px solid #edf0f3;
        }

        .location-row:first-child {
          padding-top: 2px;
        }

        .location-row:last-child {
          padding-bottom: 0;

          border-bottom: none;
        }

        .location-name {
          color: #42556c;

          font-size: 12px;
        }

        .location-jobs {
          color: #376c91;

          font-size: 12px;

          font-weight: 600;
        }

        /* ================= DATASET SUMMARY ================= */

        .summary-list {
          display: flex;

          flex-direction: column;
        }

        .summary-row {
          display: flex;

          align-items: center;

          justify-content: space-between;

          padding: 13px 0;

          border-bottom:
            1px solid #edf0f3;
        }

        .summary-row:first-child {
          padding-top: 2px;
        }

        .summary-row:last-child {
          padding-bottom: 0;

          border-bottom: none;
        }

        .summary-label {
          color: #42556c;

          font-size: 12px;
        }

        .summary-value {
          color: #376c91;

          font-size: 12px;

          font-weight: 600;
        }

        /* ================= RECENT JOBS ================= */

        .recent-card {
          width: 100%;

          margin-bottom: 0;

          overflow: hidden;
        }

        .table-container {
          width: 100%;

          overflow-x: auto;
        }

        .jobs-table {
          width: 100%;

          min-width: 700px;

          border-collapse: collapse;
        }

        .jobs-table th {
          padding: 12px 10px;

          color: #718096;

          background: #f7f9fb;

          font-size: 11px;

          font-weight: 600;

          text-align: left;

          border-bottom:
            1px solid #e4e8ed;
        }

        .jobs-table td {
          padding: 13px 10px;

          color: #506176;

          font-size: 11px;

          border-bottom:
            1px solid #edf0f3;
        }

        .jobs-table tr:last-child td {
          border-bottom: none;
        }

        .job-title {
          color: #1d344d !important;

          font-weight: 600;
        }

        .skill-tag {
          display: inline-block;

          padding: 4px 7px;

          margin: 2px;

          color: #426982;

          background: #eef4f8;

          border-radius: 5px;

          font-size: 9px;
        }

        /* ================= LARGE SCREEN ================= */

        @media (min-width: 1400px) {

          .dashboard-page {
            padding-left: 35px;
            padding-right: 35px;
          }

          .dashboard-header {
            min-height: 115px;
          }

          .header-left h1 {
            font-size: 30px;
          }

          .stat-card {
            min-height: 160px;
          }

          .stat-value {
            font-size: 29px;
          }
        }

        /* ================= TABLET ================= */

        @media (max-width: 1200px) {

          .stats-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .content-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ================= MOBILE ================= */

        @media (max-width: 700px) {

          .dashboard-page {
            width: 100%;

            padding: 15px;
          }

          .dashboard-header {
            flex-direction: column;

            align-items: flex-start;

            gap: 15px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .content-grid {
            grid-template-columns: 1fr;
          }

          .header-left h1 {
            font-size: 23px;
          }

          .header-badge {
            font-size: 11px;
          }
        }
      `}</style>

      {/* ================= HEADER ================= */}

      <div className="dashboard-header">

        <div className="header-left">

          <h1>
            Analytics Dashboard
          </h1>

          <p>
            Overview of job postings, skills and employment trends
          </p>

        </div>

        <div className="header-badge">
          Job Market Overview
        </div>

      </div>


      {/* ================= STATISTICS ================= */}

      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-top">

            <p className="stat-title">
              Total Jobs
            </p>

            <div className="stat-icon">
              💼
            </div>

          </div>

          <div className="stat-value">
            2,412
          </div>

          <p className="stat-description positive">
            ↑ 12.4% from previous analysis
          </p>

        </div>


        <div className="stat-card">

          <div className="stat-top">

            <p className="stat-title">
              Unique Skills
            </p>

            <div className="stat-icon">
              ⚙
            </div>

          </div>

          <div className="stat-value">
            43
          </div>

          <p className="stat-description">
            Skills identified from jobs
          </p>

        </div>


        <div className="stat-card">

          <div className="stat-top">

            <p className="stat-title">
              Top Skill
            </p>

            <div className="stat-icon">
              ★
            </div>

          </div>

          <div className="stat-value">
            Python
          </div>

          <p className="stat-description">
            Found across 82% of postings
          </p>

        </div>


        <div className="stat-card">

          <div className="stat-top">

            <p className="stat-title">
              Top Job Category
            </p>

            <div className="stat-icon">
              👤
            </div>

          </div>

          <div className="stat-value">
            Software
          </div>

          <p className="stat-description">
            Most common job category
          </p>

        </div>

      </div>


      {/* ================= CATEGORY + SKILLS ================= */}

      <div className="content-grid">

        {/* JOB CATEGORIES */}

        <div className="dashboard-card">

          <div className="card-header">

            <h2>
              Jobs by Category
            </h2>

            <span>
              Number of postings
            </span>

          </div>

          <div className="category-list">

            {categories.map((category) => (

              <div
                className="category-row"
                key={category.name}
              >

                <div className="category-info">

                  <span className="category-name">
                    {category.name}
                  </span>

                  <span className="category-number">
                    {category.jobs}
                  </span>

                </div>

                <div className="progress-background">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${category.percentage}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* TOP SKILLS */}

        <div className="dashboard-card">

          <div className="card-header">

            <h2>
              Top Skills
            </h2>

            <span>
              Demand %
            </span>

          </div>

          <div className="skills-list">

            {skills.map((skill) => (

              <div
                className="skill-row"
                key={skill.name}
              >

                <span className="skill-name">
                  {skill.name}
                </span>

                <div className="skill-progress">

                  <div
                    className="skill-progress-fill"
                    style={{
                      width: `${skill.value}%`,
                    }}
                  />

                </div>

                <span className="skill-percentage">
                  {skill.value}%
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* ================= LOCATION + DATASET ================= */}

      <div className="content-grid">

        {/* JOB LOCATIONS */}

        <div className="dashboard-card">

          <div className="card-header">

            <h2>
              Jobs by Location
            </h2>

            <span>
              Top locations
            </span>

          </div>

          <div className="location-list">

            {locations.map((location) => (

              <div
                className="location-row"
                key={location.name}
              >

                <span className="location-name">
                  {location.name}
                </span>

                <span className="location-jobs">
                  {location.jobs} jobs
                </span>

              </div>

            ))}

          </div>

        </div>


        {/* DATASET SUMMARY */}

        <div className="dashboard-card">

          <div className="card-header">

            <h2>
              Dataset Summary
            </h2>

            <span>
              Current dataset
            </span>

          </div>

          <div className="summary-list">

            <div className="summary-row">

              <span className="summary-label">
                Job Descriptions
              </span>

              <span className="summary-value">
                2,412
              </span>

            </div>


            <div className="summary-row">

              <span className="summary-label">
                Skills Extracted
              </span>

              <span className="summary-value">
                43
              </span>

            </div>


            <div className="summary-row">

              <span className="summary-label">
                Job Categories
              </span>

              <span className="summary-value">
                12
              </span>

            </div>


            <div className="summary-row">

              <span className="summary-label">
                Locations
              </span>

              <span className="summary-value">
                28
              </span>

            </div>


            <div className="summary-row">

              <span className="summary-label">
                Dataset Status
              </span>

              <span className="summary-value">
                Cleaned
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* ================= RECENT JOBS ================= */}

      <div className="dashboard-card recent-card">

        <div className="card-header">

          <h2>
            Recent Job Postings
          </h2>

          <span>
            Sample of analyzed jobs
          </span>

        </div>

        <div className="table-container">

          <table className="jobs-table">

            <thead>

              <tr>

                <th>
                  Job Title
                </th>

                <th>
                  Category
                </th>

                <th>
                  Location
                </th>

                <th>
                  Extracted Skills
                </th>

              </tr>

            </thead>

            <tbody>

              {recentJobs.map((job, index) => (

                <tr key={index}>

                  <td className="job-title">
                    {job.title}
                  </td>

                  <td>
                    {job.category}
                  </td>

                  <td>
                    {job.location}
                  </td>

                  <td>

                    {job.skills.map((skill) => (

                      <span
                        className="skill-tag"
                        key={skill}
                      >
                        {skill}
                      </span>

                    ))}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;