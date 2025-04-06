"use client";
import { Document, Font, Page, PDFViewer, StyleSheet, Text, View } from "@react-pdf/renderer";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIResumeForm } from "./ai-resume-form";
import { JSONEditor } from "./json-editor";

Font.register({
  family: "CormorantGaramond",
  fonts: [
    {
      src: "/fonts/CormorantGaramond-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/fonts/CormorantGaramond-SemiBold.ttf",
      fontWeight: "medium",
    },
    {
      src: "/fonts/CormorantGaramond-Medium.ttf",
      fontWeight: "light",
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  section: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  textHeading: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "CormorantGaramond",
  },
  textMedium: {
    fontSize: 11,
    fontWeight: "medium",
    fontFamily: "CormorantGaramond",
  },
  textSmall: {
    fontSize: 8,
    fontWeight: "light",
    fontFamily: "CormorantGaramond",
  },
});

interface Resume {
  resume: {
    name: string;
    position: string;
    intro: string;
    communication: Communication;
    workExperience: WorkExperience[];
    education: Education;
    projects: Project[];
    skills: Skill[];
  };
}

interface Education {
  collageName: string;
  degree: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

interface Skill {
  title: string;
  skills: string;
}
interface WorkExperience {
  position: string;
  company: string;
  duration: string;
  description: string;
  points: string[];
}
interface Communication {
  address: Address;
  email: string;
  phoneNumber: string;
  linkedin: string;
  github: string;
}
interface Address {
  city: string;
  country: string;
}

type Props = {
  resume: Resume;
};

export default function Resume({ resume: resumeObj }: Props) {
  const { resume } = resumeObj;

  return (
    <Document
      style={{
        backgroundColor: "#fff",
      }}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ ...styles.textHeading, marginBottom: 4 }}>
            {resume.name}
          </Text>
          <Text style={styles.textMedium}>{resume.position}</Text>
          <Text style={{ ...styles.textSmall, marginTop: 2 }}>
            {resume.communication.address.city},{" "}
            {resume.communication.address.country} •{" "}
            {resume.communication.phoneNumber} • {resume.communication.email} •{" "}
            {resume.communication.linkedin}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={{ ...styles.textSmall, marginTop: 2 }}>
            {resume.intro}
          </Text>
        </View>

        <View style={{ ...styles.section }}>
          <SectionHeading title="Work Experience" />
          {resume.workExperience.map((workExp, index) => (
            <WorkExperience key={index} workExp={workExp} />
          ))}
        </View>

        {resume.projects && (
        <View style={{ ...styles.section, marginBottom: 8 }}>
          <SectionHeading title="Projects" />
          {resume.projects.map((project, index) => (
            <View key={index} style={{ marginTop: 8 }}>
              <Text style={{ ...styles.textMedium, marginBottom: 2 }}>
                {project.name}
                {project.link && (
                  <Text style={{ ...styles.textSmall }}> - {project.link}</Text>
                )}
              </Text>
              <Text style={{ ...styles.textSmall, marginBottom: 2 }}>
                {project.description}
              </Text>
              <Text style={{ ...styles.textSmall }}>
                Technologies: {project.technologies}
              </Text>
            </View>
          ))}
        </View>
        )}

        <View style={{ ...styles.section, marginBottom: 8 }}>
          <SectionHeading title="Education" />
          <Text
            style={{
              ...styles.textMedium,
              marginTop: 8,
              marginBottom: 8,
              flex: 1,
            }}
          >
            {resume.education?.degree ?? ""}
          </Text>
          <Text
            style={{
              ...styles.textSmall,
              marginTop: 8,
              flex: 1,
            }}
          >
            {resume.education?.collageName ?? ""}
          </Text>
        </View>
            
        <View style={{ ...styles.section, fontWeight: 700 }}>
          <SectionHeading title="Skills & Other" />

          {resume.skills.map((skill, index) => {
            return (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 6,
                }}
              >
                <Text
                  style={{
                    ...styles.textSmall,
                    fontSize: 10,
                    fontWeight: "bold",
                    marginRight: 4,
                  }}
                >
                  {skill.title}:
                </Text>
                <Text style={{ ...styles.textSmall }}>{skill.skills}</Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}

const SectionHeading = ({ title }: { title: string }) => {
  return (
    <Text
      style={{
        ...styles.textMedium,
        paddingBottom: 4,
        borderBottom: 2,
        borderColor: "black",
      }}
    >
      {title}
    </Text>
  );
};

const WorkExperience = ({ workExp }: { workExp: WorkExperience }) => {
  const getBulletList = (content: string) => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View
          style={{
            height: 4,
            width: 4,
            borderRadius: 10,
            backgroundColor: "black",
            marginHorizontal: 4,
            marginTop: 3,
          }}
        />
        <Text style={{ ...styles.textSmall, flex: 1 }}>{content}</Text>
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderColor: "grey",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            ...styles.textMedium,
            marginTop: 6,
            flex: 1,
          }}
        >
          {workExp.position}
        </Text>
        <Text
          style={{
            ...styles.textMedium,
            marginTop: 6,
          }}
        >
          {workExp.duration}
        </Text>
      </View>
      <Text
        style={{
          ...styles.textMedium,
          marginTop: 2,
        }}
      >
        {workExp.company}
      </Text>

      <Text style={{ ...styles.textSmall, marginTop: 2 }}>
        {workExp.description}
      </Text>
      <View
        style={{
          marginTop: 6,
          paddingLeft: 10,
          display: "flex",
          gap: 4,
        }}
      >
        {workExp.points.map((point) => getBulletList(point))}
      </View>
    </>
  );
};

