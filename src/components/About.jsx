import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Data Center Real Estate Company</h1>
      <Tabs defaultValue="company">
        <TabsList>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="careers">Careers</TabsTrigger>
        </TabsList>
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>A Global Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Data Center Real Estate has established a global team of professionals consisting of consultants, analysts and software developers serving a worldwide customer base. We offer the largest team of research analysts with local presence globally. We pride ourselves on first hand, on-the-ground information that is reviewed quarterly while embracing the exponential growth of the data centre sector by constantly reviewing and updating our services to match its evolving nature.
              </p>
              <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4">
                "Through DCRE's technology-led approach and meticulous methodology, we provide consistent, unbiased, and comprehensive research across global markets, empowering our customers with reliable data to navigate the industry with confidence and success."
              </blockquote>
              <p className="font-bold">- CEO</p>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Clientele</h3>
                <p>Information about clientele...</p>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Trusted Partners</h3>
                <p>Information about trusted partners...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Meet The Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Data Center Real Estate has established a global team of professionals consisting of consultants, analysts and software developers serving a worldwide customer base. We offer the largest team of research analysts with local presence globally. We pride ourselves on first hand, on-the-ground information that is reviewed quarterly while embracing the exponential growth of the data centre sector by constantly reviewing and updating our services to match its evolving nature.
              </p>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Senior Management</h3>
                <p>Information about senior management...</p>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Our People</h3>
                <p>Information about our people...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="careers">
          <Card>
            <CardHeader>
              <CardTitle>Join Our Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Are you ready to join our team? We are actively seeking exceptional individuals who share our unwavering enthusiasm for shaping the world of data centre market intelligence.
              </p>
              <p className="mb-4">
                We are on a mission to revolutionize the industry, and we believe that assembling a team of talented individuals is the key to success. If you are passionate, driven, and eager to make a significant impact, we want you on board.
              </p>
              <p className="mb-6">
                Join us in shaping the future and be part of an exciting journey that will redefine the way businesses harness the power of data.
              </p>
              <h3 className="text-xl font-semibold mb-4">Culture & Values</h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Mission focused, data driven:</strong> We strive to deliver exceptional results and exceed our clients' expectations.</li>
                <li><strong>Diversity and Inclusion:</strong> We foster an empowering environment for individuals to be their authentic selves at work.</li>
                <li><strong>Positive work life integration:</strong> We believe in a work hard, play hard philosophy.</li>
              </ul>
              <h3 className="text-xl font-semibold mb-4">Open Positions</h3>
              <p>
                We are looking to fill these roles. Our team is constantly growing so we are always on the lookout for talented individuals. Feel free to reach out if you're keen to join DCRE in other capacities which may not be presently listed.
              </p>
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Current Vacancies</h4>
                <p>List of current vacancies...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default About;