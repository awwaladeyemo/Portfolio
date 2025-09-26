const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('index.html', () => {
  let document;

  beforeAll(() => {
    const filePath = path.join(__dirname, '..', 'index.html');
    const html = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(html);
    document = dom.window.document;
  });

  test('has a Certifications section with the expected certifications', () => {
    const certSection = document.querySelector('#certifications');
    expect(certSection).not.toBeNull();
    const text = certSection.textContent;
    expect(text).toMatch(/AWS Certified Cloud Practitioner/);
    expect(text).toMatch(/Google Cloud Digital Leader/);
    expect(text).toMatch(/Certified Business Analysis Professional/);
    expect(text).toMatch(/Google Data Analytics Professional/);
  });

  test('contact section contains the correct email link', () => {
    const contactSection = document.querySelector('#contact');
    expect(contactSection).not.toBeNull();
    const mailto = contactSection.querySelector('a[href^="mailto:"]');
    expect(mailto).not.toBeNull();
    expect(mailto.getAttribute('href')).toBe('mailto:adeyemoawwal@gmail.com');
    expect(mailto.textContent).toBe('adeyemoawwal@gmail.com');
  });

  test('about section contains expected summary about learning goals', () => {
    const about = document.querySelector('#about');
    expect(about).not.toBeNull();
    const aboutText = about.textContent.toLowerCase();
    expect(aboutText).toContain('junior-level cloud roles');
    expect(aboutText).toContain('hands-on labs');
  });

  test('projects section lists example projects', () => {
    const projects = document.querySelector('#projects');
    expect(projects).not.toBeNull();
    const items = Array.from(projects.querySelectorAll('ul li')).map(li => li.textContent);
    expect(items.some(t => /web server/i.test(t))).toBe(true);
    expect(items.some(t => /static website/i.test(t))).toBe(true);
    expect(items.some(t => /managed database/i.test(t))).toBe(true);
  });

  test('projects section contains detailed hands-on project entries', () => {
    const projects = document.querySelector('#projects');
    const text = projects.textContent;
    expect(/budgets/i.test(text)).toBe(true);
    expect(/cloudwatch/i.test(text)).toBe(true);
    expect(/cloudtrail/i.test(text)).toBe(true);
    expect(/identity and access management|iam/i.test(text)).toBe(true);
    expect(/s3/i.test(text)).toBe(true);
    expect(/vpc/i.test(text)).toBe(true);
    expect(/ec2/i.test(text)).toBe(true);
    expect(/cloudfront/i.test(text)).toBe(true);
    expect(/route 53|route53/i.test(text)).toBe(true);
    expect(/certificate manager|ssl|https/i.test(text)).toBe(true);
    expect(/azure/i.test(text)).toBe(true);
  });
});
