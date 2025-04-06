import puppeteer from 'puppeteer';

export async function extractJobDescription(linkedinUrl: string): Promise<string> {
  try {
    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();

    // Navigate to the LinkedIn job posting
    await page.goto(linkedinUrl, { waitUntil: 'networkidle0' });

    // Wait for and extract the job description
    const jobDescription = await page.evaluate(() => {
      // Try to find the job description element
      const descriptionElement = document.querySelector('.description__text');
      if (!descriptionElement) return '';
      
      return descriptionElement.textContent?.trim() || '';
    });

    await browser.close();
    return jobDescription;
  } catch (error) {
    console.error('Error extracting job description:', error);
    throw new Error('Failed to extract job description from LinkedIn URL');
  }
} 