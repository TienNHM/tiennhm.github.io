import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './resume.module.css';

interface Education {
  degree: string;
  institution: string;
  period: string;
  country: string;
}

interface WorkExperience {
  from: string;
  to: string;
  company: string;
  project: string;
  position: string;
  technologies: string[];
  responsibilities: string[];
}

interface Project {
  name: string;
  company: string;
  period: string;
  technologies: string[];
  description: string;
}

const ResumePage: React.FC = () => {
  const personalInfo = {
    name: 'Nguyễn Huỳnh Minh Tiến',
    position: 'Kỹ sư phần mềm',
    nationality: 'Việt Nam',
    birthDate: '09/09/2000',
    organization: 'Công ty TNHH FPT IS',
    foreignLanguage: 'Trung cấp',
    contact: {
      name: 'Lê Thị Thanh Huyền',
      title: 'Trưởng ban nhân sự Công ty TNHH FPT IS',
      email: 'HuyenLTT23@fpt.com'
    }
  };

  const education: Education[] = [
    {
      degree: 'Kỹ sư phần mềm',
      institution: 'Trường Đại học Sư phạm Kỹ thuật TPHCM',
      period: '08/2018 - 08/2022',
      country: 'Việt Nam'
    }
  ];

  const workExperiences: WorkExperience[] = [
    {
      from: '06/2025',
      to: 'Hiện tại',
      company: 'Công ty TNHH FPT IS',
      project: 'CRM cho Công ty Cổ phần Thiết bị Công nghiệp GEIC',
      position: 'Developer',
      technologies: ['CRM'],
      responsibilities: ['Coding']
    },
    {
      from: '03/2025',
      to: 'Hiện tại',
      company: 'Công ty TNHH FPT IS',
      project: 'Phát triển Product CRM Next trong bộ giải pháp FPT CX Suite',
      position: 'Developer',
      technologies: ['CRM'],
      responsibilities: ['Coding']
    },
    {
      from: '07/2024',
      to: '03/2025',
      company: 'Công ty TNHH FPT IS',
      project: 'AI Content Generator System cho Công ty Cổ phần Maison (Maison Online)',
      position: 'Developer',
      technologies: ['GenAI'],
      responsibilities: ['Coding']
    },
    {
      from: '06/2023',
      to: '06/2024',
      company: 'Công ty TNHH FPT IS',
      project: 'Loyalty System cho Công ty Cổ phần Maison (Maison Online)',
      position: 'Developer',
      technologies: ['Loyalty'],
      responsibilities: ['Coding']
    },
    {
      from: '02/2022',
      to: '10/2023',
      company: 'Công ty TNHH FPT Software',
      project: 'Loyalty Network System cho Tập đoàn FPT',
      position: 'Developer',
      technologies: ['Loyalty'],
      responsibilities: ['Coding']
    }
  ];

  const projects: Project[] = [
    {
      name: 'Loyalty Network System',
      company: 'Tập đoàn FPT',
      period: '02/2022 - 10/2023',
      technologies: ['Loyalty'],
      description: 'Hệ thống quản lý mạng lưới khách hàng thân thiết'
    },
    {
      name: 'Loyalty System',
      company: 'Công ty Cổ phần Maison (Maison Online)',
      period: '06/2023 - 06/2024',
      technologies: ['Loyalty'],
      description: 'Hệ thống quản lý khách hàng thân thiết cho Maison Online'
    },
    {
      name: 'AI Content Generator System',
      company: 'Công ty Cổ phần Maison (Maison Online)',
      period: '07/2024 - 03/2025',
      technologies: ['GenAI'],
      description: 'Hệ thống tạo nội dung tự động bằng AI'
    },
    {
      name: 'Product CRM Next',
      company: 'FPT CX Suite',
      period: '03/2025 - Hiện tại',
      technologies: ['CRM'],
      description: 'Phát triển sản phẩm CRM thế hệ tiếp theo trong bộ giải pháp FPT CX Suite'
    },
    {
      name: 'CRM cho Thiết bị Công nghiệp GEIC',
      company: 'Công ty Cổ phần Thiết bị Công nghiệp GEIC',
      period: '06/2025 - Hiện tại',
      technologies: ['CRM'],
      description: 'Hệ thống quản lý quan hệ khách hàng cho GEIC'
    }
  ];

  const responsibilities = [
    'Thực hiện các công việc theo kế hoạch triển khai tổng thể và chi tiết',
    'Thực hiện các công việc kỹ thuật, lập trình các yêu cầu cần tuỳ chỉnh, tích hợp và các báo cáo theo thiết kế chi tiết',
    'Tiếp nhận và chỉnh sửa hệ thống khi có lỗi phát sinh',
    'Cấu hình các tham số hệ thống'
  ];

  return (
    <Layout
      title="Lý lịch - Nguyễn Huỳnh Minh Tiến"
      description="Lý lịch và quá trình công tác của Nguyễn Huỳnh Minh Tiến - Chuyên viên kỹ thuật tại FPT IS">
      <main className={styles.resumeContainer}>
        <div className={styles.resumeContent}>
          {/* Header Section */}
          <section className={styles.headerSection}>
            <div className={styles.headerCard}>
              <h1 className={styles.name}>{personalInfo.name}</h1>
              <h2 className={styles.position}>{personalInfo.position}</h2>
              <div className={styles.personalDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Quốc tịch:</span>
                  <span>{personalInfo.nationality}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Ngày sinh:</span>
                  <span>{personalInfo.birthDate}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Tổ chức:</span>
                  <span>{personalInfo.organization}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Ngoại ngữ:</span>
                  <span>{personalInfo.foreignLanguage}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.icon}>🎓</span>
              Trình độ học vấn
            </h2>
            <div className={styles.educationCard}>
              {education.map((edu, index) => (
                <div key={index} className={styles.educationItem}>
                  <div className={styles.educationHeader}>
                    <h3 className={styles.educationDegree}>{edu.degree}</h3>
                    <span className={styles.educationPeriod}>{edu.period}</span>
                  </div>
                  <p className={styles.educationInstitution}>{edu.institution}</p>
                  <p className={styles.educationCountry}>{edu.country}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Work Experience Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.icon}>💼</span>
              Quá trình công tác
            </h2>
            <div className={styles.timeline}>
              {workExperiences.map((exp, index) => (
                <div key={index} className={styles.timelineItem}>
                  <div className={styles.timelineMarker}></div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineHeader}>
                      <span className={styles.timelinePeriod}>
                        {exp.from} - {exp.to}
                      </span>
                    </div>
                    <h3 className={styles.timelineCompany}>{exp.company}</h3>
                    <h4 className={styles.timelineProject}>{exp.project}</h4>
                    <div className={styles.timelinePosition}>
                      <span className={styles.positionBadge}>{exp.position}</span>
                    </div>
                    <div className={styles.technologies}>
                      {exp.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className={styles.techBadge}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ul className={styles.responsibilities}>
                      {exp.responsibilities.map((resp, respIndex) => (
                        <li key={respIndex}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.icon}>🚀</span>
              Các dự án đã tham gia
            </h2>
            <div className={styles.projectsGrid}>
              {projects.map((project, index) => (
                <div key={index} className={styles.projectCard}>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <p className={styles.projectCompany}>{project.company}</p>
                  <p className={styles.projectPeriod}>{project.period}</p>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.projectTechnologies}>
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Responsibilities Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.icon}>📋</span>
              Nhiệm vụ và trách nhiệm
            </h2>
            <div className={styles.responsibilitiesCard}>
              <ul className={styles.responsibilitiesList}>
                {responsibilities.map((resp, index) => (
                  <li key={index} className={styles.responsibilityItem}>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Contact Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.icon}>📧</span>
              Thông tin liên hệ
            </h2>
            <div className={styles.contactCard}>
              <p className={styles.contactName}>{personalInfo.contact.name}</p>
              <p className={styles.contactTitle}>{personalInfo.contact.title}</p>
              <a 
                href={`mailto:${personalInfo.contact.email}`}
                className={styles.contactEmail}
              >
                {personalInfo.contact.email}
              </a>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default ResumePage;