const serverPath = "http://localhost:8080";

export const PDFPreview = () => {
  const [info, setInfo] = useState("");
  const [jd, setJd] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [formatedResume, setFormatedResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jsonString, setJsonString] = useState("");

  const extractLinkedInJob = async () => {
    if (!linkedinUrl) return;

    setIsLoading(true);
    try {
      const resp = await fetch(`${serverPath}/linkedin?url=${linkedinUrl}`);
      const jobDescription = await resp.text();
      setJd(jobDescription);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateResume = async () => {
    try {
      const response = await fetch(`${serverPath}/resume/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: `
        INFO OF THE APPLICANT:
        ${info}
        -------------------------------
        INFO OF THE JOB APPLICANT APPLYING FOR:
        ${jd}
        `,
        }),
      });
      
      const data = await response.json();
      console.log(data);
      
      setFormatedResume(data);
      setJsonString(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error generating resume:", error);
    }
  };

  const updateResumeFromJson = () => {
    try {
      const parsedJson = JSON.parse(jsonString);
      setFormatedResume(parsedJson);
    } catch (error) {
      console.error("Invalid JSON:", error);
      alert("Invalid JSON format. Please check your input.");
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <div className="flex-1 p-2">
        <Tabs defaultValue="generate">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="generate" className="flex-1">Generate Resume with AI</TabsTrigger>
            <TabsTrigger value="edit" className="flex-1">Edit the Generated JSON</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate">
            <AIResumeForm 
              info={info}
              setInfo={setInfo}
              jd={jd}
              setJd={setJd}
              linkedinUrl={linkedinUrl}
              setLinkedinUrl={setLinkedinUrl}
              isLoading={isLoading}
              extractLinkedInJob={extractLinkedInJob}
              generateResume={generateResume}
            />
          </TabsContent>
          
          <TabsContent value="edit">
            <JSONEditor 
              jsonString={jsonString}
              setJsonString={setJsonString}
              updateResumeFromJson={updateResumeFromJson}
            />
          </TabsContent>
        </Tabs>
      </div>

        <PDFViewer
          style={{
            height: "100vh",
            width: "50%",
            backgroundColor: "#ffff",
          }}
        >
          {formatedResume ? <Resume resume={formatedResume} /> : null}
        </PDFViewer>
    </div>
  );
};
