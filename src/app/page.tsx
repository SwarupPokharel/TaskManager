import Image from 'next/image';
import Link from "next/link";
import Footer from './components/footer/footer';
import Navbar from './components/navbar/navbar';
import './homePage.scss';

export default function Home() {

  return (
    <div className="main">
  <Navbar />
  <main className="home" id="home">
    <section className='hero'>
      <div className="heroImageContainer">
        <div className="description">
          <h1>Manage Your Tasks Efficiently</h1>
          <p>Take control of your daily workflow with our intuitive task management system.
            Organize your to-do lists, set deadlines, and collaborate seamlessly with your team.
            Whether you're working solo or managing a project, TaskManager helps you stay on track
            and achieve your goals faster.</p>
          <Link href="/register" className='ctaButton'>Get Started</Link>
        </div>
        <Image
          src='/images/hero-image.svg'
          width={1000}
          height={1000}
          alt='hero image'
          className='heroImage'
        />
      </div>
    </section>

    <section className='features' id="features">
      <div className='featuresTitle'>Why TaskManager?</div>
      <div className='featureGrid'>
        <div className='featureCard'>
          <h3>✅ Easy Task Management</h3>
          <p>Create, edit, and organize tasks with ease.</p>
        </div>
        <div className='featureCard'>
          <h3>📅 Prioritize & Set Deadlines</h3>
          <p>Manage priorities and never miss a deadline.</p>
        </div>
        <div className='featureCard'>
          <h3>👥 Team Collaboration</h3>
          <p>Assign tasks to your team and track progress.</p>
        </div>
        <div className='featureCard'>
          <h3>🔔 Smart Notifications</h3>
          <p>Get reminders and stay updated on task progress.</p>
        </div>
        <div className='featureCard'>
          <h3>📊 Performance Insights</h3>
          <p>Analyze task completion rates and productivity trends.</p>
        </div>
        <div className='featureCard'>
          <h3>☁️ Cloud Sync & Security</h3>
          <p>Access tasks from anywhere with secure cloud storage.</p>
        </div>
      </div>
    </section>

    <section className='techStack' id='techStack'>
      <div className='featuresTitle'>Tech Stack Behind TaskManager</div>
      <div className='featureGrid'>
        <div className='featureCard'>
          <h3>⚛️ Next.js</h3>
          <p>Used for creating dynamic components and handling routes efficiently.</p>
        </div>
        <div className='featureCard'>
          <h3>💡 React Icons</h3>
          <p>Provides a collection of icons to enhance the UI experience.</p>
        </div>
        <div className='featureCard'>
          <h3>🔐 JSON Web Token (JWT)</h3>
          <p>Ensures secure authentication with token-based user sessions.</p>
        </div>
        <div className='featureCard'>
          <h3>🎨 SCSS</h3>
          <p>Utilized for styling to create a modern and maintainable UI.</p>
        </div>
        <div className='featureCard'>
          <h3>🔑 Bcrypt.js</h3>
          <p>Encrypts user passwords to enhance security and prevent leaks.</p>
        </div>
        <div className='featureCard'>
          <h3>🗄️ MongoDB & Mongoose</h3>
          <p>Manages the database with flexible schema modeling and efficient data handling.</p>
        </div>
      </div>
    </section>

    <section className='about' id='about'>
      <Image
        src='/images/about-us.svg'
        width={800}
        height={600}
        alt='About TaskManager'
        className='aboutImage'
      />
      <div className='aboutText'>
        <h2>About TaskManager</h2>
        <p>
          At TaskManager, we believe productivity shouldn't be complicated. Our mission is to simplify
          task management for individuals, teams, and organizations. Whether you're planning your day,
          collaborating on projects, or tracking progress, TaskManager gives you the tools to stay organized
          and achieve more.
        </p>
        <p>
          We’re passionate about creating an intuitive, user-friendly platform that adapts to your workflow.
          From customizable task lists to real-time collaboration, TaskManager empowers you to work smarter,
          not harder.
        </p>
      </div>
    </section>
  </main>
  <Footer />
</div>

  );
}
