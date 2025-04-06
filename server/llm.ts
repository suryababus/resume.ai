import { generateObject } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { createOllama } from "ollama-ai-provider";
import z from "zod";

const token = "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";

// const model = createOllama({
//   baseURL: "http://127.0.0.1:11434/api",
// });

const model = createGroq({
  // custom settings
  apiKey: token,
});

export const getResumeResult = async (resume: string) => {
  console.log("Generating response");
  const systemPrompt = `
    Here is my resume
    -------
    ${resume}
    -------
  `;
  console.log("testing");

  const outputJsonFormat = z.object({
    resume: z
      .object({
        name: z.string().describe("Name of the applicant"),
        position: z
          .string()
          .describe(
            "Name of the current position of the applicant, eg 'Senior Software Engineer', 'SDE - 1', 'SDE - 2' ",
          ),
        intro: z
          .string()
          .describe(
            "Resume introductions are brief statements that summarize the rest of your resume, highlighting your most relevant skills and qualifications. It's important to use a resume intro because it grabs the eye of the hiring manager. Make it match with JD.",
          ),
        communication: z
          .object({
            address: z
              .object({
                city: z.string().describe("city of the applicant"),
                country: z.string().describe("country of the applicant"),
              })
              .describe("Address details of the applicant"),
            email: z.string().describe("Email of the applicant"),
            phoneNumber: z.string().describe("Phone Number of the applicant"),
            linkedin: z.string().describe("Linkedin link of the applicant"),
            github: z.string().describe("Github link of the applicant"),
          })
          .describe("Communication details"),
        workExperience: z.array(
          z.object({
            position: z
              .string()
              .describe(
                "Name of the position in the company, eg 'Senior Software Engineer',  ",
              ),
            company: z.string().describe("name of the company"),
            duration: z
              .string()
              .describe(
                "start data and end date at the company in this format 'MONTH DD, YYYY - MONTH DD, YYYY' eg: 'November 25, 2022 - Present'",
              ),
            description: z
              .string()
              .describe(
                "Describtion of the position and responsibility in the company",
              ),
            points: z.array(
              z.string().describe("Points of the things did in the company"),
            ),
          }),
        ),
        education: z
          .object({
            collageName: z
              .string()
              .describe("Name of the collage eg: Velammal Enginnering College"),
            degree: z.string().describe("Name of the degree"),
          })
          .describe("Education details of the applicant"),
        projects: z
          .array(
            z.object({
              name: z.string().describe("Name of the project"),
              description: z.string().describe("Brief explanation of the project. Make it elaborate and detailed."),
              technologies: z.string().describe("Technologies used in the project"),
              link: z.string().optional().describe("Link to the project repository or demo"),
            })
          )
          .describe("Projects completed by the applicant"),
          
        skills: z
          .array(
            z.object({
              title: z.string().describe("Heading for the skills catogory"),
              skills: z
                .string()
                .describe("Skills of the applicant in the category"),
            }),
          )
          .describe(
            "Skills of the applicant category like Backend, Frontend, ML",
          ),
      })
      .describe("Details of the resume"),
  });

  try {
    const result = await generateObject({
      model: model("meta-llama/llama-4-scout-17b-16e-instruct"),
      system: systemPrompt,
      prompt: "Give all the details in sections",
      schema: outputJsonFormat,
    });
    return result.object;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
