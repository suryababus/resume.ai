"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { PlusCircle, Trash2, ChevronDown, ChevronUp } from "lucide-react";

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

interface JSONEditorProps {
  jsonString: string;
  setJsonString: (value: string) => void;
  updateResumeFromJson: () => void;
}

export function JSONEditor({ jsonString, setJsonString, updateResumeFromJson }: JSONEditorProps) {
  const [resumeData, setResumeData] = useState<Resume | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    communication: true,
    workExperience: true,
    education: true,
    projects: true,
    skills: true
  });

  // Parse JSON on component mount or when jsonString changes
  useEffect(() => {
    try {
      if (jsonString) {
        const parsedData = JSON.parse(jsonString);
        setResumeData(parsedData);
      }
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  }, [jsonString]);

  // Update JSON string when form data changes
  const updateJsonString = (newResumeData: Resume) => {
    setResumeData(newResumeData);
    setJsonString(JSON.stringify(newResumeData, null, 2));
    // updateResumeFromJson(); // Auto update the resume preview
  };

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section as keyof typeof expandedSections]
    });
  };

  // Handle basic field changes
  const handleBasicFieldChange = (field: string, value: string) => {
    if (!resumeData) return;
    
    const newData = { 
      ...resumeData,
      resume: {
        ...resumeData.resume,
        [field]: value
      }
    };
    
    updateJsonString(newData);
  };

  // Handle communication field changes
  const handleCommunicationChange = (field: string, value: string) => {
    if (!resumeData) return;
    
    const newData = {
      ...resumeData,
      resume: {
        ...resumeData.resume,
        communication: {
          ...resumeData.resume.communication,
          [field]: value
        }
      }
    };
    
    updateJsonString(newData);
  };

  // Handle address change
  const handleAddressChange = (field: string, value: string) => {
    if (!resumeData) return;
    
    const newData = {
      ...resumeData,
      resume: {
        ...resumeData.resume,
        communication: {
          ...resumeData.resume.communication,
          address: {
            ...resumeData.resume.communication.address,
            [field]: value
          }
        }
      }
    };
    
    updateJsonString(newData);
  };

  // Handle education change
  const handleEducationChange = (field: string, value: string) => {
    if (!resumeData) return;
    
    const newData = {
      ...resumeData,
      resume: {
        ...resumeData.resume,
        education: {
          ...resumeData.resume.education,
          [field]: value
        }
      }
    };
    
    updateJsonString(newData);
  };

  // Handle work experience changes
  const handleWorkExpChange = (index: number, field: string, value: string | string[]) => {
    if (!resumeData) return;
    
    const newWorkExperiences = [...resumeData.resume.workExperience];
    newWorkExperiences[index] = {
      ...newWorkExperiences[index],
      [field]: value
    };
    
    const newData = {
      ...resumeData,
      resume: {
        ...resumeData.resume,
        workExperience: newWorkExperiences
      }
    };
    
    updateJsonString(newData);
  };

  // Add a new work experience
  const addWorkExperience = () => {
    if (!resumeData) return;
    
    const newWorkExperience: WorkExperience = {
      position: "New Position",
      company: "New Company",
      duration: "Month YYYY - Month YYYY",
      description: "Job description",
      points: ["Achievement 1", "Achievement 2"]
    };
    
    const newData = {
      ...resumeData,
      resume: {
        ...resumeData.resume,
        workExperience: [...resumeData.resume.workExperience, newWorkExperience]
      }
    };
    
    updateJsonString(newData);
  };

  // Remove a work experience
  const removeWorkExperience = (index: number) => {
    if (!resumeData) return;
    
    const newWorkExperiences = [...resumeData.resume.workExperience];
    newWorkExperiences.splice(index, 1);
    
    const newData = {
      ...resumeData,
      resume: {
        ...resumeData.resume,
        workExperience: newWorkExperiences
      }
    };
    
    updateJsonString(newData);
  };

  // Add a bullet point to work experience
  const addWorkExpPoint = (workExpIndex: number) => {
    if (!resumeData) return;
    
    const newWorkExperiences = [...resumeData.resume.workExperience];
    newWorkExperiences[workExpIndex] = {
      ...newWorkExperiences[workExpIndex],
      points: [...newWorkExperiences[workExpIndex].points, "New achievement"]
    };
    
    const newData = {
      ...resumeData,
      resume: {
        ...resumeData.resume,
        workExperience: newWorkExperiences
      }
    };
    
    updateJsonString(newData);
  };

  // Update a bullet point in work experience
  const updateWorkExpPoint = (workExpIndex: number, pointIndex: number, value: string) => {
    if (!resumeData) return;
    
    const newWorkExperiences = [...resumeData.resume.workExperience];
    const newPoints = [...newWorkExperiences[workExpIndex].points];
    newPoints[pointIndex] = value;
    
    newWorkExperiences[workExpIndex] = {
      ...newWorkExperiences[workExpIndex],
      points: newPoints
    };
    
    const newData = {
      ...resumeData,
      resume: {
        ...resumeData.resume,
        workExperience: newWorkExperiences
      }
    };
    
    updateJsonString(newData);
  };

  // Remove a bullet point from work experience
  const removeWorkExpPoint = (workExpIndex: number, pointIndex: number) => {
    if (!resumeData) return;
    
    const newWorkExperiences = [...resumeData.resume.workExperience];
    const newPoints = [...newWorkExperiences[workExpIndex].points];
    newPoints.splice(pointIndex, 1);
    
    newWorkExperiences[workExpIndex] = {
      ...newWorkExperiences[workExpIndex],
      points: newPoints
    };
    
    const newData = {
      ...resumeData,
      resume: {
        ...resumeData.resume,
        workExperience: newWorkExperiences
      }
    };
    
    updateJsonString(newData);
  };

  // Handle project changes
  const handleProjectChange = (index: number, field: string, value: string) => {
    if (!resumeData) return;
    
    const newProjects = [...resumeData.resume.projects];
    newProjects[index] = {
      ...newProjects[index],
      [field]: value
    };
    
    const newData = {
      ...resumeData,
      resume: {
        ...resumeData.resume,
        projects: newProjects
      }
    };
    
    updateJsonString(newData);
  };

  // Add a new project
  const addProject = () => {
    if (!resumeData) return;
    
    const newProject: Project = {
      name: "New Project",
      description: "Project description",
      technologies: "Technologies used",
      link: "https://github.com/yourname/project"
    };
    
    const newData = {
      ...resumeData,
      resume: {
        ...resumeData.resume,
        projects: [...resumeData.resume.projects, newProject]
      }
    };
    
    updateJsonString(newData);
  };

  // Remove a project
  const removeProject = (index: number) => {
    if (!resumeData) return;
    
    const newProjects = [...resumeData.resume.projects];
    newProjects.splice(index, 1);
    
    const newData = {
      ...resumeData,
      resume: {
        ...resumeData.resume,
        projects: newProjects
      }
    };
    
    updateJsonString(newData);
  };

  // Handle skill changes
  const handleSkillChange = (index: number, field: string, value: string) => {
    if (!resumeData) return;
    
    const newSkills = [...resumeData.resume.skills];
    newSkills[index] = {
      ...newSkills[index],
      [field]: value
    };
    
    const newData = {
      ...resumeData,
      resume: {
        ...resumeData.resume,
        skills: newSkills
      }
    };
    
    updateJsonString(newData);
  };

  // Add a new skill
  const addSkill = () => {
    if (!resumeData) return;
    
    const newSkill: Skill = {
      title: "New Skill Category",
      skills: "Skill 1, Skill 2, Skill 3"
    };
    
    const newData = {
      ...resumeData,
      resume: {
        ...resumeData.resume,
        skills: [...resumeData.resume.skills, newSkill]
      }
    };
    
    updateJsonString(newData);
  };

  // Remove a skill
  const removeSkill = (index: number) => {
    if (!resumeData) return;
    
    const newSkills = [...resumeData.resume.skills];
    newSkills.splice(index, 1);
    
    const newData = {
      ...resumeData,
      resume: {
        ...resumeData.resume,
        skills: newSkills
      }
    };
    
    updateJsonString(newData);
  };

  // If no data yet, show placeholder
  if (!resumeData) {
    return (
      <div className="p-4 text-center">
        <p className="mb-4">No resume data available. Generate a resume first.</p>
        <Textarea
          className="mb-4 h-[70vh] font-mono text-sm"
          value={jsonString}
          onChange={(e) => setJsonString(e.target.value)}
          placeholder="Your resume JSON will appear here after generation"
        ></Textarea>
        <Button onClick={updateResumeFromJson}>Update Resume</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto p-2">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Resume Editor</h2>
        <Button onClick={updateResumeFromJson}>Update Preview</Button>
      </div>

      {/* Personal Information */}
      <div className="border rounded-lg p-4">
        <div 
          className="flex justify-between items-center cursor-pointer mb-4" 
          onClick={() => toggleSection('personal')}
        >
          <h3 className="text-lg font-semibold">Personal Information</h3>
          {expandedSections.personal ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSections.personal && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={resumeData.resume.name} 
                  onChange={(e) => handleBasicFieldChange('name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input 
                  id="position" 
                  value={resumeData.resume.position}
                  onChange={(e) => handleBasicFieldChange('position', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="intro">Professional Summary</Label>
              <Textarea 
                id="intro" 
                value={resumeData.resume.intro}
                onChange={(e) => handleBasicFieldChange('intro', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="border rounded-lg p-4">
        <div 
          className="flex justify-between items-center cursor-pointer mb-4" 
          onClick={() => toggleSection('communication')}
        >
          <h3 className="text-lg font-semibold">Contact Information</h3>
          {expandedSections.communication ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSections.communication && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  value={resumeData.resume.communication.address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input 
                  id="country" 
                  value={resumeData.resume.communication.address.country}
                  onChange={(e) => handleAddressChange('country', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={resumeData.resume.communication.email}
                  onChange={(e) => handleCommunicationChange('email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={resumeData.resume.communication.phoneNumber}
                  onChange={(e) => handleCommunicationChange('phoneNumber', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input 
                  id="linkedin" 
                  value={resumeData.resume.communication.linkedin}
                  onChange={(e) => handleCommunicationChange('linkedin', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input 
                  id="github" 
                  value={resumeData.resume.communication.github}
                  onChange={(e) => handleCommunicationChange('github', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Work Experience */}
      <div className="border rounded-lg p-4">
        <div 
          className="flex justify-between items-center cursor-pointer mb-4" 
          onClick={() => toggleSection('workExperience')}
        >
          <h3 className="text-lg font-semibold">Work Experience</h3>
          {expandedSections.workExperience ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSections.workExperience && (
          <div className="space-y-6">
            {resumeData.resume.workExperience.map((exp, index) => (
              <div key={index} className="border-t pt-4 first:border-t-0 first:pt-0">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Position {index + 1}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeWorkExperience(index)}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor={`position-${index}`}>Position</Label>
                    <Input 
                      id={`position-${index}`} 
                      value={exp.position}
                      onChange={(e) => handleWorkExpChange(index, 'position', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`company-${index}`}>Company</Label>
                    <Input 
                      id={`company-${index}`} 
                      value={exp.company}
                      onChange={(e) => handleWorkExpChange(index, 'company', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor={`duration-${index}`}>Duration</Label>
                  <Input 
                    id={`duration-${index}`} 
                    value={exp.duration}
                    onChange={(e) => handleWorkExpChange(index, 'duration', e.target.value)}
                    placeholder="e.g. January 2020 - Present"
                  />
                </div>
                
                <div className="mb-4">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Textarea 
                    id={`description-${index}`} 
                    value={exp.description}
                    onChange={(e) => handleWorkExpChange(index, 'description', e.target.value)}
                    rows={2}
                  />
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-2">
                    <Label>Achievements/Responsibilities</Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => addWorkExpPoint(index)}
                    >
                      <PlusCircle size={16} className="mr-1" /> Add Point
                    </Button>
                  </div>
                  
                  {exp.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-center gap-2 mb-2">
                      <Input 
                        value={point}
                        onChange={(e) => updateWorkExpPoint(index, pointIndex, e.target.value)}
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeWorkExpPoint(index, pointIndex)}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={addWorkExperience}
            >
              <PlusCircle size={16} className="mr-2" /> Add Work Experience
            </Button>
          </div>
        )}
      </div>

      {/* Education */}
      <div className="border rounded-lg p-4">
        <div 
          className="flex justify-between items-center cursor-pointer mb-4" 
          onClick={() => toggleSection('education')}
        >
          <h3 className="text-lg font-semibold">Education</h3>
          {expandedSections.education ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSections.education && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="degree">Degree</Label>
              <Input 
                id="degree" 
                value={resumeData.resume.education.degree}
                onChange={(e) => handleEducationChange('degree', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="college">College/University</Label>
              <Input 
                id="college" 
                value={resumeData.resume.education.collageName}
                onChange={(e) => handleEducationChange('collageName', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="border rounded-lg p-4">
        <div 
          className="flex justify-between items-center cursor-pointer mb-4" 
          onClick={() => toggleSection('projects')}
        >
          <h3 className="text-lg font-semibold">Projects</h3>
          {expandedSections.projects ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSections.projects && (
          <div className="space-y-6">
            {resumeData.resume.projects.map((project, index) => (
              <div key={index} className="border-t pt-4 first:border-t-0 first:pt-0">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Project {index + 1}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeProject(index)}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                    <Input 
                      id={`project-name-${index}`} 
                      value={project.name}
                      onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`project-link-${index}`}>Link (optional)</Label>
                    <Input 
                      id={`project-link-${index}`} 
                      value={project.link || ''}
                      onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor={`project-desc-${index}`}>Description</Label>
                  <Textarea 
                    id={`project-desc-${index}`} 
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor={`project-tech-${index}`}>Technologies</Label>
                  <Input 
                    id={`project-tech-${index}`} 
                    value={project.technologies}
                    onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
                    placeholder="React, Node.js, MongoDB, etc."
                  />
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={addProject}
            >
              <PlusCircle size={16} className="mr-2" /> Add Project
            </Button>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="border rounded-lg p-4">
        <div 
          className="flex justify-between items-center cursor-pointer mb-4" 
          onClick={() => toggleSection('skills')}
        >
          <h3 className="text-lg font-semibold">Skills</h3>
          {expandedSections.skills ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSections.skills && (
          <div className="space-y-4">
            {resumeData.resume.skills.map((skill, index) => (
              <div key={index} className="grid grid-cols-[1fr_auto] gap-4 items-start">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`skill-title-${index}`}>Category</Label>
                    <Input 
                      id={`skill-title-${index}`} 
                      value={skill.title}
                      onChange={(e) => handleSkillChange(index, 'title', e.target.value)}
                      placeholder="e.g. Programming Languages"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`skill-list-${index}`}>Skills</Label>
                    <Textarea 
                      id={`skill-list-${index}`} 
                      value={skill.skills}
                      onChange={(e) => handleSkillChange(index, 'skills', e.target.value)}
                      placeholder="JavaScript, Python, TypeScript, etc."
                      rows={2}
                    />
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="mt-8"
                  onClick={() => removeSkill(index)}
                >
                  <Trash2 size={16} className="text-red-500" />
                </Button>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={addSkill}
            >
              <PlusCircle size={16} className="mr-2" /> Add Skill Category
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-center pt-4 pb-8">
        <Button size="lg" onClick={updateResumeFromJson}>Update Preview</Button>
      </div>
    </div>
  );
} 