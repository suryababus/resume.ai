"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setResumeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Input form */}
      <div className="w-1/2 p-6 overflow-y-auto bg-background">
        <h1 className="text-2xl font-bold mb-6">Resume Builder</h1>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={resumeData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={resumeData.email}
              onChange={handleInputChange}
              placeholder="johndoe@example.com"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={resumeData.phone}
              onChange={handleInputChange}
              placeholder="(123) 456-7890"
            />
          </div>
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              value={resumeData.summary}
              onChange={handleInputChange}
              placeholder="Brief overview of your professional background and goals"
            />
          </div>
          <div>
            <Label htmlFor="experience">Work Experience</Label>
            <Textarea
              id="experience"
              name="experience"
              value={resumeData.experience}
              onChange={handleInputChange}
              placeholder="List your work experience"
            />
          </div>
          <div>
            <Label htmlFor="education">Education</Label>
            <Textarea
              id="education"
              name="education"
              value={resumeData.education}
              onChange={handleInputChange}
              placeholder="List your educational background"
            />
          </div>
          <div>
            <Label htmlFor="skills">Skills</Label>
            <Textarea
              id="skills"
              name="skills"
              value={resumeData.skills}
              onChange={handleInputChange}
              placeholder="List your key skills"
            />
          </div>
          <Button type="button">Save Resume</Button>
        </form>
      </div>

      {/* Right side - Resume preview */}
      <div className="w-1/2 p-6 bg-muted overflow-y-auto">
        <div className="bg-white p-8 shadow-lg min-h-full">
          <h2 className="text-3xl font-bold mb-2">
            {resumeData.name || "Your Name"}
          </h2>
          <p className="text-muted-foreground mb-4">
            {resumeData.email && `${resumeData.email} | `}
            {resumeData.phone && `${resumeData.phone}`}
          </p>

          {resumeData.summary && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Professional Summary
              </h3>
              <p>{resumeData.summary}</p>
            </section>
          )}

          {resumeData.experience && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Work Experience</h3>
              <p>{resumeData.experience}</p>
            </section>
          )}

          {resumeData.education && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              <p>{resumeData.education}</p>
            </section>
          )}

          {resumeData.skills && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Skills</h3>
              <p>{resumeData.skills}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
