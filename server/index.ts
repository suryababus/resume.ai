import { Elysia, t } from "elysia";
import { getResumeResult } from "./llm";
import { cors } from "@elysiajs/cors";

const resume = `Github: github.com/suryababus

LinkedIn: linkedin.com/in/surya-
babu-938714149 SURYA BABU

+91 7010526624
Chennai, Tamilnadu, India

Employment:
StanzaLiving - React Native Frontend Engineer - SDE - 3 03-01-2022 - Present
• Implemented few features on main resident app.
• Reduced app size to 50%.
• Improved code quality by implementing code good practices.
• Suggested remote config and reduced lot of developers efforts.
• Leading a team of 5 developers and 1 QA.
Housing.com - React Frontend Engineer - SDE - 2 01-07-2021 - 30-12-2021
• Revamped landing page.
• Integrated analytics to complete page.
• Made lot of improvement on developer experience.
Zoho CRM - CRM SOLUTIONS - Member of Technical Staff 01-03-2020 - 30-06-2021
• Reduced number of modules from 30 to 14, which improved performance and efficiency.
• Designed and implement 8 widget in React JS.
• Studied their business and developed more than 25 email alert systems.
• Wrote data reconciliation scripts and automated it.
• Completely migrated their database for last 20 years into Zoho CRM.
• Gave many product level ideas few implemented and few inserted in pipe line.
• I was the direct contact between companies.
Zoho CRM - CRM CORE -  Member of Technical Staff  01-08-2019 - 30-06-2021
• Migrated Outlook and Word plugin to OAuth 2.0 flow.
• Redesigned all the API end point to follow OAuth 2.0 (JAVA).
• Learnt C# and implemented the browser device authentication.
• Gave support for new features from other teams.
Software Projects:
Fx Calculator
• Calculator which allows you to create formulas and use it.
• Create variables, apply it to create formula and use the formula when needed.
• Created a backend using NODE JS to support formula sharing.
• Implement few constrains to prevent spamming.
Pubg Tournament Organiser
• This app helps YouTubers to organise a Pubg Room match between 100 players.
• Integrated GPay for paid room matches.
• Highlight feature allows YouTuber to add highlight from their YouTube channel.
• Notification at 5 mins before the match along with room id and password.
University Achievements:
Velammal Engineering College
• BE - Electronics and Instrumentation.
• Topped all 4 years of Project Expo in my college.
• Won NIT and VIT drone racing competitions.
• Won more then 20 technical competitions from other colleges.
IEDC - Government Funded Projects
• Won two government funded projects each 2,50,000 rupees.
• First project - Areca nut harvester.
• Second project - Smart wrist control for home automation.
Skills
Software: (proficient)JavaScript, HTML/CSS, Java, React, Node, Git. (familier) c#, SQL, NOSQL, Flutter.`;

new Elysia()
  .use(cors())
  .post(
    "/resume/ai",
    async ({ body: { resume } }) => {
      return JSON.stringify(await getResumeResult(resume));
    },
    {
      body: t.Object({
        resume: t.String(),
      }),
    },
  )
  .listen(8080, () => {
    console.log("Started serving at 8080");
  });
