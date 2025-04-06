"use client";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

interface AIResumeFormProps {
  info: string;
  setInfo: (value: string) => void;
  jd: string;
  setJd: (value: string) => void;
  linkedinUrl: string;
  setLinkedinUrl: (value: string) => void;
  isLoading: boolean;
  extractLinkedInJob: () => Promise<void>;
  generateResume: () => Promise<void>;
}

export function AIResumeForm({
  info,
  setInfo,
  jd,
  setJd,
  linkedinUrl,
  setLinkedinUrl,
  isLoading,
  extractLinkedInJob,
  generateResume
}: AIResumeFormProps) {
  return (
    <div>
      <div className="pb-2 font-bold">
        Upload your Information in raw format:
      </div>
      <Textarea
        className="mb-4 h-[30vh]"
        value={info}
        onChange={(tf) => setInfo(tf.target.value)}
      ></Textarea>

      <div className="pb-2 font-bold">
        Upload Job description in which you are applying for:
      </div>
      <div className="flex gap-2 mb-2">
        <Input
          placeholder="LinkedIn Job URL"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
        />
        <Button 
          onClick={extractLinkedInJob}
          disabled={isLoading}
        >
          {isLoading ? "Extracting..." : "Extract"}
        </Button>
      </div>
      <Textarea
        className="mb-4 h-[30vh]"
        value={jd}
        onChange={(tf) => setJd(tf.target.value)}
      ></Textarea>

      <Button onClick={generateResume}>Generate Resume</Button>
    </div>
  );
} 